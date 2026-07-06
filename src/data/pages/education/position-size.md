<div class="page">
      <div class="page-kicker">Education</div>
      <h1>Position size calculator.</h1>
      <p class="lede">Calculate exactly how much to risk per trade based on your account size and stop loss — no guessing.</p>

      <div class="ps-calculator">
        <div class="ps-row">
          <label>Account Balance ($)</label>
          <input type="number" id="ps-balance" value="10000" step="500">
        </div>
        <div class="ps-row">
          <label>Risk per Trade (%)</label>
          <input type="range" id="ps-risk" min="0.25" max="3" step="0.25" value="1">
          <span class="ps-val" id="ps-risk-val">1.0%</span>
        </div>
        <div class="ps-row">
          <label>Stop Loss (pips)</label>
          <input type="number" id="ps-sl" value="20" step="5">
        </div>
        <div class="ps-row">
          <label>Pair</label>
          <select id="ps-pair">
            <option value="10">EUR/USD, GBP/USD (major)</option>
            <option value="10">USD/JPY, GBP/JPY (major)</option>
            <option value="1">XAU/USD (Gold)</option>
            <option value="1">XAG/USD (Silver)</option>
          </select>
        </div>
        <div class="ps-result">
          <div class="ps-label">Position Size</div>
          <div class="ps-value" id="ps-output">0.00 lots</div>
          <div class="ps-sub" id="ps-sub">$0 risked per trade</div>
        </div>
      </div>

      <p style="margin-top:24px; color:var(--ink-faint); font-size:13px;">Formula used: (Balance × Risk%) ÷ (Stop Loss × Pip Value). Pip value is $10 per standard lot for most major pairs.</p>

      <h2 style="margin-top:28px;">Automated position sizing</h2>
      <p>If you want this calculated automatically on your charts, download the <a href="https://www.earnforex.com/metatrader-expert-advisors/Position-Sizer/" target="_blank" rel="noopener">Position Sizer Expert Advisor</a> from EarnForex. It's a free MT5 tool that calculates lot size based on your risk parameters and places the trade for you — including setting the stop loss and take profit automatically.</p>
      <p>Alternatively, <strong>MatchTrader</strong> has a built-in risk management calculator that shows lot size before you confirm a trade. If you're using MatchTrader (which we recommend), you don't need an external tool — just enter your stop loss pips and it will show the required lot size for your chosen risk percentage.</p>
    </div>
