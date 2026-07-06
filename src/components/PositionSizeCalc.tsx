import { useState } from 'react';

export function PositionSizeCalc() {
  const [balance, setBalance] = useState(10000);
  const [riskPct, setRiskPct] = useState(1);
  const [slPips, setSlPips] = useState(20);
  const [pipValue, setPipValue] = useState(10);

  const riskAmount = balance * (riskPct / 100);
  const lotSize = riskAmount / (slPips * pipValue);
  const rounded = Math.round(lotSize * 100) / 100;

  let outputColor: string | undefined;
  if (rounded < 0.01 || rounded > 10) outputColor = 'var(--flag)';

  return (
    <div className="ps-calculator">
      <div className="ps-row">
        <label>Account Balance ($)</label>
        <input
          type="number"
          value={balance}
          onChange={e => setBalance(parseFloat(e.target.value) || 0)}
          step="500"
        />
      </div>
      <div className="ps-row">
        <label>Risk per Trade (%)</label>
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={riskPct}
          onChange={e => setRiskPct(parseFloat(e.target.value))}
        />
        <span className="ps-val">{riskPct}%</span>
      </div>
      <div className="ps-row">
        <label>Stop Loss (pips)</label>
        <input
          type="number"
          value={slPips}
          onChange={e => setSlPips(parseFloat(e.target.value) || 1)}
          step="5"
        />
      </div>
      <div className="ps-row">
        <label>Pair</label>
        <select value={pipValue} onChange={e => setPipValue(parseFloat(e.target.value))}>
          <option value="10">EUR/USD, GBP/USD (major)</option>
          <option value="10">USD/JPY, GBP/JPY (major)</option>
          <option value="1">XAU/USD (Gold)</option>
          <option value="1">XAG/USD (Silver)</option>
        </select>
      </div>
      <div className="ps-result">
        <div className="ps-label">Position Size</div>
        <div className="ps-value" style={{ color: outputColor }}>
          {rounded.toFixed(2)} lots
        </div>
        <div className="ps-sub">${riskAmount.toFixed(2)} risked per trade</div>
      </div>
    </div>
  );
}
