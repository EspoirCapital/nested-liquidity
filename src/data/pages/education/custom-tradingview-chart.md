<div class="page">
      <div class="page-kicker">Education</div>
      <h1>Custom TradingView chart.</h1>
      <p class="lede">A TradingView chart set up with the Nested Liquidity color scheme for spotting NH/NL levels, marking FVGs, and watching for sweeps and IFVG confirmations on the higher timeframe.</p>
      <p>The following steps walk you through setting up a custom chart with the Nested Liquidity color scheme — cool gray-blue background, muted green bullish candles, fully black bearish candles. Once set up, save it as a TradingView chart layout so it's ready every session.</p>

      <h2>Color scheme</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px;">
        <div style="background:#fbfaf7; border:1px solid #e2e0d8; border-radius:8px; padding:16px;">
          <div style="font-weight:700; font-family:'Source Serif 4', serif; font-size:15px; margin-bottom:10px;">Background</div>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:32px; height:32px; border-radius:4px; background:#cfd3dd; flex-shrink:0;"></div>
            <code>#cfd3dd</code>
            <button class="clr-copy" data-copy="#cfd3dd" title="Copy color code" style="margin-left:auto; flex-shrink:0; width:28px; height:28px; border:1px solid #e2e0d8; border-radius:5px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:24px;">
        <div style="background:#fbfaf7; border:1px solid #e2e0d8; border-radius:8px; padding:16px;">
          <div style="font-weight:700; font-family:'Source Serif 4', serif; font-size:15px; margin-bottom:10px;">Bullish candle</div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
            <div style="width:32px; height:32px; border-radius:2px; background:#80c683; border:2px solid #000000; flex-shrink:0;"></div>
            <code>body: #80c683</code>
            <button class="clr-copy" data-copy="#80c683" title="Copy color code" style="margin-left:auto; flex-shrink:0; width:28px; height:28px; border:1px solid #e2e0d8; border-radius:5px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:32px; height:4px; background:#000000; flex-shrink:0;"></div>
            <code>wick / border: #000000</code>
            <button class="clr-copy" data-copy="#000000" title="Copy color code" style="margin-left:auto; flex-shrink:0; width:28px; height:28px; border:1px solid #e2e0d8; border-radius:5px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
        <div style="background:#fbfaf7; border:1px solid #e2e0d8; border-radius:8px; padding:16px;">
          <div style="font-weight:700; font-family:'Source Serif 4', serif; font-size:15px; margin-bottom:10px;">Bearish candle</div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
            <div style="width:32px; height:32px; border-radius:2px; background:#000000; flex-shrink:0;"></div>
            <code>body: #000000</code>
            <button class="clr-copy" data-copy="#000000" title="Copy color code" style="margin-left:auto; flex-shrink:0; width:28px; height:28px; border:1px solid #e2e0d8; border-radius:5px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:32px; height:4px; background:#000000; flex-shrink:0;"></div>
            <code>wick / border: #000000</code>
            <button class="clr-copy" data-copy="#000000" title="Copy color code" style="margin-left:auto; flex-shrink:0; width:28px; height:28px; border:1px solid #e2e0d8; border-radius:5px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>
        </div>
      </div>

      <h2>1. Open a new chart</h2>
      <p>Log in to TradingView and open a new chart. Select your preferred pair — XAU/USD (gold) is the primary pair for this strategy due to its clean FVG formations and predictable sweeps, but any forex pair or CFD works. Set the timeframe to <strong>M15</strong> (the standard HTF for level identification).</p>
      <div class="img-placeholder">
        <div class="ph-icon">&#9633;</div>
        <div class="ph-label">New M15 Chart — Default Look</div>
      </div>
      <p class="img-desc">Insert screenshot of a default TradingView M15 chart before any color changes — shows the default white background, default green/red candles.</p>

      <h2>2. Set the chart background</h2>
      <p>The background uses a cool gray-blue to reduce eye strain during long sessions. TradingView's chart background is controlled in the chart settings:</p>
      <ul>
        <li>Click the <strong>gear icon</strong> (Settings) in the right toolbar, or right-click the chart and select <strong>"Settings"</strong>.</li>
        <li>Go to the <strong>"Appearance"</strong> tab.</li>
        <li>Under <strong>"Background"</strong>, click the color swatch and enter <code>#cfd3dd</code>.</li>
        <li>Set <strong>"Background Type"</strong> to Solid (not Gradient).</li>
        <li>Under <strong>"Grid Lines"</strong>, set both Vertical and Horizontal to <code>None</code> (select the empty option at the top of the color picker).</li>
        <li>Under <strong>"Crosshair"</strong>, set the color to <code>#1f5c4c</code> (the accent green).</li>
        <li>Still in Appearance, scroll to <strong>"Scales"</strong> and set <strong>"Background"</strong> to <code>#cfd3dd</code> and <strong>"Text"</strong> to <code>#000000</code>.</li>
      </ul>
      <div class="img-placeholder">
        <div class="ph-icon">&#9633;</div>
        <div class="ph-label">Appearance Settings — Background &amp; Grid Colors</div>
      </div>
      <p class="img-desc">Insert screenshot of the TradingView Appearance settings panel with #cfd3dd background (Solid), grid set to None, #1f5c4c crosshair, and #000000 scale text.</p>

      <h2>3. Set the candle colors</h2>
      <p>Still in the Settings panel, go to the <strong>"Candles"</strong> tab. This strategy uses a distinctive color scheme: bullish candles have a muted green body with black borders and wicks, while bearish candles are fully black. This makes bull and bear candles instantly distinguishable at a glance — the bright body draws your eye to bullish moves, while bearish candles blend into the background as "absence of bullishness."</p>
      <ul>
        <li><strong>Up Candle (Bullish)</strong> — Body: <code>#80c683</code>, Wick: <code>#000000</code>, Border: <code>#000000</code></li>
        <li><strong>Down Candle (Bearish)</strong> — Body: <code>#000000</code>, Wick: <code>#000000</code>, Border: <code>#000000</code></li>
      </ul>
      <div class="callout">
        <strong>Why this works —</strong> the muted green (#80c683) on a #cfd3dd background creates contrast without being harsh. The black border ensures the candle body is clearly visible. Bearish candles being fully black means they read as "structure being rejected" — price tried to push up (green body) or pushed down and failed (black candle), which aligns with how the strategy reads market structure.
      </div>
      <div class="img-placeholder">
        <div class="ph-icon">&#9633;</div>
        <div class="ph-label">Candle Settings — Colors Panel</div>
      </div>
      <p class="img-desc">Insert screenshot of the Candles settings tab with Up Candle set to body #80c683 / wick #000000 / border #000000 and Down Candle set to all #000000.</p>

      <h2>4. The final result</h2>
      <p>Once all colors are applied, the chart should have a clean, minimal look. The gray-blue background is gentle on the eyes, no grid lines to clutter the view, and the candle colors clearly distinguish bullish from bearish movement without the harsh default green/red that fatigues the eyes during long sessions.</p>
      <div class="img-placeholder">
        <div class="ph-icon">&#9633;</div>
        <div class="ph-label">Final Chart — M15 XAU/USD with NL Color Scheme</div>
      </div>
      <p class="img-desc">Insert screenshot of the completed M15 chart with #cfd3dd background, no grid, bullish candles #80c683 with black borders, and fully black bearish candles. Show a typical setup area with an FVG and a nested swing point visible.</p>

      <h2>5. Set up the lower timeframe pane</h2>
      <p>This strategy uses a two-timeframe approach: M15/M30/H1 for level identification and M2/M3 for entry confirmation via IFVG. To set this up on TradingView:</p>
      <ul>
        <li>Right-click the chart, select <strong>"Add Pane"</strong> (or use the + icon in the bottom toolbar).</li>
        <li>In the new pane, set the timeframe to <strong>M2</strong> or <strong>M3</strong> (click the timeframe button at the top and scroll to 2m or 3m, or use the Replay bar's interval selector).</li>
        <li>Apply the same color settings to this pane — it will inherit them automatically from the main chart if you use the same layout.</li>
        <li>The upper pane is your HTF level identification chart. The lower pane is your LTF confirmation chart. When price sweeps an NH/NL on the upper pane, drop your eyes to the lower pane and watch for IFVGs to invert for entry.</li>
      </ul>
      <div class="img-placeholder">
        <div class="ph-icon">&#9633;</div>
        <div class="ph-label">Dual-Pane Layout — M15 (HTF) + M2 (LTF)</div>
      </div>
      <p class="img-desc">Insert screenshot showing the full dual-pane layout: M15 chart on top with a swept NH/NL level marked, M2 chart on the bottom showing an IFVG forming after the sweep.</p>

      <h2>6. Save as a layout</h2>
      <p>Once everything is set up, save the layout so you don't have to redo these steps:</p>
      <ul>
        <li>Click the layout name at the top of the chart (it might say "Layout 1" or the pair name).</li>
        <li>Click <strong>"Save"</strong> (or "Save As") and name it something like <em>"Nested Liquidity Strategy"</em>.</li>
        <li>Next time you open TradingView, select this layout and the chart is ready with all colors, panes, and your preferred symbol.</li>
      </ul>
      <p>Use the Rectangle tool to mark FVGs (draw from the top wick of candle 1 to the bottom wick of candle 3), the Ray tool to mark NH/NL levels, and the Crosshair to check if price has closed a body through a level. Over time, build a library of marked-up charts showing your setups — this helps pattern recognition more than any indicator can.</p>
    </div>
