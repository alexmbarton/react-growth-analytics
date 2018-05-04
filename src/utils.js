// @flow

import type { data, options } from './types';

// Accumlates count over a given period
export const accumulator = (data: data, period: number, options: options) => {
  const input = data.slice();
  const output = [];
  let currentPeriod = 0;
  let annotationCount = countAnnotations(data);

  while (input.length >= period) {
    const rowArray = [];

    currentPeriod += period;

    // Take time_period
    const time_period = input.splice(0, period);

    // First day should be last item in array.
    // Which here is 0 because it's the first as
    // Array will be reversed on output
    rowArray.push(time_period[0].date);

    // rd: reduced data
    let rd = time_period.reduce(
      (s, v) => {
        return {
          count: (s.count += v.count),
          denom: (s.denom += v.denom),
          annotation: (s.annotation += v.annotation ? v.annotation : '')
        };
      },
      {
        count: 0,
        denom: 0,
        annotation: ''
      }
    );

    if (options && options.percentage) {
      rd.count = rd.count / rd.denom;
    }

    rowArray.push(rd.count);

    // Handle attributes

    if (options.annotate === true) {
      if (rd.annotation) {
        rowArray.push(annotationCount.toString());
        annotationCount--;
        rowArray.push(rd.annotation);
      } else {
        rowArray.push(null);
        rowArray.push(null);
      }
    }

    // Add the goal as the final item in the object
    if (options && options.goal) {
      const goalValue = options.percentage ? options.goal / 100 : options.goal;
      rowArray.push(goalValue);
    }

    output.push(rowArray);
  }

  return output;
};

export const countAnnotations = (data: data) => {
  return data.reduce((state, item) => {
    if (item.annotation) state += 1;
    return state;
  }, 0);
};
