#!/usr/bin/env bash
# ============================================================
# AnvithBizCap — One-time VPS bootstrap
# Ubuntu 22.04 / 24.04 (works on Debian 12 too)
#
# Run as root (or via sudo). Edit the CONFIG block first.
#
#   scp setup-vps.sh root@YOUR_VPS_IP:/root/
#   ssh root@YOUR_VPS_IP
#   chmod +x /root/setup-vps.sh && /root/setup-vps.sh
#
# Sets up: deploy user, firewall, nginx, certbot, web root,
# and optional bare-repo push-to-deploy.
# ============================================================

set -euo pipefail

# ─────────────────────────────────────────────
# CONFIG — pre-filled for AnvithBizCap on Hostinger
# ─────────────────────────────────────────────
DEPLOY_USER="deploy"                       # SSH user for deploys
DOMAIN="anvithbizcap.com"                  # registered via Hostinger
WWW_DOMAIN="www.anvithbizcap.com"
ADMIN_EMAIL="desk@anvithbizcap.com"        # change if you prefer
WEB_ROOT="/var/www/anvithbizcap"
ENABLE_BARE_REPO=true                      # Option B — git push production main
# ─────────────────────────────────────────────

log() { printf "\n\033[1;36m▶ %s\033[0m\n" "$*"; }
warn(){ printf "\033[1;33m⚠ %s\033[0m\n" "$*"; }

if [[ $EUID -ne 0 ]]; then
  echo "Please run as root (or via sudo)." >&2
  exit 1
fi

# ─────────────────────────────────────────────
# 1 · System update
# ─────────────────────────────────────────────
log "Updating apt and installing packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -qq -y
apt-get install -qq -y \
  nginx \
  ufw \
  fail2ban \
  certbot \
  python3-certbot-nginx \
  rsync \
  git \
  unattended-upgrades \
  curl

# ─────────────────────────────────────────────
# 2 · Unattended security updates
# ─────────────────────────────────────────────
log "Enabling unattended security updates"
dpkg-reconfigure -f noninteractive -p low unattended-upgrades || true

# ─────────────────────────────────────────────
# 3 · Firewall (UFW)
# ─────────────────────────────────────────────
log "Configuring UFW firewall"
ufw --force reset >/dev/null
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status verbose

# ─────────────────────────────────────────────
# 4 · Deploy user
# ─────────────────────────────────────────────
log "Creating deploy user: $DEPLOY_USER"
if ! id "$DEPLOY_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi
usermod -aG www-data "$DEPLOY_USER"

# SSH key setup
install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
install -m 600 -o "$DEPLOY_USER" -g "$DEPLOY_USER" /dev/null "/home/$DEPLOY_USER/.ssh/authorized_keys"

if [[ ! -s "/home/$DEPLOY_USER/.ssh/authorized_keys" ]]; then
  warn "authorized_keys is EMPTY. Append your deploy public key before the next step:"
  warn "  echo 'ssh-ed25519 AAAA... deploy@local' >> /home/$DEPLOY_USER/.ssh/authorized_keys"
fi

# Sudoers: allow nginx reload without password (for GitHub Actions post-deploy reload)
cat > /etc/sudoers.d/90-$DEPLOY_USER-nginx <<EOF
$DEPLOY_USER ALL=(ALL) NOPASSWD: /usr/sbin/nginx -t, /bin/systemctl reload nginx
EOF
chmod 440 /etc/sudoers.d/90-$DEPLOY_USER-nginx

# ─────────────────────────────────────────────
# 5 · Web root
# ─────────────────────────────────────────────
log "Creating web root: $WEB_ROOT"
install -d -m 755 -o "$DEPLOY_USER" -g www-data "$WEB_ROOT"

# Placeholder index until the first deploy lands
if [[ ! -f "$WEB_ROOT/index.html" ]]; then
  cat > "$WEB_ROOT/index.html" <<HTML
<!doctype html><meta charset="utf-8"><title>AnvithBizCap — deploying…</title>
<style>body{font-family:ui-sans-serif,system-ui;background:#F7F3EA;color:#0B1220;display:grid;place-items:center;height:100vh;margin:0}</style>
<div><h1 style="font-weight:300;letter-spacing:-0.02em">AnvithBizCap</h1><p>Deploying shortly.</p></div>
HTML
  chown "$DEPLOY_USER":www-data "$WEB_ROOT/index.html"
fi

# ─────────────────────────────────────────────
# 6 · Nginx
# ─────────────────────────────────────────────
log "Writing nginx site block"
NGX_SITE="/etc/nginx/sites-available/anvithbizcap"

# Drop a minimal HTTP-only block first — certbot will rewrite it with HTTPS
cat > "$NGX_SITE" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW_DOMAIN};
    root ${WEB_ROOT};
    index index.html;

    location /.well-known/acme-challenge/ { root /var/www/html; }

    location / {
        try_files \$uri \$uri.html \$uri/ =404;
    }

    location ~ /\.(?!well-known) { deny all; }
    location ~ /(README|DEPLOY)\.md\$ { deny all; }

    access_log /var/log/nginx/anvithbizcap.access.log;
    error_log  /var/log/nginx/anvithbizcap.error.log warn;
}
EOF

ln -sf "$NGX_SITE" /etc/nginx/sites-enabled/anvithbizcap
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ─────────────────────────────────────────────
# 7 · Let's Encrypt (skip if domain not yet pointed)
# ─────────────────────────────────────────────
log "Attempting HTTPS via certbot"
if host "$DOMAIN" >/dev/null 2>&1; then
  certbot --nginx \
    -d "$DOMAIN" -d "$WWW_DOMAIN" \
    --non-interactive --agree-tos -m "$ADMIN_EMAIL" \
    --redirect || warn "certbot failed — run it manually after DNS propagates: certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
  # After certbot, replace the minimal block with the full production nginx.conf
  warn "Once HTTPS is issued, replace $NGX_SITE with site/deploy/nginx.conf for full security headers."
else
  warn "DNS not resolving for $DOMAIN yet. Run this AFTER DNS is set:"
  warn "  certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --agree-tos -m $ADMIN_EMAIL --redirect"
fi

# Auto-renew is installed by certbot via systemd timer. Verify:
systemctl list-timers | grep -i certbot || true

# ─────────────────────────────────────────────
# 8 · fail2ban (SSH bruteforce protection)
# ─────────────────────────────────────────────
log "Configuring fail2ban"
cat > /etc/fail2ban/jail.local <<EOF
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
EOF
systemctl restart fail2ban

# ─────────────────────────────────────────────
# 9 · (Optional) Bare repo for "git push deploy"
# ─────────────────────────────────────────────
if [[ "$ENABLE_BARE_REPO" == true ]]; then
  log "Setting up bare git repo for push-to-deploy"
  sudo -u "$DEPLOY_USER" bash -eu <<'USERBLOCK'
  mkdir -p ~/repos
  if [[ ! -d ~/repos/anvithbizcap.git ]]; then
    git init --bare ~/repos/anvithbizcap.git
  fi
USERBLOCK

  # post-receive hook
  cat > "/home/$DEPLOY_USER/repos/anvithbizcap.git/hooks/post-receive" <<EOF
#!/usr/bin/env bash
set -euo pipefail
TARGET="$WEB_ROOT"
GIT_DIR="/home/$DEPLOY_USER/repos/anvithbizcap.git"
while read -r old new ref; do
  branch=\$(git rev-parse --symbolic --abbrev-ref "\$ref")
  if [[ "\$branch" == "main" ]]; then
    echo "▶ Deploying \$branch → \$TARGET"
    GIT_WORK_TREE="\$TARGET" git --git-dir="\$GIT_DIR" checkout -f main
    sudo -n nginx -t && sudo -n systemctl reload nginx || true
    echo "✓ Deploy complete (\$new)"
  fi
done
EOF
  chmod +x "/home/$DEPLOY_USER/repos/anvithbizcap.git/hooks/post-receive"
  chown -R "$DEPLOY_USER":"$DEPLOY_USER" "/home/$DEPLOY_USER/repos"
  log "Bare repo ready. Add a remote from your laptop:"
  echo "  git remote add production $DEPLOY_USER@$DOMAIN:~/repos/anvithbizcap.git"
  echo "  git push production main"
fi

# ─────────────────────────────────────────────
# 10 · Summary
# ─────────────────────────────────────────────
log "Bootstrap complete."
echo
echo "Next steps:"
echo "  1. Add your SSH public key to /home/$DEPLOY_USER/.ssh/authorized_keys"
echo "  2. Point DNS A record for $DOMAIN and $WWW_DOMAIN at this server"
echo "  3. Re-run certbot if DNS wasn't ready: certbot --nginx -d $DOMAIN -d $WWW_DOMAIN"
echo "  4. Configure GitHub Actions secrets (see DEPLOY.md → Option A)"
echo "     OR push to the bare repo (see DEPLOY.md → Option B)"
echo
echo "Web root:        $WEB_ROOT"
echo "Deploy user:     $DEPLOY_USER"
echo "Nginx site:      $NGX_SITE"
echo "Firewall:        ufw status"
echo
