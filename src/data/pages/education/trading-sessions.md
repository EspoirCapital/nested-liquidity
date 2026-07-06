<div class="page">
      <div class="page-kicker">Education</div>
      <h1>Trading sessions.</h1>
      <p class="lede">The forex market runs 24 hours a day, five days a week — but not all hours are equal. Session activity depends on the pair you trade and your strategy. Know what drives each session and decide what fits your approach.</p>

      <h2>The three major sessions</h2>
      <p>Forex trading happens through three major financial hubs: Tokyo (Asia), London (Europe), and New York (USA). As each hub opens and closes, activity shifts around the globe. What drives price in one session may be completely different in another — and the same session affects different pairs differently.</p>
      <p>The tracker below converts all session hours to your local time automatically.</p>

      <div class="session-tracker" id="sessionTracker">
        <div class="st-canvas">
          <div class="st-timeline" id="stTimeline">
            <div class="st-now" id="stNow"></div>
          </div>
          <div class="st-axis" id="stAxis"></div>
        </div>

        <div class="st-converted" id="stConverted">
          <div class="st-conv-label">Session hours (your timezone)</div>
          <div class="st-conv-rows" id="stConvRows"></div>
        </div>

        <div class="st-details" id="stDetails">
          <div class="st-header">
            <span style="width:22px;"></span>
            <span class="st-name" style="font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:var(--ink-faint);">Session</span>
            <span class="st-local" style="font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:var(--ink-faint);">Current Time</span>
            <span class="st-status" style="font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:var(--ink-faint);">Status</span>
          </div>
          <div class="st-row" data-session="tokyo">
            <div class="st-indicator" id="stIndTokyo"></div>
            <div class="st-name">Tokyo</div>
            <div class="st-local" id="stLocalTokyo">—</div>
            <div class="st-status" id="stStatusTokyo">—</div>
          </div>
          <div class="st-row" data-session="london">
            <div class="st-indicator" id="stIndLondon"></div>
            <div class="st-name">London</div>
            <div class="st-local" id="stLocalLondon">—</div>
            <div class="st-status" id="stStatusLondon">—</div>
          </div>
          <div class="st-row" data-session="newyork">
            <div class="st-indicator" id="stIndNewyork"></div>
            <div class="st-name">New York</div>
            <div class="st-local" id="stLocalNewyork">—</div>
            <div class="st-status" id="stStatusNewyork">—</div>
          </div>
          <div class="st-row" style="border-color:var(--accent); background:var(--accent-soft);">
            <div class="st-indicator" style="background:var(--ink); width:10px; height:10px; border-radius:50%; flex-shrink:0;"></div>
            <div class="st-name" style="color:var(--accent);">Your time</div>
            <div class="st-local" id="stLocalYou" style="color:var(--ink); font-weight:600;">—</div>
            <div class="st-status" id="stStatusYou" style="color:var(--ink-faint); font-size:10px;"></div>
          </div>
        </div>
        <div class="st-footnote" id="stFootnote"></div>
      </div>

      <h2>Session activity depends on the pair</h2>
      <p>Each pair has different drivers. What moves XAU/USD in a session may not move EUR/USD or USD/JPY the same way. Here are the facts:</p>
      <ul>
        <li><strong>XAU/USD (gold)</strong> — Asian gold markets (Shanghai Gold Exchange, Hong Kong, Tokyo Commodity Exchange, India) drive activity during Tokyo hours. US economic data (NFP, CPI, FOMC) and COMEX gold futures drive New York hours. The LBMA gold fix happens twice daily during London hours (10:30 and 15:00 London time).</li>
        <li><strong>EUR/USD</strong> — Most actively traded during London and New York hours. European economic data during London, US data during New York.</li>
        <li><strong>USD/JPY</strong> — Driven by Japanese economic data during Tokyo hours and US data during New York hours.</li>
        <li><strong>GBP/JPY</strong> — Known to move during the Tokyo/London overlap (07:00–09:00 UTC).</li>
      </ul>
      <p>Know what drives the pair you trade. Session activity is specific to each instrument — don't generalize from one pair to another.</p>

      <h2>Session overlaps</h2>
      <p>When two sessions overlap, traders from both regions are active simultaneously. This concentrates attention on the market:</p>
      <ul>
        <li><strong>Tokyo/London overlap:</strong> Brief overlap where Asian session meets the London open.</li>
        <li><strong>London/NY overlap:</strong> London session meets the New York open. For XAU/USD, this is when LBMA and COMEX are both active.</li>
      </ul>
      <p>Check the tracker above for exact overlap times in your timezone.</p>

      <h2>What this means for the NH/NL strategy</h2>
      <p>This strategy primarily trades XAU/USD. The facts above tell you when different drivers are active — but whether a session works for your NH/NL entries depends on your personal trading style, your schedule, and how price behaves during those hours. Some traders prefer the consistent moves of Tokyo, others prefer the news-driven volatility of New York. There's no single answer — observe, log your trades, and decide for yourself.</p>
    </div>
