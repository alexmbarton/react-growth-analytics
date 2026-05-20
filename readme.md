# Growth Analytics

Tools for growth analytics data transformation.

## Install

```
yarn add react-growth-analytics
```

## API

### cohortConverter

Converts daily data into rolling N-day cohorts. Works backwards from the most recent date and discards the earliest incomplete period to remove outliers.

Useful for monitoring product changes on a daily basis.

```javascript
type DayData = {
  date: string,
  count: number,
  denom: number,         // denominator for percentage mode
  annotation: string     // optional annotation label
};

type Options = {
  percentage?: boolean,  // output as percentage (count / denom)
  goal?: number,         // static goal line value
  annotate?: boolean     // include annotations (default: true)
};

cohortConverter(data: DayData[], period: number, options?: Options)
```

#### Sample usage

```javascript
import { cohortConverter } from 'react-growth-analytics';

const dayData = [
  { date: '2018-01-01', count: 10, denom: 20, annotation: null },
  { date: '2018-01-02', count: 10, denom: 20, annotation: null },
  { date: '2018-01-03', count: 10, denom: 20, annotation: 'Launched Newsletter' },
  // ...
];

// View data in 7-day cohorts
let output = cohortConverter(dayData, 7);

// View as percentages
output = cohortConverter(dayData, 7, { percentage: true });

// Add a goal line
output = cohortConverter(dayData, 7, { percentage: true, goal: 30 });
// goal is returned as 0.3 in percentage mode

// Disable annotations
output = cohortConverter(dayData, 7, { annotate: false });
```

### stickiness

Calculates L28 stickiness: DAU / rolling 28-day total DAU.

Useful for understanding how sticky your product is.

```javascript
type Dau = {
  date: string,
  count: number
};

stickiness(data: Dau[])
```

#### Sample usage

```javascript
import { stickiness } from 'react-growth-analytics';

const dayData = [
  { date: '2018-01-01', count: 300 },
  { date: '2018-01-02', count: 323 },
  // ... (minimum 28 days)
];

const sticky = stickiness(dayData);

// [
//   {
//     date: '2018-01-29',
//     count: 300,
//     stickiness: 0.0232
//   },
//   ...
// ]
```

## License

MIT
