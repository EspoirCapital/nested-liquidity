# Nested Liquidity

A liquidity-sweep reversal framework built around swing points hidden inside Fair Value Gaps — swept on the higher timeframe, confirmed on the lower one.

Developed by [EspoirCapital](https://github.com/EspoirCapital).

**Live → [nested-liquidity.vercel.app](https://nested-liquidity.vercel.app)**

---

## What is this?

This is an interactive web app that teaches you the **Nested Liquidity** ICT-adjacent reversal framework from start to finish. It covers:

- **Core Concept** — Why FVGs hide traps and how to exploit them
- **Definitions** — Fair Value Gaps, Swing Highs/Lows, Nested Highs/Lows, Inversion FVGs, and the Validity Rule
- **The Setup** — A 4-step process: identify the level, wait for the sweep, get LTF confirmation, enter
- **Trade Management** — Stop loss placement and order type selection
- **Risk & Win Rate** — The math behind expected value and how to size positions
- **Discretionary Filters** — Death candles, reaction location, rejection wicks, and more
- **Education** — Trading sessions, brokers, prop firms, position sizing, news events, and TradingView chart setup

## Built-in Tools

| Tool | What it does |
|------|-------------|
| **EV Calculator** | Calculates expected value, required R:R, and trades needed to pass a funded account challenge |
| **Position Size Calculator** | Computes lot size based on account balance, risk %, and stop loss in pips |
| **Session Tracker** | Live Tokyo / London / New York session status with timezone conversion |

## Tech Stack

- React 19 + TypeScript
- Vite
- Chart.js (EV curve visualization)
- Tanstack Router
- Oxlint

## Getting Started

```bash
git clone https://github.com/EspoirCapital/nested-liquidity.git
cd nested-liquidity
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Oxlint |

## License

MIT
