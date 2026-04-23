# Deployment Guide — AnvithBizCap → VPS

Two supported paths. Pick **one**; don't mix them on the same server.

- **Option A — GitHub + GitHub Actions** (recommended for teams, clear audit trail)
- **Option B — Bare repo on the VPS + `git push production main`** (zero external dependencies)

Both paths assume an Ubuntu 22.04 / 24.04 VPS (Debian 12 works too) and a domain whose DNS A record points at the VPS.

---

## 0 · Prerequisites (one-time)

### 0.1 VPS sizing

A static site this size comfortably runs on the smallest modern VM: 1 vCPU, 1 GB RAM, 25 GB disk. Any of Hetzner CPX11, DigitalOcean $6 droplet, AWS Lightsail $3.50, Oracle Cloud Always-Free will work.

### 0.2 DNS

Before running the bootstrap, point your A record at the VPS:

```
A    anvithbizcap.in       203.0.113.42
A    www.anvithbizcap.in   203.0.113.42
```

Propagation can take 5–60 minutes. Verify with `dig +short anvithbizcap.in`.

### 0.3 SSH key on your laptop

```bash
ssh-keygen -t ed25519 -C "deploy@anvithbizcap" -f ~/.ssh/anvith_deploy
# This creates:
#   ~/.ssh/anvith_deploy       (private — never leaves your machine for Option B)
#   ~/.ssh/anvith_deploy.pub   (public — goes on the VPS)
```

### 0.4 Run the VPS bootstrap

From your laptop, upload and run the setup script. Edit the CONFIG block at the top of `deploy/setup-vps.sh` first (domain, email, web root).

```bash
scp site/deploy/setup-vps.sh root@YOUR_VPS_IP:/root/
ssh root@YOUR_VPS_IP
# on the VPS:
nano /root/setup-vps.sh        # edit DOMAIN, ADMIN_EMAIL, WEB_ROOT
chmod +x /root/setup-vps.sh
/root/setup-vps.sh
```

This installs nginx, ufw, certbot, fail2ban, creates the `deploy` user, firewalls the box, creates the web root, issues HTTPS if DNS resolves, and configures sudoers to let the deploy user reload nginx without a password.

Then add your deploy public key on the VPS:

```bash
ssh root@YOUR_VPS_IP "cat >> /home/deploy/.ssh/authorized_keys" < ~/.ssh/anvith_deploy.pub
```

Verify you can SSH as the deploy user:

```bash
ssh -i ~/.ssh/anvith_deploy deploy@anvithbizcap.in
# should land in /home/deploy without asking for a password
```

---

## Option A · GitHub + Actions auto-deploy

Workflow file: `.github/workflows/deploy.yml` (already committed).
On every push to `main`, GitHub Actions rsyncs the site to the VPS and reloads nginx.

### A.1 Create the GitHub repo

```bash
# From inside the site/ directory:
git init -b main
git add .
git commit -m "Initial commit: AnvithBizCap website"
gh repo create anvithbizcap-site --private --source=. --remote=origin --push
# or manually:
# git remote add origin git@github.com:YOUR_ORG/anvithbizcap-site.git
# git push -u origin main
```

### A.2 Add repository secrets

In the GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret name    | Example value                          | Notes                                         |
|----------------|----------------------------------------|-----------------------------------------------|
| `VPS_HOST`     | `anvithbizcap.in` or `203.0.113.42`    | Host reachable over SSH                        |
| `VPS_USER`     | `deploy`                               | Unprivileged deploy user from setup-vps.sh     |
| `VPS_PATH`     | `/var/www/anvithbizcap`                | Web root (matches setup-vps.sh `WEB_ROOT`)     |
| `VPS_PORT`     | `22`                                   | Optional, defaults to 22                       |
| `VPS_SSH_KEY`  | (paste the **full contents** of `~/.ssh/anvith_deploy`) | The *private* key. GitHub encrypts at rest. |

### A.3 Push to deploy

```bash
echo "<!-- small tweak -->" >> index.html
git commit -am "Tweak"
git push
```

Watch the **Actions** tab. On success you'll see:

```
✓ Checkout
✓ Set up SSH
✓ Rsync to VPS
✓ Post-deploy — reload nginx
✓ Summary
```

Open https://anvithbizcap.in — your change is live.

### A.4 Manual trigger

You can also trigger a deploy from the Actions tab (`workflow_dispatch`) without a commit — handy for redeploying after a manual VPS change.

### A.5 Rollback

Revert the commit and push — the workflow will redeploy the earlier state. Because `rsync --delete` mirrors the repo exactly, rollback is clean.

---

## Option B · Bare repo on the VPS

No GitHub required. You push directly to the VPS; a `post-receive` hook checks the code out into the web root and reloads nginx.

### B.1 Enable the bare repo in the bootstrap

Edit `deploy/setup-vps.sh` and set `ENABLE_BARE_REPO=true`, then re-run the relevant block on the VPS, or run these commands manually as the `deploy` user:

```bash
ssh deploy@anvithbizcap.in
mkdir -p ~/repos
git init --bare ~/repos/anvithbizcap.git
```

Create the `post-receive` hook at `/home/deploy/repos/anvithbizcap.git/hooks/post-receive`:

```bash
#!/usr/bin/env bash
set -euo pipefail
TARGET="/var/www/anvithbizcap"
GIT_DIR="/home/deploy/repos/anvithbizcap.git"
while read -r old new ref; do
  branch=$(git rev-parse --symbolic --abbrev-ref "$ref")
  if [[ "$branch" == "main" ]]; then
    echo "▶ Deploying $branch → $TARGET"
    GIT_WORK_TREE="$TARGET" git --git-dir="$GIT_DIR" checkout -f main
    sudo -n nginx -t && sudo -n systemctl reload nginx || true
    echo "✓ Deploy complete ($new)"
  fi
done
```

```bash
chmod +x /home/deploy/repos/anvithbizcap.git/hooks/post-receive
```

### B.2 Add the VPS as a remote on your laptop

```bash
# From the site/ directory:
git init -b main     # if not already initialized
git add .
git commit -m "Initial commit: AnvithBizCap website"
git remote add production deploy@anvithbizcap.in:/home/deploy/repos/anvithbizcap.git
git push -u production main
```

You'll see the hook output streaming back:

```
▶ Deploying main → /var/www/anvithbizcap
✓ Deploy complete (a1b2c3d…)
```

Subsequent deploys:

```bash
git commit -am "Update FD rate shelf"
git push production
```

### B.3 (Optional) Keep GitHub as an origin too

```bash
git remote add origin git@github.com:YOUR_ORG/anvithbizcap-site.git
git push -u origin main

# Push to both with one command:
git config --add remote.all.url git@github.com:YOUR_ORG/anvithbizcap-site.git
git config --add remote.all.url deploy@anvithbizcap.in:/home/deploy/repos/anvithbizcap.git
# Then:
git push all main
```

---

## Nginx — the production config

After HTTPS is issued by certbot, replace the minimal server block written by the bootstrap with the full production config from `deploy/nginx.conf` (security headers, caching rules, CSP, HSTS, pretty URLs):

```bash
ssh root@anvithbizcap.in
# Backup current config
cp /etc/nginx/sites-available/anvithbizcap /etc/nginx/sites-available/anvithbizcap.bak
# Copy the production one (first rsync the file via Option A, or scp it from your laptop)
sudo cp /var/www/anvithbizcap/deploy/nginx.conf /etc/nginx/sites-available/anvithbizcap
# Re-paste the cert lines certbot added — see .bak
nginx -t && systemctl reload nginx
```

The production config includes:

- **HSTS** with `preload` (after you confirm the site is stable, submit to hstspreload.org)
- **CSP** tuned for this static site (Google Fonts only, no external JS)
- **X-Content-Type-Options**, **X-Frame-Options**, **Referrer-Policy**, **Permissions-Policy**
- **30-day immutable cache** on `css / js / svg / fonts / images`
- **5-minute cache** on `.html` so content updates are picked up quickly
- **Pretty URLs** — `/mutual-funds` serves `/mutual-funds.html`
- **Access blocks** for `.git`, `deploy/`, `README.md`, `DEPLOY.md`

---

## Verify the deployment

```bash
# From your laptop:
curl -I https://anvithbizcap.in
# Expect: HTTP/2 200, strict-transport-security, content-security-policy, x-frame-options, etc.

curl -sL https://anvithbizcap.in | grep -c 'AMFI-registered Mutual Fund Distributor'
# Expect: ≥ 2 (hero + footer)

# SSL labs grade (targets: A / A+ once HSTS preload)
# https://www.ssllabs.com/ssltest/analyze.html?d=anvithbizcap.in
```

---

## Operational notes

### Certificate auto-renewal

`certbot` installs a systemd timer that runs twice daily. Certs auto-renew at 30 days before expiry. Verify:

```bash
systemctl list-timers | grep certbot
sudo certbot renew --dry-run
```

### Logs

- Access: `/var/log/nginx/anvithbizcap.access.log`
- Errors: `/var/log/nginx/anvithbizcap.error.log`
- Deploy runs: GitHub Actions → Actions tab (Option A), or the `post-receive` output (Option B)

### Firewall

```bash
sudo ufw status verbose
# Expected:
#   22/tcp    (OpenSSH)
#   80,443    (Nginx Full)
# Everything else DENIED
```

### Incident response (DPDP obligation)

If a breach is suspected:

1. Acknowledge internally within 1 hour
2. Disable the deploy user: `sudo passwd -l deploy`
3. Rotate SSH keys + revoke the GitHub Actions secret
4. Check access logs for the affected window
5. Notify the Data Protection Board of India if personal data was exposed
6. CERT-In: cyber incident must be reported within **6 hours**

Contact: `dpo@anvithbizcap.in`

### Updating the Ubuntu host

```bash
ssh root@anvithbizcap.in
sudo apt update && sudo apt upgrade -y
sudo reboot   # reboot only if kernel updated
```

Unattended security patches are enabled by the bootstrap script, so this is a monthly-ish chore, not weekly.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `403 Forbidden` on `/` | Web root owned by root, not deploy user | `chown -R deploy:www-data /var/www/anvithbizcap` |
| GitHub Actions: `Permission denied (publickey)` | `VPS_SSH_KEY` secret mismatch or `authorized_keys` not set | Regenerate key, update both sides |
| `nginx: [emerg] ... failed (2: No such file or directory)` | Certbot path wrong after manual nginx edit | Restore `.bak`, re-run `certbot --nginx` |
| Changes not showing after deploy | HTML 5-min cache, or browser cache | `Ctrl-Shift-R` hard reload, or wait 5 min |
| Post-receive hook not firing | Missing execute bit | `chmod +x .git/hooks/post-receive` |
| `sudo: a password is required` in hook | sudoers file not installed | `setup-vps.sh` should have created `/etc/sudoers.d/90-deploy-nginx` |

---

## File reference

```
.github/workflows/deploy.yml    GitHub Actions auto-deploy (Option A)
deploy/setup-vps.sh             One-time VPS bootstrap (run once as root)
deploy/nginx.conf               Production nginx server block with security headers
.gitignore                      Excludes secrets, OS files, editor artefacts
DEPLOY.md                       This file
```
