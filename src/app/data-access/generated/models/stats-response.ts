/* tslint:disable */
/* eslint-disable */
import { Stats } from '../models/stats';
export interface StatsResponse {
  from?: string;
  privacy?: string;
  stats?: Array<Stats>;
  terms?: string;
}
