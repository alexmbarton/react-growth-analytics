// @flow

import stickiness from '../stickiness';

let data = [];

beforeEach(() => {
  data = [
    { date: '2018-01-01', count: 30 },
    { date: '2018-01-02', count: 20 },
    { date: '2018-01-03', count: 10 },
    { date: '2018-01-04', count: 10 },
    { date: '2018-01-05', count: 10 },
    { date: '2018-01-06', count: 10 },
    { date: '2018-01-07', count: 10 },
    { date: '2018-01-08', count: 10 },
    { date: '2018-01-09', count: 10 },
    { date: '2018-01-10', count: 10 },
    { date: '2018-01-11', count: 10 },
    { date: '2018-01-12', count: 10 },
    { date: '2018-01-13', count: 10 },
    { date: '2018-01-15', count: 10 },
    { date: '2018-01-16', count: 10 },
    { date: '2018-01-17', count: 10 },
    { date: '2018-01-18', count: 10 },
    { date: '2018-01-19', count: 10 },
    { date: '2018-01-20', count: 10 },
    { date: '2018-01-21', count: 10 },
    { date: '2018-01-22', count: 10 },
    { date: '2018-01-23', count: 10 },
    { date: '2018-01-24', count: 10 },
    { date: '2018-01-25', count: 10 },
    { date: '2018-01-26', count: 10 },
    { date: '2018-01-27', count: 10 },
    { date: '2018-01-28', count: 10 },
    { date: '2018-01-29', count: 10 },
    { date: '2018-01-30', count: 10 },
    { date: '2018-01-31', count: 10 }
  ];
});

describe('stickiness fails', () => {
  it('should return false if no data is passed', () => {
    expect(stickiness()).toEqual(false);
  });

  it('should return false if < 28 items', () => {
    const segment = Object.assign([], data).splice(0, 7);
    expect(stickiness(segment)).toEqual(false);
  });
});

describe('stickiness passes', () => {
  it('should return correct stickiness value', () => {
    expect(stickiness(data)).toEqual([
      {
        date: '2018-01-29',
        count: 10,
        stickiness: '0.0323'
      },
      {
        date: '2018-01-30',
        count: 10,
        stickiness: '0.0345'
      },
      {
        date: '2018-01-31',
        count: 10,
        stickiness: '0.0357'
      }
    ]);
  });
});
