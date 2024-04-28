/* tslint:disable */
/* eslint-disable */
import { Rate } from '../models/rate';
export interface HistoricRateResponse {
  amount?: number;
  from?: string;
  privacy?: string;
  terms?: string;
  timestamp?: string;
  to?: Array<Rate>;
}
