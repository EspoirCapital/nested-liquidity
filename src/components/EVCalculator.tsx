import { useState, useMemo } from 'react';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Filler, annotationPlugin);

const moneyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

function sanitizeWR(min: number, max: number): { min: number; max: number } {
  const safeMin = Math.max(1, Math.min(99, isNaN(min) ? 60 : min));
  const safeMax = Math.max(safeMin + 1, Math.min(100, isNaN(max) ? 75 : max));
  return { min: safeMin, max: safeMax };
}

export function EVCalculator() {
  const [accountSize, setAccountSize] = useState(50000);
  const [targetPct, setTargetPct] = useState(8);
  const [dailyDD, setDailyDD] = useState(5);
  const [maxDD, setMaxDD] = useState(10);
  const [minWR, setMinWR] = useState(60);
  const [maxWR, setMaxWR] = useState(75);
  const [evTarget, setEvTarget] = useState(1.0);
  const [riskPct, setRiskPct] = useState(2.0);

  const safeWRs = sanitizeWR(minWR, maxWR);
  const minWRPct = safeWRs.min;
  const maxWRPct = safeWRs.max;
  const avgWR = (minWRPct + maxWRPct) / 2;

  const currentRiskAmount = accountSize * (riskPct / 100);
  const maxDailyLosses = Math.ceil((accountSize * (dailyDD / 100)) / currentRiskAmount);
  const maxTotalLosses = Math.ceil((accountSize * (maxDD / 100)) / currentRiskAmount);
  const tradesToPass = Math.ceil(Math.round((targetPct / evTarget) * 1000) / 1000);

  const wMin = minWRPct / 100;
  const rrMinWR = (evTarget + riskPct * (1 - wMin)) / (wMin * riskPct);
  const wMax = maxWRPct / 100;
  const rrMaxWR = (evTarget + riskPct * (1 - wMax)) / (wMax * riskPct);
  const recommendedRR = (rrMinWR + rrMaxWR) / 2;
  const recommendedWinPct = riskPct * recommendedRR;
  const recommendedWinDollar = accountSize * (recommendedWinPct / 100);
  const perfectTrades = Math.ceil(Math.round((targetPct / recommendedWinPct) * 1000) / 1000);

  const chartMinX = Math.max(0, minWRPct - 15);
  const chartMaxX = Math.min(100, maxWRPct + 15);

  const chartData = useMemo(() => {
    const points: Array<{ x: number; y: number }> = [];
    for (let wr = Math.max(1, chartMinX - 5); wr <= Math.min(100, chartMaxX + 5); wr++) {
      const w = wr / 100;
      const rr = (evTarget + riskPct * (1 - w)) / (w * riskPct);
      if (rr > 0) points.push({ x: wr, y: rr });
    }
    return points;
  }, [evTarget, riskPct, chartMinX, chartMaxX]);

  const data = {
    datasets: [{
      label: 'Strategy Curve',
      data: chartData,
      borderColor: '#1f5c4c',
      backgroundColor: (ctx: any) => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 340);
        g.addColorStop(0, 'rgba(31,92,76,0.18)');
        g.addColorStop(1, 'rgba(31,92,76,0.0)');
        return g;
      },
      borderWidth: 3,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#1f5c4c',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 7,
      fill: true,
      tension: 0.4,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#1c1c1a',
        bodyColor: '#4a4a45',
        titleFont: { size: 13, family: "'IBM Plex Mono', monospace" },
        bodyFont: { size: 13, family: "'IBM Plex Mono', monospace" },
        padding: 12,
        borderColor: '#e2e0d8',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (context: any[]) => 'Win Rate: ' + context[0].parsed.x + '%',
          label: (context: any) => {
            const rr = context.parsed.y.toFixed(2);
            const winAmt = moneyFmt.format(currentRiskAmount * context.parsed.y);
            return ['Required RR:   1 : ' + rr, 'Average Win:   ' + winAmt];
          },
        },
      },
      annotation: {
        annotations: {
          targetZone: {
            type: 'box' as const,
            xMin: minWRPct, xMax: maxWRPct,
            yMin: rrMaxWR, yMax: rrMinWR,
            backgroundColor: 'rgba(31,92,76,0.08)',
            borderWidth: 1,
            borderColor: 'rgba(31,92,76,0.3)',
            drawTime: 'beforeDatasetsDraw' as const,
          },
          vLineMin: {
            type: 'line' as const,
            borderColor: 'rgba(28,28,26,0.35)',
            borderWidth: 1.5,
            borderDash: [6, 4],
            drawTime: 'afterDatasetsDraw' as const,
            xMin: minWRPct, xMax: minWRPct, yMin: 0, yMax: rrMinWR,
            label: {
              display: true,
              backgroundColor: '#1c1c1a',
              color: '#fbfaf7',
              font: { size: 11, family: "'IBM Plex Mono', monospace" },
              padding: 4,
              content: minWRPct + '% WR',
              position: 'start' as const,
              yAdjust: -15,
            },
          },
          vLineMax: {
            type: 'line' as const,
            borderColor: 'rgba(28,28,26,0.35)',
            borderWidth: 1.5,
            borderDash: [6, 4],
            drawTime: 'afterDatasetsDraw' as const,
            xMin: maxWRPct, xMax: maxWRPct, yMin: 0, yMax: rrMaxWR,
            label: {
              display: true,
              backgroundColor: '#1c1c1a',
              color: '#fbfaf7',
              font: { size: 11, family: "'IBM Plex Mono', monospace" },
              padding: 4,
              content: maxWRPct + '% WR',
              position: 'start' as const,
              yAdjust: -15,
            },
          },
          hLineMin: {
            type: 'line' as const,
            borderColor: 'rgba(28,28,26,0.35)',
            borderWidth: 1.5,
            borderDash: [6, 4],
            drawTime: 'afterDatasetsDraw' as const,
            xMin: chartMinX, xMax: minWRPct, yMin: rrMinWR, yMax: rrMinWR,
            label: {
              display: true,
              backgroundColor: '#1c1c1a',
              color: '#fbfaf7',
              font: { size: 11, family: "'IBM Plex Mono', monospace" },
              padding: 4,
              content: rrMinWR.toFixed(2) + ' RR',
              position: 'start' as const,
            },
          },
          hLineMax: {
            type: 'line' as const,
            borderColor: 'rgba(28,28,26,0.35)',
            borderWidth: 1.5,
            borderDash: [6, 4],
            drawTime: 'afterDatasetsDraw' as const,
            xMin: chartMinX, xMax: maxWRPct, yMin: rrMaxWR, yMax: rrMaxWR,
            label: {
              display: true,
              backgroundColor: '#1c1c1a',
              color: '#fbfaf7',
              font: { size: 11, family: "'IBM Plex Mono', monospace" },
              padding: 4,
              content: rrMaxWR.toFixed(2) + ' RR',
              position: 'start' as const,
            },
          },
          hLineRec: {
            type: 'line' as const,
            borderColor: '#1f5c4c',
            borderWidth: 2,
            borderDash: [4, 4],
            drawTime: 'afterDatasetsDraw' as const,
            xMin: chartMinX, xMax: minWRPct + (maxWRPct - minWRPct) / 2,
            yMin: recommendedRR, yMax: recommendedRR,
            label: {
              display: true,
              backgroundColor: '#1f5c4c',
              color: '#fff',
              font: { size: 11, family: "'IBM Plex Mono', monospace" },
              padding: 4,
              content: recommendedRR.toFixed(2) + ' RR (Rec.)',
              position: 'start' as const,
            },
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        min: chartMinX,
        max: chartMaxX,
        grid: { color: 'rgba(28,28,26,0.08)', drawBorder: false },
        title: { display: true, text: 'Win Rate (%)', color: '#4a4a45', font: { size: 12, weight: 'bold' as const } },
        ticks: { callback: (v: any) => v + '%' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(28,28,26,0.08)', drawBorder: false },
        title: { display: true, text: 'Required R:R Multiplier', color: '#4a4a45', font: { size: 12, weight: 'bold' as const } },
      },
    },
  };

  return (
    <div className="ev-calculator">
      {/* Page content text */}
      <div className="page-kicker">05 — Risk-Reward &amp; Win Rate</div>
      <h1>Expected value.</h1>
      <p className="lede">The single number that tells you whether a strategy is worth trading at all.</p>
      <p>Expected Value (EV) is the average result you'd expect per trade if you repeated it many times, given your win rate and your risk-reward ratio. A positive EV means the strategy makes money over a large enough sample, even though any individual trade can still lose.</p>
      <div className="callout">
        <strong>Formula —</strong> EV = (Win Rate × Average Win) − (Loss Rate × Average Loss). Expressed against your risk per trade, this becomes EV% = (Win Rate × RR) − (Loss Rate × 1), where RR is your reward relative to 1 unit of risk.
      </div>
      <p>The calculator below works backward from this formula: set your account size, drawdown limits, win rate range, and target EV per trade, and it tells you the required RR to hit that target — plus how many trades it should take to pass a funded account challenge.</p>

      {/* Calculator Panel */}
      <div className="ev-panel">
        <div className="ev-panel-title">Strategy Goals</div>
        <div className="ev-grid-2">
          <div className="ev-input-group">
            <div className="ev-input-header"><span>Account Size ($)</span></div>
            <input type="number" value={accountSize} onChange={e => setAccountSize(parseFloat(e.target.value) || 0)} step="1000" />
          </div>
          <div className="ev-input-group">
            <div className="ev-input-header"><span>Profit Target (%)</span></div>
            <input type="number" value={targetPct} onChange={e => setTargetPct(parseFloat(e.target.value) || 0)} step="0.5" />
          </div>
        </div>
        <div className="ev-grid-2">
          <div className="ev-input-group">
            <div className="ev-input-header"><span>Daily DD (%)</span></div>
            <input type="number" value={dailyDD} onChange={e => setDailyDD(parseFloat(e.target.value) || 0)} step="0.5" />
          </div>
          <div className="ev-input-group">
            <div className="ev-input-header"><span>Max DD (%)</span></div>
            <input type="number" value={maxDD} onChange={e => setMaxDD(parseFloat(e.target.value) || 0)} step="0.5" />
          </div>
        </div>
        <div className="ev-grid-2">
          <div className="ev-input-group">
            <div className="ev-input-header"><span>Min Win Rate (%)</span></div>
            <input type="number" value={minWR} onChange={e => setMinWR(parseFloat(e.target.value) || 60)} step="1" />
          </div>
          <div className="ev-input-group">
            <div className="ev-input-header"><span>Max Win Rate (%)</span></div>
            <input type="number" value={maxWR} onChange={e => setMaxWR(parseFloat(e.target.value) || 75)} step="1" />
          </div>
        </div>
        <div className="ev-input-group">
          <div className="ev-input-header">
            <span>Target EV Per Trade (%)</span>
            <span className="ev-val">{evTarget.toFixed(1)}%</span>
          </div>
          <input type="range" min="0.1" max="5.0" step="0.1" value={evTarget} onChange={e => setEvTarget(parseFloat(e.target.value))} />
        </div>
        <div className="ev-input-group" style={{ marginBottom: 0 }}>
          <div className="ev-input-header">
            <span>Risk Per Trade (%)</span>
            <span className="ev-val">{riskPct.toFixed(1)}%</span>
          </div>
          <input type="range" min="0.1" max="5.0" step="0.1" value={riskPct} onChange={e => setRiskPct(parseFloat(e.target.value))} />
        </div>
        <div className="ev-input-group" style={{ marginTop: '16px', marginBottom: 0 }}>
          <div className="ev-input-header">
            <span>Average RR</span>
            <span className="ev-val">{recommendedRR.toFixed(2)}</span>
          </div>
          <input type="range" min="0.1" max="5" step="0.01" value={Math.max(0.1, Math.min(5, recommendedRR))} disabled />
        </div>
        <div className="ev-stats">
          <div className="ev-stat-row">
            <span>Capital at Risk:</span>
            <span className="ev-val">{moneyFmt.format(currentRiskAmount)}</span>
          </div>
          <div className="ev-stat-row">
            <span>Losses to blow Daily DD:</span>
            <span className="ev-val ev-val-danger">{isFinite(maxDailyLosses) ? maxDailyLosses + ' trades' : 'N/A'}</span>
          </div>
          <div className="ev-stat-row">
            <span>Losses to blow Max DD:</span>
            <span className="ev-val ev-val-danger">{isFinite(maxTotalLosses) ? maxTotalLosses + ' trades' : 'N/A'}</span>
          </div>
          <div className="ev-stat-row" style={{ marginTop: '8px', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
            <span>Average trades to Pass:</span>
            <span className="ev-val">{isFinite(tradesToPass) && tradesToPass > 0 ? tradesToPass + ' trades' : 'N/A'}</span>
          </div>
          <div className="ev-stat-row">
            <span title="Assuming you use the Recommended Average RR">Perfect scenario (Win streak):</span>
            <span className="ev-val ev-val-success">{isFinite(perfectTrades) && perfectTrades > 0 ? perfectTrades + ' trades' : 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Chart Panel */}
      <div className="ev-panel">
        <div className="ev-panel-title">Required Risk:Reward (RR)</div>
        <div className="ev-summary">
          Avg. Strategy WR: <span className="ev-highlight">{avgWR.toFixed(1)}%</span> | Rec. RR: <span className="ev-highlight">1:{recommendedRR.toFixed(2)}</span> | Avg. Win: <span className="ev-highlight">{recommendedWinPct.toFixed(2)}% ({moneyFmt.format(recommendedWinDollar)})</span>
        </div>
        <div className="ev-chart-container" style={{ height: 340 }}>
          <Line data={data} options={options as any} />
        </div>
      </div>
    </div>
  );
}
