export const toSevenDay = data => {
  // Take the dataset, reverse it, split into sevenDays

  const output = [];
  let sevenDayCount = 0;
  let i = 0;
  let rowArray = [];
  Object.values(data)
  // static values(object: any): Array<mixed>;
  // Reverse to get rolling seven days
  .reverse()

  // Loop through data set
  .forEach(value => {
    // After each 7 day period, init new array
    if (i % 7 === 0) {
      // Only after the first iteration, create a new array
      // Note that any part 7 day periods at the end of the data set
      // will be ignored.
      if (i > 0) {
        rowArray.push(sevenDayCount);
        sevenDayCount = 0;
        output.push(rowArray);
        rowArray = [];
      }
      rowArray.push(value.date);
    }

    sevenDayCount += value.count;

    i++;
  });

  // Return the data to the correct time order.
  output.reverse();

  return output;
};