// @flow

import cohortConversion from '../cohortConverter';

const data = [
  { date: '2018-01-01', count: 10, denom: 20 },
  { date: '2018-01-02', count: 10, denom: 20 },
  { date: '2018-01-03', count: 10, denom: 20 },
  { date: '2018-01-04', count: 10, denom: 20 },
  { date: '2018-01-05', count: 10, denom: 20 },
  { date: '2018-01-06', count: 10, denom: 20 },
  { date: '2018-01-08', count: 10, denom: 20 },
  { date: '2018-01-09', count: 10, denom: 40 },
  { date: '2018-01-10', count: 10, denom: 40 },
  { date: '2018-01-11', count: 10, denom: 40 },
  { date: '2018-01-12', count: 10, denom: 40 },
  { date: '2018-01-13', count: 10, denom: 40 },
  { date: '2018-01-14', count: 10, denom: 40 },
  { date: '2018-01-15', count: 10, denom: 40 }
];

describe('SevenDays', () => {
  it('should return false if no data is passed', () => {
    const output = cohortConversion(undefined, 7);

    expect(output).toEqual(false);
  });

  it('should return false if an empty array is passed', () => {
    const output = cohortConversion([], 7);

    expect(output).toEqual(false);
  });

  it('should return false if less than 7 days of data is passed', () => {
    const segment = Object.assign([], data).splice(0, 6);

    const output = cohortConversion(segment, 7);

    expect(output).toBe(false);
  });

  it('should return the correct total of 7 days data', () => {
    const segment = Object.assign([], data).splice(0, 7);

    const output = cohortConversion(segment, 7);

    expect(output[0][1]).toEqual(70);
  });

  it('should return the last date in the series', () => {
    const output = cohortConversion(data, 7);

    expect(output[1][0]).toEqual('2018-01-15');
    expect(output[0][0]).toEqual('2018-01-08');
  });

  it('should return a percentage if a third param is true', () => {
    const output = cohortConversion(data, 7, true);

    expect(output[1][1]).toEqual(0.5);
    expect(output[0][1]).toEqual(0.25);
  });
});
