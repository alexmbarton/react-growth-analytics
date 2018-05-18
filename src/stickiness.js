// @flow

import type { DauData } from './types';

module.exports = function(data: DauData) {
  // If there isn't data return false.

  if (!data || data.length < 28) {
    return false;
  }

  // for each data item
  // Devide count / sum of 28 count
  return data.map(datum => {
    console.log(datum);
  });
};
