<div class="page">
      <div class="page-kicker">Education</div>
      <h1>Order types.</h1>
      <p class="lede">Market, Limit, Stop, Stop-Limit — what each one does, when to use which, and how they apply to the Nested Liquidity strategy.</p>

      <h2>Market Order</h2>
      <p>Executes immediately at the current best available price. You say "buy now" and it fills at whatever the market is offering. Used when speed matters more than the exact price.</p>
      <p><strong>Used here:</strong> When you spot the IFVG confirmation candle forming on the LTF and need to enter immediately. Waiting for a better price could mean missing the move entirely. Set a market order the moment the candle closes in your favor.</p>
      <p><strong>Risk:</strong> Slippage — the price you get may be worse than what you saw. During news or fast markets, slippage can be significant. Use market orders only when speed is worth the uncertainty.</p>

      <h2>Limit Order</h2>
      <p>Executes only at a specific price or better. You say "buy at 1.1050 or lower" and the order sits there until price reaches that level. You control the price, but you don't control if or when it fills.</p>
      <p><strong>Used here:</strong> If you have a predefined entry level after the sweep and want to enter only if price retraces to your exact number. Less common for IFVG entries (those need speed) but useful if you're trading a specific swing level with room to wait.</p>
      <p><strong>Risk:</strong> Price may never reach your level, or it may blow right past it. Limit orders offer no guarantee of execution.</p>

      <h2>Stop Order (Stop Market)</h2>
      <p>Sits dormant until price reaches a specified trigger level, then executes as a market order. You say "buy if price reaches 1.1100" — once triggered, it fills at the next available price.</p>
      <p><strong>Used here:</strong> Entering on a sweep breakout. If price sweeps the NH/NL and keeps moving, a stop order ensures you catch the move. Also used for stop losses — a stop loss is just a stop order in the opposite direction.</p>
      <p><strong>Risk:</strong> Once triggered, same slippage risk as a market order. Stop orders don't guarantee a specific fill price.</p>

      <h2>Stop Limit Order</h2>
      <p>Combines both. You set a stop price (trigger) and a limit price (execution). When the stop is hit, a limit order is placed instead of a market order. You say "if price reaches 1.1100, buy at 1.1105 or better."</p>
      <p><strong>Used here:</strong> Rare for IFVG entries — too slow. Useful if you're trading wider levels and want to avoid slippage during volatile sweeps. Gives you price control at the cost of potentially missing the fill entirely.</p>
      <p><strong>Risk:</strong> If price moves past your limit too fast, the order never fills. You can be right on direction but miss the trade.</p>

      <h2>Which one for which scenario</h2>
      <ul>
        <li><strong>IFVG entry (LTF):</strong> Market order. Speed over price.</li>
        <li><strong>Stop loss:</strong> Stop order. Always. Never enter a trade without one.</li>
        <li><strong>Take profit:</strong> Limit order. Captures profit at a predefined level.</li>
        <li><strong>Pre-planned sweep entry:</strong> Stop order. Enter when the level breaks.</li>
        <li><strong>Retracement entry after sweep:</strong> Limit order. Wait for price to come back to you.</li>
      </ul>

      <h2>Execution gotchas to know</h2>
      <ul>
        <li><strong>Slippage</strong> — your order fills at a different price than expected. Common on market and stop orders during news. Reduce risk by trading during liquid hours (London/NY overlap).</li>
        <li><strong>Requotes</strong> — the broker rejects your requested price and offers a new one. Common with B-Book brokers when trying to enter profitable positions. Switch brokers if this happens consistently.</li>
        <li><strong>Partial fills</strong> — your order gets filled in pieces at different prices. Happens on large positions during low liquidity. Divide your position into smaller entries.</li>
        <li><strong>Order duration</strong> — Day (cancels at end of session) vs GTC (Good Till Cancelled). For this strategy, Day orders are safer — you don't want old orders triggering on unexpected moves.</li>
      </ul>

      <h2>On MatchTrader and MT5</h2>
      <p>Both platforms support all four order types. MatchTrader's interface is cleaner for quick market entries — relevant for IFVG execution where seconds matter. MT5 gives you more control over pending orders, stop levels, and expiration. Use whichever matches your execution speed needs.</p>
    </div>
