// @flow

import type { DauData } from './types';

module.exports = function(data: DauData) {
  // If there isn't data return false.

  if (!data || data.length < 28) {
    return false;
  }

  // Reverse data so we work backwards to get rolling n days
  data.reverse();

  // Create a copy of
  const input = data.slice();

  // Create output
  const output = [];

  while (input.length >= 28) {
    const period = input.splice(0, 1);
    output.push({
      date: period[0].date,
      count: period[0].count,
      stickiness: parseFloat(
        period[0].count /
          (input
            .slice()
            .splice(0, 27)
            .reduce((s, v) => (s += v.count), 0) +
            period[0].count)
      ).toFixed(4)
    });
  }

  // Reverse data back to origonal order
  output.reverse();

  return output;
};
