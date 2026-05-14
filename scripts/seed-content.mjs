/**
 * Seed initial blogs and news for AnvithBizCap
 * Run: node scripts/seed-content.mjs
 */
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = resolve(__dirname, "../dev.db");
const adapter = new PrismaLibSql({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const now = new Date();

/* ─────────────────────────────────────────────
   BLOGS
───────────────────────────────────────────── */
const blogs = [
  {
    title: "SIP vs Lumpsum: Which Investment Strategy Is Right for You?",
    slug: "sip-vs-lumpsum-which-investment-strategy-is-right-for-you",
    category: "Mutual Funds",
    author: "Team AnvithBizCap",
    excerpt:
      "SIP and lumpsum are the two most common ways to invest in mutual funds — but which one suits you better? We break down both strategies with examples to help you decide.",
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    content: `<h2>The Age-Old Debate in Mutual Fund Investing</h2>
<p>Every investor who walks into the world of mutual funds faces the same question early on: <strong>should I invest a lump sum at once, or spread my investment over time through a SIP?</strong></p>
<p>There is no single right answer — the best choice depends on your financial situation, market conditions, and emotional temperament. Let's explore both options honestly.</p>

<h2>What Is a SIP?</h2>
<p>A <strong>Systematic Investment Plan (SIP)</strong> is a method where you invest a fixed amount at regular intervals — monthly, quarterly, or weekly — into a mutual fund scheme of your choice.</p>
<p>For example, you invest ₹5,000 every month into an equity mutual fund. Some months you buy units when the market is high, some months when it is low. Over time, your average purchase cost smooths out — this is called <strong>rupee cost averaging</strong>.</p>

<h2>What Is a Lumpsum Investment?</h2>
<p>A <strong>lumpsum investment</strong> means putting a large amount into a mutual fund in one go. If you have ₹5 lakh sitting in a savings account earning 3.5% interest, you might invest the entire amount into an equity fund at once.</p>
<p>The key advantage: if the market goes up after your investment, your entire corpus benefits immediately. The key risk: if the market falls right after you invest, you take the full hit.</p>

<h2>Rupee Cost Averaging — The SIP Superpower</h2>
<p>Let's say a mutual fund unit costs ₹100 in January. You invest ₹5,000 — you get 50 units.</p>
<p>In February, the market dips and the unit price falls to ₹80. Your SIP of ₹5,000 now buys 62.5 units.</p>
<p>In March, prices recover to ₹110. Your SIP buys 45.45 units.</p>
<p>Your <strong>average cost per unit</strong> is lower than the average market price — that is rupee cost averaging working in your favour. A lumpsum investor who invested in January got no such benefit.</p>

<h2>When Lumpsum Wins</h2>
<p>Lumpsum investments tend to perform better when:</p>
<ul>
<li>You invest during a <strong>market correction or bear phase</strong> (markets are already low)</li>
<li>You have a <strong>long time horizon</strong> of 10+ years, giving the market time to compound</li>
<li>You are investing in <strong>debt funds</strong>, where volatility is low and timing matters less</li>
</ul>

<h2>When SIP Wins</h2>
<p>SIP is the better choice when:</p>
<ul>
<li>You have a <strong>regular monthly income</strong> (salaried professional)</li>
<li>The market is near <strong>all-time highs</strong> and you are uncertain about timing</li>
<li>You are an <strong>emotional investor</strong> — SIP removes the temptation to time the market</li>
<li>You are <strong>new to investing</strong> and want to build the habit gradually</li>
</ul>

<h2>The Hybrid Approach</h2>
<p>Many savvy investors use both. They start a SIP for regular monthly investment and deploy additional funds as a lumpsum during market dips. This gives you the discipline of SIP combined with the opportunistic advantage of lumpsum investing.</p>

<h2>Our Recommendation</h2>
<p>For most salaried Indians, <strong>SIP is the right starting point</strong>. It is automatic, disciplined, and eliminates the dangerous habit of trying to time the market. Once you are comfortable, you can layer in lumpsum investments during market corrections.</p>
<p>At AnvithBizCap, we help you find the right mutual fund and the right investment strategy based on your goals, income, and risk profile. <strong>Reach out to us for a personalised investment plan.</strong></p>`,
    published: true,
    publishedAt: now,
  },
  {
    title: "How to Save Tax with ELSS Mutual Funds: A Complete Guide",
    slug: "how-to-save-tax-with-elss-mutual-funds-complete-guide",
    category: "Tax Planning",
    author: "Team AnvithBizCap",
    excerpt:
      "ELSS mutual funds offer the dual benefit of wealth creation and tax saving under Section 80C. Here's everything you need to know about investing in ELSS — from how it works to which funds to consider.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    content: `<h2>What Is ELSS?</h2>
<p><strong>Equity Linked Savings Scheme (ELSS)</strong> is a type of mutual fund that invests primarily in equities and qualifies for a tax deduction under <strong>Section 80C</strong> of the Income Tax Act. It is one of the most popular tax-saving instruments in India — and for good reason.</p>

<h2>How Much Tax Can You Save?</h2>
<p>Under Section 80C, you can claim a deduction of up to <strong>₹1.5 lakh per financial year</strong>. Depending on your tax bracket, this translates to real savings:</p>
<ul>
<li>30% tax bracket: Save up to <strong>₹46,800</strong> per year</li>
<li>20% tax bracket: Save up to <strong>₹31,200</strong> per year</li>
<li>10% tax bracket: Save up to <strong>₹15,600</strong> per year</li>
</ul>
<p>These savings are in addition to the wealth your investment generates through market returns.</p>

<h2>Why ELSS Over Other 80C Options?</h2>
<p>Section 80C has many instruments — PPF, NSC, life insurance premiums, FD (5-year), and ELSS. Here is how ELSS compares:</p>
<ul>
<li><strong>Shortest lock-in period</strong>: Only 3 years. PPF locks you in for 15 years, NSC for 5 years.</li>
<li><strong>Highest return potential</strong>: Equity-linked, so long-term returns can be significantly higher than fixed-income instruments.</li>
<li><strong>SIP option</strong>: You can invest as little as ₹500/month via SIP. Each SIP instalment has its own 3-year lock-in.</li>
<li><strong>Long-term capital gains tax</strong>: Gains above ₹1 lakh per year are taxed at just 10% (LTCG), which is lower than most other investment taxes.</li>
</ul>

<h2>Understanding the 3-Year Lock-In</h2>
<p>ELSS units cannot be redeemed before 3 years from the date of allotment. This is actually a blessing in disguise — it forces you to stay invested through market volatility, which is when equity investing yields the best results.</p>
<p>If you invest via SIP, each monthly instalment has its own 3-year lock-in. So a SIP started in April will have units unlocking every month from April three years later.</p>

<h2>How to Invest in ELSS</h2>
<ol>
<li><strong>Choose a fund</strong> — Look for consistent 5-year and 10-year performance, experienced fund manager, and reasonable AUM.</li>
<li><strong>Start a SIP or invest lumpsum</strong> — SIP is recommended for salaried individuals. Invest before 31st March to claim the deduction in that financial year.</li>
<li><strong>Stay invested beyond the lock-in</strong> — Many investors redeem the moment the 3-year lock-in ends. This is a mistake. The best returns from equity funds come after 5–7 years.</li>
</ol>

<h2>Common Mistakes to Avoid</h2>
<ul>
<li><strong>Investing in March panic</strong>: Many people rush to invest in ELSS in March just to save tax. This results in lumpsum investments at random market levels. Start your SIP in April instead.</li>
<li><strong>Treating it as a short-term investment</strong>: The 3-year lock-in is a minimum, not an ideal holding period. Treat ELSS like any equity investment — hold for 5+ years.</li>
<li><strong>Choosing too many ELSS funds</strong>: One or two well-chosen ELSS funds are sufficient. Over-diversification across 5–6 ELSS funds adds no benefit.</li>
</ul>

<h2>Start Today</h2>
<p>ELSS is one of the smartest financial decisions a working Indian can make — it reduces your tax outgo today and builds wealth for tomorrow. At AnvithBizCap, we help you identify the right ELSS fund based on your risk profile and guide you through the entire investment process.</p>
<p><strong>Talk to us today to plan your tax-saving investments for this financial year.</strong></p>`,
    published: true,
    publishedAt: now,
  },
  {
    title: "The Power of Compounding: Why Starting Your SIP Early Changes Everything",
    slug: "power-of-compounding-why-starting-sip-early-changes-everything",
    category: "Personal Finance",
    author: "Team AnvithBizCap",
    excerpt:
      "Albert Einstein reportedly called compound interest the eighth wonder of the world. In investing, time is your greatest asset. Here's why starting a SIP at 25 instead of 35 can mean a difference of over ₹1 crore.",
    imageUrl:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
    content: `<h2>The Magic That Builds Wealth in Silence</h2>
<p>Compounding is simple: you earn returns on your investment, and then you earn returns on those returns. Year after year. The longer you let it run, the more dramatic the effect becomes. This is not theory — the numbers prove it.</p>

<h2>A Tale of Two Investors</h2>
<p>Meet <strong>Priya</strong> and <strong>Rohan</strong>. Both are disciplined investors who invest ₹10,000 per month in a mutual fund earning an average of 12% per annum.</p>
<p><strong>Priya</strong> starts at age 25 and invests until she turns 55 — that's 30 years of SIP.</p>
<p><strong>Rohan</strong> starts at age 35 and also invests until 55 — that's 20 years of SIP.</p>
<blockquote>Priya invests ₹36 lakh total. Her corpus at 55: approximately ₹3.5 crore.<br>Rohan invests ₹24 lakh total. His corpus at 55: approximately ₹99 lakh.</blockquote>
<p>Priya invested only ₹12 lakh more than Rohan, but ends up with <strong>₹2.5 crore more</strong>. The difference? Ten extra years of compounding.</p>

<h2>Why Time Beats Amount</h2>
<p>This is the counterintuitive truth about investing: <strong>starting early beats investing more</strong>. Someone who starts a ₹5,000/month SIP at 22 will often build more wealth than someone who starts a ₹15,000/month SIP at 35.</p>
<p>The reason is that in the early years, your investment grows slowly. But in later years — especially after 15–20 years — the curve goes almost vertical. This is the compounding effect reaching its peak. If you miss those early years, you miss the steepest part of the curve.</p>

<h2>The Rule of 72</h2>
<p>A simple way to understand compounding: <strong>divide 72 by your annual return rate</strong> to find out how many years it takes to double your money.</p>
<ul>
<li>At 6% (FD returns): money doubles every 12 years</li>
<li>At 12% (equity mutual fund): money doubles every 6 years</li>
<li>At 15% (good equity fund): money doubles every 4.8 years</li>
</ul>
<p>At 12% returns, ₹1 lakh becomes ₹2 lakh in 6 years, ₹4 lakh in 12 years, ₹8 lakh in 18 years, and ₹16 lakh in 24 years. That is not four times the money in four times the time — it is sixteen times the money.</p>

<h2>What Destroys Compounding</h2>
<p>Compounding only works if you leave your money untouched. The two things that kill compounding are:</p>
<ul>
<li><strong>Withdrawing during a market crash</strong>: When markets fall 30%, panicked investors redeem. They crystallise a loss AND miss the recovery. The investor who stayed invested sees their money recover and then compound further.</li>
<li><strong>Taking "breaks" in SIP</strong>: Stopping your SIP during difficult months breaks the compounding chain. Even a 6-month pause can cost you lakhs over 20 years.</li>
</ul>

<h2>The Best Time to Start Was Yesterday</h2>
<p>You cannot go back in time. But the second-best time to start is today. Whether you are 22 or 42, the money you invest today will compound for the years ahead.</p>
<p>At AnvithBizCap, we believe the most important financial decision you will ever make is starting. Not the perfect fund, not the perfect market timing — just <strong>starting</strong>.</p>
<p><strong>Begin your SIP today. Even ₹500 a month. We'll help you choose where and how.</strong></p>`,
    published: true,
    publishedAt: now,
  },
];

/* ─────────────────────────────────────────────
   NEWS
───────────────────────────────────────────── */
const news = [
  {
    title: "RBI Holds Repo Rate Steady — What It Means for Your Debt Fund Investments",
    category: "RBI Updates",
    source: "Reserve Bank of India",
    sourceUrl: "https://www.rbi.org.in",
    excerpt:
      "The Reserve Bank of India's Monetary Policy Committee has maintained the repo rate in its latest review. Here's what this decision means for fixed income investors and debt mutual fund holders.",
    content: `<p>The Reserve Bank of India's Monetary Policy Committee (MPC) has voted to keep the <strong>repo rate unchanged</strong> in its latest policy review. The decision reflects the central bank's focus on balancing inflation control with sustained economic growth.</p>
<h2>Impact on Debt Mutual Funds</h2>
<p>When the repo rate is stable, yields on government securities and bonds tend to remain range-bound. This is generally positive for:</p>
<ul>
<li><strong>Short-duration debt funds</strong> — lower interest rate risk, stable returns</li>
<li><strong>Liquid and ultra-short funds</strong> — continue to offer predictable returns</li>
<li><strong>FD alternatives</strong> — debt funds continue to make sense for 1–3 year horizons</li>
</ul>
<p>Investors in long-duration bond funds should watch for any future rate cut signals, as falling rates would push bond prices up and generate capital gains.</p>`,
    published: true,
    publishedAt: now,
  },
  {
    title: "SEBI Simplifies Mutual Fund Categories — Easier Fund Selection for Retail Investors",
    category: "Mutual Funds",
    source: "SEBI",
    sourceUrl: "https://www.sebi.gov.in",
    excerpt:
      "The Securities and Exchange Board of India has issued fresh guidelines to streamline mutual fund categories and improve transparency in scheme information documents, making it easier for retail investors to compare funds.",
    content: `<p>The Securities and Exchange Board of India (SEBI) has announced new guidelines aimed at making mutual fund investing more transparent and straightforward for retail investors across the country.</p>
<h2>Key Highlights</h2>
<ul>
<li><strong>Clearer categorisation</strong>: Fund houses must clearly state the investment mandate and risk level of each scheme in plain language.</li>
<li><strong>Standardised risk-o-meter</strong>: All funds must display an updated risk-o-meter reflecting the actual portfolio risk — updated monthly.</li>
<li><strong>Expense ratio caps</strong>: SEBI has reaffirmed expense ratio limits, ensuring investors are not overcharged for fund management.</li>
</ul>
<h2>What This Means for You</h2>
<p>These measures make it easier to compare funds across AMCs and choose schemes that genuinely match your risk appetite and return expectation. At AnvithBizCap, we use this standardised information to build personalised fund portfolios for our clients.</p>`,
    published: true,
    publishedAt: now,
  },
  {
    title: "Indian Equity Markets Hit New Highs — Is It Still a Good Time to Invest via SIP?",
    category: "Markets",
    source: "NSE India",
    sourceUrl: "https://www.nseindia.com",
    excerpt:
      "With Indian benchmark indices trading near record levels, many investors are wondering whether to continue their SIPs or wait for a correction. Our view: time in the market beats timing the market.",
    content: `<p>Indian equity markets have been witnessing strong momentum, with benchmark indices touching record highs driven by robust corporate earnings, steady domestic institutional buying, and positive global sentiment.</p>
<h2>Should You Stop Your SIP?</h2>
<p>This is a question we hear frequently when markets rally. The short answer: <strong>No</strong>. Here's why:</p>
<ul>
<li><strong>SIP is designed for all market conditions</strong>: When markets are high, you buy fewer units. When they fall, you buy more. Over time, your average cost stays reasonable.</li>
<li><strong>No one can predict the top</strong>: Markets that look expensive today can continue rising for months or years. Waiting for a "perfect entry" often means missing significant gains.</li>
<li><strong>Missed days are costly</strong>: Studies show that missing even the 10 best trading days in a decade can halve your long-term returns.</li>
</ul>
<h2>What You Should Do</h2>
<p>Continue your SIP without interruption. If you have additional lumpsum funds, consider staggering them over 3–6 months using a Systematic Transfer Plan (STP) to reduce timing risk. Focus on large-cap and flexi-cap funds for stability at current valuations.</p>
<p>Reach out to AnvithBizCap for a portfolio review and to ensure your SIP allocation is aligned with your current financial goals.</p>`,
    published: true,
    publishedAt: now,
  },
];

async function main() {
  console.log("Seeding blogs and news...\n");

  // Insert blogs (skip if slug already exists)
  for (const blog of blogs) {
    const existing = await prisma.blog.findUnique({ where: { slug: blog.slug } });
    if (existing) {
      console.log(`⏭  Blog already exists: "${blog.title}"`);
      continue;
    }
    await prisma.blog.create({ data: blog });
    console.log(`✅ Blog published: "${blog.title}"`);
  }

  // Insert news
  console.log("");
  for (const item of news) {
    const existing = await prisma.news.findFirst({ where: { title: item.title } });
    if (existing) {
      console.log(`⏭  News already exists: "${item.title}"`);
      continue;
    }
    await prisma.news.create({ data: item });
    console.log(`✅ News published: "${item.title}"`);
  }

  console.log("\nDone!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
