// @flow

import type { data } from './types';

// Accumlates count over a given period
export const accumulator = (
  data: data,
  period: number,
  percentage: boolean
) => {
  const input = data.slice();
  const output = [];
  let currentPeriod = 0;
  while (input.length >= period) {
    const rowArray = [];

    currentPeriod += period;

    // Take week
    const week = input.splice(0, period);

    // First day should be n minus period.
    rowArray.push(week[period - 7].date);

    let count = week.reduce((s, v) => s + v.count, 0);

    if (percentage) {
      const denom = week.reduce((s, v) => s + v.denom, 0);
      count = count / denom;
    }

    rowArray.push(count);

    output.push(rowArray);
  }

  return output;
};
