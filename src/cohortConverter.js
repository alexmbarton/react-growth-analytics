// @flow

import { accumulator } from './utils';

import type { data } from './types';

module.exports = function(
  data: data,
  period: number,
  percentage: boolean,
  goal: number
) {
  // If there isn't data or there is less than
  // n items in the array, return false.
  if (!data || data.length < period) {
    return false;
  }

  // Reverse data so we work backwards to get rolling n days
  data.reverse();

  const output = accumulator(data, period, percentage, goal);

  output.reverse();

  return output;
};
