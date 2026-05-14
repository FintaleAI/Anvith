import type { Metadata } from "next";
import { BookOpen, PenLine, Newspaper, Upload, Users, LogIn, Eye, Save, Globe, FileSpreadsheet, ToggleLeft, Trash2, ChevronRight } from "lucide-react";

export const metadata: Metadata = { title: "Admin Guide — AnvithBizCap" };

function Section({ icon: Icon, title, color, children }: { icon: React.ElementType; title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`flex items-center gap-3 px-6 py-4 border-b border-gray-100 ${color}`}>
        <Icon className="w-5 h-5" />
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-4 text-sm text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-7 h-7 rounded-full bg-[#c9a84c] text-[#0a1628] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{n}</div>
      <div>
        <div className="font-semibold text-[#0a1628] mb-1">{title}</div>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs leading-relaxed">
      <span className="shrink-0">💡</span>
      <span>{children}</span>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs leading-relaxed">
      <span className="shrink-0">⚠️</span>
      <span>{children}</span>
    </div>
  );
}

function KeyVal({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-gray-500">{label}</span>
      <code className="bg-gray-100 text-[#0a1628] px-3 py-1 rounded-lg text-xs font-mono font-bold">{value}</code>
    </div>
  );
}

export default function AdminGuidePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a3560] rounded-2xl px-8 py-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Panel Guide</h1>
            <p className="text-gray-400 text-sm">Everything you need to manage the AnvithBizCap website</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { icon: PenLine, label: "Post Blogs" },
            { icon: Newspaper, label: "Add News" },
            { icon: Upload, label: "Update MF Data" },
            { icon: Users, label: "View Leads" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 text-sm text-gray-300">
              <Icon className="w-4 h-4 text-[#c9a84c]" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Login */}
      <Section icon={LogIn} title="Logging In" color="bg-blue-50 text-blue-800">
        <p>Go to <strong>anvithbizcap.com/admin/login</strong> (or <strong>localhost:3000/admin/login</strong> during development).</p>
        <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          <KeyVal label="Email" value="admin@anvithbizcap.com" />
          <KeyVal label="Password" value="Admin@2024!" />
        </div>
        <Warn>Change this password before going live. Contact your developer to update it.</Warn>
        <Tip>You will stay logged in for 7 days. Click <strong>Logout</strong> from the sidebar when done.</Tip>
      </Section>

      {/* Dashboard */}
      <Section icon={Globe, } title="Dashboard Overview" color="bg-gray-50 text-gray-800">
        <p>The <strong>Dashboard</strong> is your home screen. It shows:</p>
        <ul className="space-y-2 ml-4">
          {[
            "Total enquiries (leads) received from the website",
            "Number of published blog articles",
            "Number of published news items",
            "Total mutual fund schemes in the database",
            "5 most recent leads with their names and interest",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <ChevronRight className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
        <Tip>Check the dashboard daily to track new leads from the website contact form.</Tip>
      </Section>

      {/* Blogs */}
      <Section icon={PenLine} title="Writing & Publishing Blog Articles" color="bg-emerald-50 text-emerald-800">
        <p>Blogs appear on the <strong>/blog</strong> page of the website. Well-written blogs help with Google ranking and investor trust.</p>

        <div className="space-y-4">
          <p className="font-semibold text-[#0a1628]">How to write a new blog article:</p>
          <Step n={1} title='Click "Blogs" in the left sidebar'>
            You will see a list of all published and draft articles.
          </Step>
          <Step n={2} title='Click the gold "New Article" button (top right)'>
            This opens the full-screen blog editor.
          </Step>
          <Step n={3} title="Enter the Article Title">
            The URL slug (web address) is automatically created from the title. For example, &quot;SIP vs Lumpsum&quot; becomes <code className="bg-gray-100 px-1 rounded">/blog/sip-vs-lumpsum</code>.
          </Step>
          <Step n={4} title="Write your content using the editor toolbar">
            <div className="mt-2 space-y-1.5">
              {[
                ["↩ ↪", "Undo / Redo your last change"],
                ["B", "Bold — for important words"],
                ["I", "Italic — for emphasis"],
                ["U", "Underline"],
                ["🔗", "Insert a link — paste a URL"],
                ["H1 H2 H3", "Headings — use H2 for sections, H3 for sub-sections"],
                ["≡ ≔", "Bullet list / Numbered list"],
                ["❝", "Blockquote — for quotes or key points"],
                ["—", "Horizontal divider line"],
                ["Tx", "Clear all formatting from selected text"],
              ].map(([btn, desc]) => (
                <div key={desc} className="flex gap-3 text-xs">
                  <code className="bg-gray-100 px-2 py-0.5 rounded font-mono shrink-0 min-w-[40px] text-center">{btn}</code>
                  <span className="text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </Step>
          <Step n={5} title="Fill in the Article Details (right sidebar)">
            <ul className="mt-1 space-y-1 text-gray-600">
              <li><strong>Category</strong> — choose the topic (e.g. Mutual Funds, Tax Planning)</li>
              <li><strong>Author</strong> — defaults to &quot;Team AnvithBizCap&quot;, change if needed</li>
              <li><strong>Excerpt</strong> — short 1–2 sentence summary shown in the blog listing page</li>
              <li><strong>Cover Image URL</strong> — paste a link to an image (from Google Drive, Unsplash, etc.)</li>
            </ul>
          </Step>
          <Step n={6} title="Preview before publishing">
            Click the <strong>Preview</strong> button at the top to see exactly how the article will look on the website.
          </Step>
          <Step n={7} title="Save or Publish">
            <ul className="mt-1 space-y-1 text-gray-600">
              <li><strong>Save Draft</strong> — saves the article but keeps it hidden from visitors</li>
              <li><strong>Publish</strong> — makes the article live on the website immediately</li>
            </ul>
          </Step>
        </div>

        <Tip>You can publish later — just click <strong>Save Draft</strong>, then come back and click <strong>Publish</strong> when ready.</Tip>
        <Tip>To edit an existing article, click the <strong>pencil icon</strong> next to it in the article list.</Tip>

        <div className="mt-4">
          <p className="font-semibold text-[#0a1628] mb-2">Managing existing articles:</p>
          <div className="space-y-2">
            {[
              ["Green 'Live' badge", "Article is published and visible on the website. Click it to unpublish."],
              ["Grey 'Draft' badge", "Article is saved but hidden. Click it to publish immediately."],
              ["↗ External link icon", "Opens the article on the live website in a new tab."],
              ["✏️ Pencil icon", "Opens the full editor to make changes."],
              ["🗑️ Trash icon", "Deletes the article permanently. Cannot be undone."],
            ].map(([icon, desc]) => (
              <div key={desc} className="flex gap-3 text-xs">
                <code className="bg-gray-100 px-2 py-0.5 rounded font-mono shrink-0">{icon}</code>
                <span className="text-gray-600">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <Warn>Deleting an article is permanent. Use <strong>Unpublish</strong> (click the green badge) if you want to temporarily hide it instead.</Warn>
      </Section>

      {/* News */}
      <Section icon={Newspaper} title="Posting News & Market Updates" color="bg-sky-50 text-sky-800">
        <p>News items appear on the <strong>/news</strong> page. Use this for short market updates, RBI announcements, budget news, etc.</p>

        <div className="space-y-4">
          <Step n={1} title='Click "News" in the left sidebar'> You will see all current news items. </Step>
          <Step n={2} title='Click "Add News"'> A panel slides open with the news form. </Step>
          <Step n={3} title="Fill in the details">
            <ul className="mt-1 space-y-1 text-gray-600">
              <li><strong>News Title</strong> — clear, short headline</li>
              <li><strong>Category</strong> — e.g. RBI Updates, Markets, Mutual Funds</li>
              <li><strong>Source</strong> — where you got the news (e.g. Economic Times, SEBI)</li>
              <li><strong>Source URL</strong> — link to the original article (optional)</li>
              <li><strong>Excerpt</strong> — 2–3 line summary shown in the news listing (required)</li>
              <li><strong>Full Content</strong> — optional longer write-up with formatting (use the toolbar)</li>
            </ul>
          </Step>
          <Step n={4} title="Toggle 'Publish immediately' and click Publish">
            Or leave it off and click <strong>Publish</strong> later from the news list.
          </Step>
        </div>

        <Tip>News is best kept short and factual. The Excerpt field is what most visitors will read — make it informative.</Tip>
      </Section>

      {/* MF Upload */}
      <Section icon={FileSpreadsheet} title="Updating Mutual Fund Data (Excel Upload)" color="bg-purple-50 text-purple-800">
        <p>The MF Finder tool on the website uses a database of fund schemes. This data must be updated regularly using an Excel file.</p>

        <div className="space-y-4">
          <Step n={1} title='Click "MF Data Upload" in the left sidebar'>
            You will see the current upload status — last file name and date.
          </Step>
          <Step n={2} title="Prepare your Excel file">
            The file must be in <strong>.xlsx</strong> format (Excel). It should have columns matching the MF scheme data: scheme name, returns (1Y, 3Y, 5Y etc.), AUM, expense ratio, ratings, etc.
          </Step>
          <Step n={3} title="Click 'Choose File' and select your Excel file">
            The file will be uploaded and processed automatically.
          </Step>
          <Step n={4} title="Enter the NAV Date and click Upload">
            The NAV date is the date of the data in the Excel file (usually today&apos;s date or the last trading day).
          </Step>
          <Step n={5} title="Wait for the success message">
            The system will import all schemes from the file into the database. This may take a few seconds.
          </Step>
        </div>

        <Tip>Upload fresh data every week or after major market movements to keep the MF Finder accurate.</Tip>
        <Warn>Each upload replaces the existing data for schemes with the same name. Always use the complete file, not a partial one.</Warn>
      </Section>

      {/* Leads */}
      <Section icon={Users} title="Managing Leads (Enquiries)" color="bg-orange-50 text-orange-800">
        <p>Every time a visitor fills the <strong>contact form</strong> or <strong>consultation form</strong> on the website, a lead is created here.</p>

        <div className="space-y-4">
          <Step n={1} title='Click "Leads" in the left sidebar'>
            You will see all enquiries with name, mobile, email, interest, and investment range.
          </Step>
          <Step n={2} title="Update the status as you follow up">
            <div className="mt-2 space-y-1.5">
              {[
                ["🆕 New", "Just received, not yet contacted"],
                ["📞 Contacted", "You have called or emailed the person"],
                ["✅ Converted", "The person has become a client"],
                ["❌ Closed", "Not interested or no response"],
              ].map(([status, desc]) => (
                <div key={desc} className="flex gap-3 text-xs items-start">
                  <code className="bg-gray-100 px-2 py-0.5 rounded shrink-0">{status}</code>
                  <span className="text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          </Step>
          <Step n={3} title="Export leads to Excel">
            Click the <strong>Export CSV</strong> button to download all leads as a spreadsheet for your records or CRM.
          </Step>
        </div>

        <Tip>Call new leads within 24 hours — faster response leads to higher conversion rates.</Tip>
      </Section>

      {/* Tips */}
      <Section icon={ToggleLeft} title="Quick Tips & Best Practices" color="bg-gray-50 text-gray-800">
        <div className="space-y-3">
          {[
            ["📅 Blog frequency", "Post at least 2–4 blogs per month on financial topics. Regular content helps Google rank the website higher."],
            ["📰 News updates", "Add news items 2–3 times per week during active markets. Even short 3-line updates are valuable."],
            ["📊 MF data", "Update the MF Excel every Monday morning before the market opens, or after AMFI publishes fresh NAV data."],
            ["📱 Mobile-friendly", "The admin panel works on mobile too — you can post news from your phone."],
            ["🔐 Security", "Never share your admin login credentials. Log out after each session especially on shared computers."],
            ["💾 Draft first", "Write long blogs as drafts first, review them, then publish. Use Preview to check how it looks."],
            ["🖼️ Images", "For blog cover images, use free sites like Unsplash.com or Pexels.com — copy the image URL and paste it in the cover image field."],
          ].map(([title, desc]) => (
            <div key={title as string} className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <span className="text-base shrink-0">{(title as string).split(" ")[0]}</span>
              <div>
                <div className="font-semibold text-[#0a1628] text-xs mb-0.5">{(title as string).slice(3)}</div>
                <div className="text-gray-500 text-xs">{desc as string}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Need help */}
      <div className="bg-[#0a1628] rounded-2xl px-6 py-5 text-white text-center">
        <p className="font-semibold mb-1">Need Help?</p>
        <p className="text-gray-400 text-sm">Contact your developer for any technical issues, password resets, or new feature requests.</p>
      </div>
    </div>
  );
}
