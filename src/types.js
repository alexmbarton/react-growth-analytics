// @flow

export type DayData = {
  date: string,
  count: number,
  denom: number,
  annotation: string
};

export type data = DayData[];

export type options = {
  percentage?: boolean,
  goal?: number,
  annotate?: boolean
};

export type Dau = {
  date: string,
  count: number
};

export type DauData = Dau[];
