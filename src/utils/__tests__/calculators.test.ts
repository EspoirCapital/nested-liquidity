import { describe, it, expect } from 'vitest';
import {
  sanitizeWR,
  calcRiskAmount,
  calcMaxDailyLosses,
  calcMaxTotalLosses,
  calcRR,
  calcTradesToPass,
  calcRecommendedRR,
  calcPerfectTrades,
  calcLotSize,
  isLotOutOfRange,
} from '../calculators';

describe('sanitizeWR', () => {
  it('returns valid range unchanged', () => {
    expect(sanitizeWR(67, 80)).toEqual({ min: 67, max: 80 });
  });

  it('clamps min below 1', () => {
    expect(sanitizeWR(0, 80)).toEqual({ min: 1, max: 80 });
  });

  it('clamps min above 99', () => {
    expect(sanitizeWR(100, 100)).toEqual({ min: 99, max: 100 });
  });

  it('clamps max to 100', () => {
    expect(sanitizeWR(67, 150)).toEqual({ min: 67, max: 100 });
  });

  it('ensures max > min', () => {
    expect(sanitizeWR(80, 80)).toEqual({ min: 80, max: 81 });
  });

  it('defaults NaN to 60/75', () => {
    expect(sanitizeWR(NaN, NaN)).toEqual({ min: 60, max: 75 });
  });

  it('defaults NaN min only', () => {
    expect(sanitizeWR(NaN, 90)).toEqual({ min: 60, max: 90 });
  });
});

describe('calcRiskAmount', () => {
  it('calculates 2% of 50000', () => {
    expect(calcRiskAmount(50000, 2)).toBe(1000);
  });

  it('calculates 1% of 10000', () => {
    expect(calcRiskAmount(10000, 1)).toBe(100);
  });

  it('handles 0% risk', () => {
    expect(calcRiskAmount(50000, 0)).toBe(0);
  });
});

describe('calcMaxDailyLosses', () => {
  it('5% daily DD on 50k with 1000 risk = 2.5 -> ceil 3', () => {
    expect(calcMaxDailyLosses(50000, 5, 1000)).toBe(3);
  });

  it('5% daily DD on 50k with 500 risk = 5', () => {
    expect(calcMaxDailyLosses(50000, 5, 500)).toBe(5);
  });
});

describe('calcMaxTotalLosses', () => {
  it('10% max DD on 50k with 1000 risk = 5', () => {
    expect(calcMaxTotalLosses(50000, 10, 1000)).toBe(5);
  });

  it('10% max DD on 50k with 500 risk = 10', () => {
    expect(calcMaxTotalLosses(50000, 10, 500)).toBe(10);
  });
});

describe('calcRR', () => {
  it('70% WR, 2% risk, 1.0 EV -> expected RR', () => {
    // w = 0.7, (1.0 + 2*(1-0.7)) / (0.7*2) = (1.0+0.6)/1.4 = 1.6/1.4
    const result = calcRR(70, 2, 1.0);
    expect(result).toBeCloseTo(1.1428, 3);
  });

  it('60% WR, 1% risk, 1.0 EV', () => {
    // w = 0.6, (1.0 + 1*(1-0.6)) / (0.6*1) = 1.4/0.6
    const result = calcRR(60, 1, 1.0);
    expect(result).toBeCloseTo(2.3333, 3);
  });
});

describe('calcTradesToPass', () => {
  it('8% target, 1.0 EV -> 8 trades', () => {
    expect(calcTradesToPass(8, 1.0)).toBe(8);
  });

  it('8% target, 0.5 EV -> 16 trades', () => {
    expect(calcTradesToPass(8, 0.5)).toBe(16);
  });

  it('5% target, 1.0 EV -> 5 trades', () => {
    expect(calcTradesToPass(5, 1.0)).toBe(5);
  });
});

describe('calcRecommendedRR', () => {
  it('average of rrMinWR and rrMaxWR', () => {
    // min=67%: (1.0 + 2*(1-0.67)) / (0.67*2) = (1.0+0.66)/1.34 = 1.66/1.34 ≈ 1.2388
    // max=80%: (1.0 + 2*(1-0.80)) / (0.80*2) = (1.0+0.40)/1.60 = 1.40/1.60 = 0.875
    // avg ≈ (1.2388 + 0.875) / 2 ≈ 1.0569
    const result = calcRecommendedRR(67, 80, 2, 1.0);
    expect(result).toBeCloseTo(1.0569, 2);
  });
});

describe('calcPerfectTrades', () => {
  it('8% target, 2% risk -> 4 trades', () => {
    // recommendedWinPct = 2 * recommendedRR
    // We just test the formula: ceil(round((8 / 2) * 1000) / 1000)
    expect(calcPerfectTrades(8, 2)).toBe(4);
  });

  it('8% target, 1.5% risk -> 6 trades', () => {
    expect(calcPerfectTrades(8, 1.5)).toBe(6);
  });
});

describe('calcLotSize', () => {
  it('standard major pair: 10000 bal, 1% risk, 20 pip SL, pipValue=10', () => {
    // riskAmount = 100, lotSize = 100 / (20*10) = 0.5
    expect(calcLotSize(10000, 1, 20, 10)).toBe(0.5);
  });

  it('gold: 10000 bal, 1% risk, 50 pip SL, pipValue=1', () => {
    // riskAmount = 100, lotSize = 100 / (50*1) = 2
    expect(calcLotSize(10000, 1, 50, 1)).toBe(2);
  });

  it('rounds to 2 decimals', () => {
    // 10000, 1%, 30 pips, pipValue=10 -> 100/300 = 0.333... -> 0.33
    expect(calcLotSize(10000, 1, 30, 10)).toBe(0.33);
  });
});

describe('isLotOutOfRange', () => {
  it('0.5 is in range', () => {
    expect(isLotOutOfRange(0.5)).toBe(false);
  });

  it('0.005 is out of range', () => {
    expect(isLotOutOfRange(0.005)).toBe(true);
  });

  it('15 is out of range', () => {
    expect(isLotOutOfRange(15)).toBe(true);
  });

  it('0.01 is in range (edge)', () => {
    expect(isLotOutOfRange(0.01)).toBe(false);
  });

  it('10 is in range (edge)', () => {
    expect(isLotOutOfRange(10)).toBe(false);
  });
});
