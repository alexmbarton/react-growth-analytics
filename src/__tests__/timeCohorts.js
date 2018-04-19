// @flow

import cohortConversion from '../cohortConverter';

const attributeA = 'Can you believe it?';
const attributeB = 'No I Cannot';

let data = [];

beforeEach(() => {
  data = [
    { date: '2018-01-01', count: 10, denom: 20, attribute: null },
    { date: '2018-01-02', count: 10, denom: 20, attribute: null },
    { date: '2018-01-03', count: 10, denom: 20, attribute: attributeB },
    { date: '2018-01-04', count: 10, denom: 20, attribute: null },
    { date: '2018-01-05', count: 10, denom: 20, attribute: null },
    { date: '2018-01-06', count: 10, denom: 20, attribute: null },
    { date: '2018-01-08', count: 10, denom: 20, attribute: null },
    { date: '2018-01-09', count: 10, denom: 40, attribute: null },
    { date: '2018-01-10', count: 10, denom: 40, attribute: null },
    { date: '2018-01-11', count: 10, denom: 40, attribute: null },
    { date: '2018-01-12', count: 10, denom: 40, attribute: null },
    { date: '2018-01-13', count: 10, denom: 40, attribute: attributeA },
    { date: '2018-01-14', count: 10, denom: 40, attribute: null },
    { date: '2018-01-15', count: 10, denom: 40, attribute: null },
    { date: '2018-01-16', count: 10, denom: 60, attribute: null },
    { date: '2018-01-17', count: 10, denom: 60, attribute: null },
    { date: '2018-01-18', count: 10, denom: 60, attribute: null },
    { date: '2018-01-19', count: 10, denom: 60, attribute: null },
    { date: '2018-01-20', count: 10, denom: 60, attribute: null },
    { date: '2018-01-21', count: 10, denom: 60, attribute: null },
    { date: '2018-01-22', count: 10, denom: 60, attribute: null }
  ];
});

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
    expect(output[2][0]).toEqual('2018-01-22');
    expect(output[1][0]).toEqual('2018-01-15');
    expect(output[0][0]).toEqual('2018-01-08');
  });

  it('should return a percentage if a third param is true', () => {
    const output = cohortConversion(data, 7, true);

    expect(output[0][1]).toEqual(0.5);
    expect(output[1][1]).toEqual(0.25);
  });

  it('should return a goal if one is set', () => {
    const output = cohortConversion(data, 7, false, 30);

    expect(output[1][2]).toEqual(30);
  });

  it('should return a percentage goal if one is set', () => {
    const output = cohortConversion(data, 7, true, 30);

    expect(output[1][2]).toEqual(0.3);
  });

  it('should return a attribute if set', () => {
    const output = cohortConversion(data, 7);

    expect(output[1][2]).toEqual('1');
    expect(output[1][3]).toEqual(attributeA);
  });

  it('should should increment the attribute number', () => {
    const output = cohortConversion(data, 7);

    expect(output[0][3]).toEqual(attributeB);
    expect(output[0][2]).toEqual('2');
    expect(output[1][3]).toEqual(attributeA);
    expect(output[1][2]).toEqual('1');
  });

  it('should return null for attribute if there is not one present', () => {
    const output = cohortConversion(data, 7);
    expect(output[2][3]).toEqual(null);
    expect(output[2][2]).toEqual(null);
  });
});
