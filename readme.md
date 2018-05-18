# React Analytics

Tools to display Analytics

## Install

Install package by running:

```javascript
yarn add react-growth-analytics
```

### CohortConverter()

Converts daily data to rolling 7 day cohorts. Works backwards from most recent date and ignores the earliest incomplete week's data to remove outliers.

Useful for monitoring product changes on a daily basis.

### Stickiness()

Calculates L28. DAU / 28 days of DAU.

Useful for understanding how sticky your product is.

### API

#### CohortConverter

```javascript
type DayData = {
  date: Date,
  count: number
};

type dataFormat = DayData[];

CohortConverter(
  (data: dataFormat),
  (cohortLength: number),
  (outputAsAPercentage: boolean),
  (includeGoal: number)
);
```

### Sample usage

```javascript
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

### Output as percentage

If you would like to receive output as a percentage, then simply add a `true` boolean to `cohortConverter()`:

```javascript
const output = cohortConverter(dataArray, period, true);
```

### Adding a goal

If you would like to add a static goal to your output then simply provide it as a 4th param.

If you have requested the data to be returned as a percentage, the goal will also be returned as a percentage.

```javascript
const output = cohortConverter(dataArray, period, true, 30); // 0.3

cohortConverter(dataArray, period, false, 30); // 30
```

### Adding attributes

If you add a param of `annotation` to your data, it will return as the final param in the accumulated data set.

```javascript
const dayData = [
  {
    date: '2018-01-01',
    count: 300,
    annotation: null
  },
  {
    date: '2018-01-02',
    count: 323,
    annotation: "Launched Newsletter"
  },
  ...
]
```

#### Stickiness

```javascript
type DAU = {
  date: Date,
  count: number
};

type dataFormat = DayData[];

CohortConverter((data: dataFormat));
```

### Sample usage

```javascript
import { stickiness } from 'react-growth-analytics';

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

const sticky = stickiness(dayData);

// [
//   {
//     date: '2018-01-01',
//     count: 300,
//     stickiness: 0.0232
//   },
//   {
//     date: '2018-01-02',
//     count: 323,
//     stickiness: 0.0132
//   },
//   ...
// ]
```
