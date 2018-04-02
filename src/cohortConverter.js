// @flow

import { accumulator } from './utils';

import type { data } from './types';

module.exports = function(data: data, period: number) {
  // If there isn't data or there is less than
  // 7 items in the array, return false.
  if (!data || data.length < period) {
    return false;
  }

  // Reverse data so we work backwards to get rolling 7 days
  data.reverse();

  const output = accumulator(data, period);

  output.reverse();

  return output;
};
