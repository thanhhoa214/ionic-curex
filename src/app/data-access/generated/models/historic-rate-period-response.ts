/* tslint:disable */
/* eslint-disable */
import { RatePeriod } from '../models/rate-period';
export interface HistoricRatePeriodResponse {
  amount?: number;
  from?: string;
  privacy?: string;
  terms?: string;
  to?: {
[key: string]: Array<RatePeriod>;
};
}
