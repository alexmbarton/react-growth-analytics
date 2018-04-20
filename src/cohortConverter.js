// @flow

import { accumulator } from './utils';

import type { data, options } from './types';

const defaultOptions = {
  annotate: true
};

module.exports = function(data: data, period: number, options?: options) {
  // If there isn't data or there is less than
  // n items in the array, return false.
  if (!data || data.length < period) {
    return false;
  }

  // Reverse data so we work backwards to get rolling n days
  data.reverse();

  const output = accumulator(
    data,
    period,
    Object.assign({}, defaultOptions, options)
  );

  output.reverse();

  return output;
};
