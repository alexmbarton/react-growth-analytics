// @flow
type DayData = {
  date: string,
  count: number
};

type SevenDayInput = DayData[];

module.exports = function(data: SevenDayInput) {
  if (!data || data.length < 7) {
    return false;
  }

  // Take the dataset, reverse it, split into sevenDays
  const output = [];
  let sevenDayCount = 0;
  let i = 1;
  let rowArray = [];
  Object.values(data)
    // static values(object: any): Array<mixed>;
    // Reverse to get rolling seven days
    .reverse()

    // Loop through data set
    .forEach(value => {
      if (i % 7 === 6) {
        rowArray.push(value.date);
      }

      sevenDayCount += value.count;
      // After each 7 day period, init new array
      if (i % 7 === 0) {
        // Only after the first iteration, create a new array
        // Note that any part 7 day periods at the end of the data set
        // will be ignored.
        rowArray.push(sevenDayCount);
        output.push(rowArray);
        sevenDayCount = 0;
        rowArray = [];
      }

      i++;
    });

  // Return the data to the correct time order.
  output.reverse();

  return output;
};
