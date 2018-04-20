// @flow

import cohortConversion from '../cohortConverter';

const annotationA = 'Can you believe it?';
const annotationB = 'No I Cannot';

let data = [];

beforeEach(() => {
  data = [
    { date: '2018-01-01', count: 10, denom: 20, annotation: null },
    { date: '2018-01-02', count: 10, denom: 20, annotation: null },
    { date: '2018-01-03', count: 10, denom: 20, annotation: annotationB },
    { date: '2018-01-04', count: 10, denom: 20, annotation: null },
    { date: '2018-01-05', count: 10, denom: 20, annotation: null },
    { date: '2018-01-06', count: 10, denom: 20, annotation: null },
    { date: '2018-01-08', count: 10, denom: 20, annotation: null },
    { date: '2018-01-09', count: 10, denom: 40, annotation: null },
    { date: '2018-01-10', count: 10, denom: 40, annotation: null },
    { date: '2018-01-11', count: 10, denom: 40, annotation: null },
    { date: '2018-01-12', count: 10, denom: 40, annotation: null },
    { date: '2018-01-13', count: 10, denom: 40, annotation: annotationA },
    { date: '2018-01-14', count: 10, denom: 40, annotation: null },
    { date: '2018-01-15', count: 10, denom: 40, annotation: null },
    { date: '2018-01-16', count: 10, denom: 60, annotation: null },
    { date: '2018-01-17', count: 10, denom: 60, annotation: null },
    { date: '2018-01-18', count: 10, denom: 60, annotation: null },
    { date: '2018-01-19', count: 10, denom: 60, annotation: null },
    { date: '2018-01-20', count: 10, denom: 60, annotation: null },
    { date: '2018-01-21', count: 10, denom: 60, annotation: null },
    { date: '2018-01-22', count: 10, denom: 60, annotation: null }
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
    const options = {
      percentage: true
    };
    const output = cohortConversion(data, 7, options);

    expect(output[0][1]).toEqual(0.5);
    expect(output[1][1]).toEqual(0.25);
  });

  it('should return a goal if one is set', () => {
    const options = {
      goal: 30
    };
    const output = cohortConversion(data, 7, options);

    expect(output[1][4]).toEqual(30);
  });

  it('should return a percentage goal if one is set', () => {
    const options = {
      percentage: true,
      goal: 30
    };
    const output = cohortConversion(data, 7, options);

    expect(output[1][4]).toEqual(0.3);
  });

  it('should return a annotation if set', () => {
    const output = cohortConversion(data, 7);

    expect(output[1][2]).toEqual('1');
    expect(output[1][3]).toEqual(annotationA);
  });

  it('should should increment the annotation number', () => {
    const output = cohortConversion(data, 7);

    expect(output[0][3]).toEqual(annotationB);
    expect(output[0][2]).toEqual('2');
    expect(output[1][3]).toEqual(annotationA);
    expect(output[1][2]).toEqual('1');
  });

  it('should return null for annotation if there is not one present', () => {
    const output = cohortConversion(data, 7);
    expect(output[2][3]).toEqual(null);
    expect(output[2][2]).toEqual(null);
  });

  it('should not show annotations if annontate: false', () => {
    const options = {
      annotate: false
    };
    const output = cohortConversion(data, 7, options);
    expect(output[0][3]).toEqual(null);
    expect(output[0][2]).toEqual(null);
    expect(output[1][3]).toEqual(null);
    expect(output[1][2]).toEqual(null);
  });
});
