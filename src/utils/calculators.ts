export function sanitizeWR(min: number, max: number): { min: number; max: number } {
  const safeMin = Math.max(1, Math.min(99, isNaN(min) ? 60 : min));
  const safeMax = Math.max(safeMin + 1, Math.min(100, isNaN(max) ? 75 : max));
  return { min: safeMin, max: safeMax };
}

export function calcRiskAmount(balance: number, riskPct: number): number {
  return balance * (riskPct / 100);
}

export function calcMaxDailyLosses(balance: number, dailyDD: number, riskAmount: number): number {
  return Math.ceil((balance * (dailyDD / 100)) / riskAmount);
}

export function calcMaxTotalLosses(balance: number, maxDD: number, riskAmount: number): number {
  return Math.ceil((balance * (maxDD / 100)) / riskAmount);
}

export function calcRR(winRate: number, riskPct: number, evTarget: number): number {
  const w = winRate / 100;
  return (evTarget + riskPct * (1 - w)) / (w * riskPct);
}

export function calcTradesToPass(targetPct: number, evTarget: number): number {
  return Math.ceil(Math.round((targetPct / evTarget) * 1000) / 1000);
}

export function calcRecommendedRR(minWR: number, maxWR: number, riskPct: number, evTarget: number): number {
  const rrMin = calcRR(minWR, riskPct, evTarget);
  const rrMax = calcRR(maxWR, riskPct, evTarget);
  return (rrMin + rrMax) / 2;
}

export function calcPerfectTrades(targetPct: number, recommendedWinPct: number): number {
  return Math.ceil(Math.round((targetPct / recommendedWinPct) * 1000) / 1000);
}

export const PIP_VALUES: Record<string, number> = {
  majors: 10,
  gold: 1,
  silver: 1,
};

export function calcLotSize(balance: number, riskPct: number, slPips: number, pipValue: number): number {
  const riskAmount = calcRiskAmount(balance, riskPct);
  const lotSize = riskAmount / (slPips * pipValue);
  return Math.round(lotSize * 100) / 100;
}

export function isLotOutOfRange(lotSize: number): boolean {
  return lotSize < 0.01 || lotSize > 10;
}
