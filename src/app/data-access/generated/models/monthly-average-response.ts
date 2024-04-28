/* tslint:disable */
/* eslint-disable */
import { ToCurrencyIso } from '../models/to-currency-iso';
export interface MonthlyAverageResponse {
  amount?: number;
  from?: string;
  privacy?: string;
  terms?: string;
  to?: {
[key: string]: Array<ToCurrencyIso>;
};
  year?: number;
}
