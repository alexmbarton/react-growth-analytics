# React Analytics

Tools to display Analytics

## Install

Install package by running:

```
yarn add react-growth-analytics
```

### SevenDayInput()

Converts daily data to rolling 7 day cohorts. Works backwards from most recent date and ignores the earliest incomplete week's data to remove outliers.

Useful for monitoring product changes on a daily basis.

#### API

```
type DayData = {
  date: Date,
  count: number
};

type dataFormat = DayData[];

CohortConverter(data: dataFormat);
```

### Sample usage

```
import { cohortConverter } from 'react-growth-analytics';

const dayData = [
  {
    date: '2018-01-01',
    count: 300
  },
  {
    date: '2018-01-02',
    count: 323
  },
  ...
]

// View data in 7 days
let output = cohortConverter(dayData,7);

// Now view data in 28 days
output = cohortConverter(dayData,28);

// Let's add graph headers
output.unshift(['Date', '# count']);

// Add to Google Chart...
```
