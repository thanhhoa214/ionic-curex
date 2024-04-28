/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatsResponse } from '../../models/stats-response';

export interface V1StatsGet$Params {

/**
 * OPTIONAL – Currency you want to convert from ISO code.  Note if this parameter is omitted, default is USD.</br>
 */
  from?: string;

/**
 * Comma separated list of to currencies based on ISO 4217 codes. This will limit the data returned to only those currencies that are specified.</br>
 */
  to: string;

/**
 * OPTIONAL – ISO 8601 timestamp in the format yyyy-mm-dd giving the UTC date of the start of the period for which you would like to compute the volatility from. Note if this parameter is omitted, the start date will default to today.</br>
 */
  start_date?: string;

/**
 * OPTIONAL – ISO 8601 timestamp in the format yyyy-mm-dd giving the UTC date of the end of the period for which you would like to compute the volatility to. Note if this parameter is omitted, the end date will default to today.</br>
 */
  end_date?: string;

/**
 * OPTIONAL – If ‘true’ then endpoint will display rates for currencies that are obsolete. If ‘false’ then obsolete currencies are replaced by their successor currency.
 */
  obsolete?: boolean;

/**
 * OPTIONAL – This parameter can be used to specify the number of decimal places included in the output. Example 1 USD to EUR = 0.874852 with decimal_places=3, the output returned will be EUR = 0.875
 */
  decimal_places?: number;

/**
 * OPTIONAL – This parameter can be used to specify the number of days in the period that we are considering.
 */
  daysInPeriod?: number;

/**
 * OPTIONAL – If 'true' then this endpoint will return data for the following crypto currencies: ADA, BCH, DOGE, DOT, ETH, LINK, LTC, LUNA, UNI, XLM and XRP
 */
  crypto?: boolean;
}

export function v1StatsGet(http: HttpClient, rootUrl: string, params: V1StatsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<StatsResponse>> {
  const rb = new RequestBuilder(rootUrl, v1StatsGet.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {});
    rb.query('to', params.to, {});
    rb.query('start_date', params.start_date, {});
    rb.query('end_date', params.end_date, {});
    rb.query('obsolete', params.obsolete, {});
    rb.query('decimal_places', params.decimal_places, {});
    rb.query('daysInPeriod', params.daysInPeriod, {});
    rb.query('crypto', params.crypto, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StatsResponse>;
    })
  );
}

v1StatsGet.PATH = '/v1/stats';
