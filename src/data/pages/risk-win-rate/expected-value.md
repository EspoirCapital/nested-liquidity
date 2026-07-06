<div class="page">
      <div class="page-kicker">05 — Risk-Reward &amp; Win Rate</div>
      <h1>Expected value.</h1>
      <p class="lede">The single number that tells you whether a strategy is worth trading at all.</p>
      <p>Expected Value (EV) is the average result you'd expect per trade if you repeated it many times, given your win rate and your risk-reward ratio. A positive EV means the strategy makes money over a large enough sample, even though any individual trade can still lose.</p>
      <div class="callout">
        <strong>Formula —</strong> EV = (Win Rate × Average Win) − (Loss Rate × Average Loss). Expressed against your risk per trade, this becomes EV% = (Win Rate × RR) − (Loss Rate × 1), where RR is your reward relative to 1 unit of risk.
      </div>
      <p>The calculator below works backward from this formula: set your account size, drawdown limits, win rate range, and target EV per trade, and it tells you the required RR to hit that target — plus how many trades it should take to pass a funded account challenge.</p>

      <div class="ev-panel">
        <div class="ev-panel-title">Strategy Goals</div>
        <div class="ev-grid-2">
          <div class="ev-input-group">
            <div class="ev-input-header"><span>Account Size ($)</span></div>
            <input type="number" id="ev-accountSize" value="50000" step="1000">
          </div>
          <div class="ev-input-group">
            <div class="ev-input-header"><span>Profit Target (%)</span></div>
            <input type="number" id="ev-targetPercent" value="8" step="0.5">
          </div>
        </div>
        <div class="ev-grid-2">
          <div class="ev-input-group">
            <div class="ev-input-header"><span>Daily DD (%)</span></div>
            <input type="number" id="ev-dailyDD" value="5" step="0.5">
          </div>
          <div class="ev-input-group">
            <div class="ev-input-header"><span>Max DD (%)</span></div>
            <input type="number" id="ev-maxDD" value="10" step="0.5">
          </div>
        </div>
        <div class="ev-grid-2">
          <div class="ev-input-group">
            <div class="ev-input-header"><span>Min Win Rate (%)</span></div>
            <input type="number" id="ev-minWR" value="60" step="1">
          </div>
          <div class="ev-input-group">
            <div class="ev-input-header"><span>Max Win Rate (%)</span></div>
            <input type="number" id="ev-maxWR" value="75" step="1">
          </div>
        </div>
        <div class="ev-input-group">
          <div class="ev-input-header">
            <span>Target EV Per Trade (%)</span>
            <span class="ev-val" id="ev-evTargetVal">1.0%</span>
          </div>
          <input type="range" id="ev-evTarget" min="0.1" max="5.0" step="0.1" value="1.0">
        </div>
        <div class="ev-input-group" style="margin-bottom:0;">
          <div class="ev-input-header">
            <span>Risk Per Trade (%)</span>
            <span class="ev-val" id="ev-riskPercentVal">2.0%</span>
          </div>
          <input type="range" id="ev-riskPercent" min="0.1" max="5.0" step="0.1" value="2.0">
        </div>
        <div class="ev-input-group" style="margin-top:16px; margin-bottom:0;">
          <div class="ev-input-header">
            <span>Average RR</span>
            <span class="ev-val" id="ev-rrSliderVal">1.00</span>
          </div>
          <input type="range" id="ev-rrSlider" min="0.1" max="5" step="0.01" value="1" disabled>
        </div>
        <div class="ev-stats">
          <div class="ev-stat-row"><span>Capital at Risk:</span><span class="ev-val" id="ev-riskAmountOutput">$1,000</span></div>
          <div class="ev-stat-row"><span>Losses to blow Daily DD:</span><span class="ev-val ev-val-danger" id="ev-dailyLossesOutput">3 trades</span></div>
          <div class="ev-stat-row"><span>Losses to blow Max DD:</span><span class="ev-val ev-val-danger" id="ev-maxLossesOutput">5 trades</span></div>
          <div class="ev-stat-row" style="margin-top:8px; border-top:1px solid var(--line); padding-top:10px;"><span>Average trades to Pass:</span><span class="ev-val" id="ev-tradesToPassOutput">8 trades</span></div>
          <div class="ev-stat-row"><span title="Assuming you use the Recommended Average RR">Perfect scenario (Win streak):</span><span class="ev-val ev-val-success" id="ev-perfectPassOutput">4 trades</span></div>
        </div>
      </div>

      <div class="ev-panel">
        <div class="ev-panel-title">Required Risk:Reward (RR)</div>
        <div class="ev-summary" id="ev-dynamicSummary"></div>
        <div class="ev-chart-container">
          <canvas id="ev-rrChart"></canvas>
        </div>
      </div>
      <div class="img-placeholder">
        <div class="ph-icon">&#9633;</div>
        <div class="ph-label">EV Distribution</div>
      </div>
      <p class="img-desc">Insert chart showing expected value distribution across different win rates and RR ratios</p>
    </div>
