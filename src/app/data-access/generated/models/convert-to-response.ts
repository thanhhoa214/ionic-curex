/* tslint:disable */
/* eslint-disable */
import { Rate } from '../models/rate';
export interface ConvertToResponse {
  amount?: number;
  from?: Array<Rate>;
  privacy?: string;
  terms?: string;
  timestamp?: string;
  to?: string;
}
