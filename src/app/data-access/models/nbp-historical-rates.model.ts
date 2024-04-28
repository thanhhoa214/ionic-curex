export interface NbpHistoricalRates {
  table: string;
  currency: string;
  code: string;
  rates: Rate[];
}

export interface Rate {
  no: string;
  // Format: YYYY-MM-dd. e.g. "2012-01-03"
  effectiveDate: string;
  mid: number;
}
