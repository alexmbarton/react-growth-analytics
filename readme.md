# React Analytics

Tools to display Analytics

## Install

Install package by running:

```
yarn add react-growth-analytics
```

### SevenDayInput()

#### API

```
type DayData = {
  date: Date,
  count: number
};

type SevenDayInput = DayData[];

SevenDayInput(data: SevenDayInput);
```

### Sample usage

```
import sevenDayInput from 'react-growth-analytics';

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

let output = sevenDayInput(dayData);

output.unshift(['Date', '# count']);

// Add to Google Chart...
```
