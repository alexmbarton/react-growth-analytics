// @flow

import type { data } from './types';

// Accumlates count over a given period
export const accumulator = (data: data, period: number) => {
  const output = [];

  while (data.length >= period) {
    const rowArray = [];

    // Take week
    const week = data.splice(0, period);

    // First day should be the date.
    rowArray.push(week[period - 1].date);

    const count = week.reduce((s, v) => s + v.count, 0);

    rowArray.push(count);

    output.push(rowArray);
  }

  return output;
};
