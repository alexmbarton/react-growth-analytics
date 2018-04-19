// @flow

import type { data } from './types';

// Accumlates count over a given period
export const accumulator = (
  data: data,
  period: number,
  percentage: boolean,
  goal: number
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

    // rd: reduced data
    let rd = week.reduce(
      (s, v) => {
        return {
          count: (s.count += v.count),
          denom: (s.denom += v.denom),
          attribute: (s.attribute += v.attribute ? v.attribute : '')
        };
      },
      {
        count: 0,
        denom: 0,
        attribute: ''
      }
    );

    if (percentage) {
      rd.count = rd.count / rd.denom;
    }

    rowArray.push(rd.count);

    if (goal) {
      const goalValue = percentage ? goal / 100 : goal;
      rowArray.push(goalValue);
    }

    rowArray.push(rd.attribute);

    output.push(rowArray);
  }

  return output;
};
