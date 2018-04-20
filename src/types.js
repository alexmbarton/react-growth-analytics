// @flow

export type DayData = {
  date: string,
  count: number,
  denom: number,
  attribute: string
};

export type data = DayData[];

export type options = {
  percentage?: boolean,
  goal?: number,
  attribute?: boolean
};
