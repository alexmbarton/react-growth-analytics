// @flow

import SevenDays from '../SevenDays';

describe('SevenDays', () => {
  it('should return false if no data is passed', () => {
    const test = SevenDays();

    expect(test).toEqual(false);
  });

  it('should return false if less than 7 days of data is passed', () => {
    const data = [
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 }
    ];

    const test = SevenDays(data);

    expect(test).toBe(false);
  });

  it('should return the correct total of 7 days data', () => {
    const data = [
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 },
      { date: '2018-01-02', count: 10 }
    ];

    const test = SevenDays(data);
    expect(test[0][1]).toEqual(70);
    expect(test[0][0]).toEqual('2018-01-02');
  });
});
