<div class="page">
      <div class="page-kicker">Education</div>
      <h1>How to create an NH &amp; NL indicator.</h1>
      <p class="lede">A step-by-step guide to building an indicator that detects Nested Highs and Nested Lows automatically using nothing but price action logic.</p>

      <h2>Step 1 — Find the FVGs</h2>
      <p>A Fair Value Gap forms when three consecutive candles leave a price gap. The middle candle's wicks don't fully overlap with the candles on either side. Track every FVG as it appears: its direction (bullish if the gap is upward, bearish if downward), its top and bottom price boundaries, and the bar index when it formed.</p>

      <h2>Step 2 — Find the swing points</h2>
      <p>A swing high is a candle with a higher high than the candles on each side of it (configurable lookback, typically 5 bars each way). A swing low is the opposite — a lower low than its neighbours. Every new swing high or low is a candidate for nesting.</p>

      <h2>Step 3 — Check if the swing sits inside an FVG</h2>
      <p>For each new swing point, look back at recent FVGs and ask:</p>
      <ul>
        <li><strong>Is it inside?</strong> The swing price must be <em>between</em> the FVG's bottom and top. Not touching the edge — strictly inside.</li>
        <li><strong>Does the direction match?</strong> A swing high (NH) needs a <em>bearish</em> FVG. A swing low (NL) needs a <em>bullish</em> FVG. The gap should point in the opposite direction of the swing — that's what makes it "nested."</li>
        <li><strong>Is it close enough?</strong> The FVG must have formed recently — typically within 10–15 bars before the swing. Old gaps are less relevant.</li>
      </ul>

      <h2>Step 4 — Is the FVG still intact?</h2>
      <p>An FVG only protects the nested level if no candle has fully closed <em>outside</em> the gap since it formed. Check every candle from the FVG's formation up to the current bar: if any close is entirely above the gap (for a bearish FVG) or entirely below it (for a bullish FVG), the FVG is broken and the level is invalid.</p>
      <p>This check must run both at the moment the swing is discovered and continuously as new candles form.</p>

      <h2>Step 5 — Mark it swept</h2>
      <p>Once a valid NH or NL is identified, track it until price crosses through it. When price sweeps past the level, the setup is triggered — the level is now "swept" and removed from further consideration.</p>
      <p>From there, the trader watches for an IFVG to form on the lower timeframe for entry. That part is discretionary — the indicator simply highlights the opportunity.</p>
    </div>
