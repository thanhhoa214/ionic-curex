/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MonthlyAverageResponse } from '../../models/monthly-average-response';

export interface V1MonthlyAverageGet$Params {

/**
 * OPTIONAL – Currency you want to convert from ISO code.  Note if this parameter is omitted, default is USD.</br>
 */
  from?: string;

/**
 * Comma separated list of to currencies based on ISO 4217 codes. This will limit the data returned to only those currencies that are specified.</br>
 */
  to: string;

/**
 * OPTIONAL – This parameter can be used to specify the amount you want to convert, if an amount is not specified then 1 is assumed.</br>
 */
  amount?: number;

/**
 * OPTIONAL – This parameter specifies the year to calculate average monthly rates.</br>
 */
  year?: number;

/**
 * OPTIONAL – This parameter specifies the month in the given year to return average monthly rates. This is a numeric value from 1 to 12 where 1 is for January and 12 is for December. If no month is provided, then all months for the given year are returned.</br>
 */
  month?: number;

/**
 * OPTIONAL – If ‘true’ then endpoint will display rates for currencies that are obsolete. If ‘false’ then obsolete currencies are replaced by their successor currency.
 */
  obsolete?: boolean;

/**
 * OPTIONAL – If ‘true’ then endpoint will include inverse rates.
 */
  inverse?: boolean;

/**
 * OPTIONAL – This parameter can be used to specify the number of decimal places included in the output. Example 1 USD to EUR = 0.874852 with decimal_places=3, the output returned will be EUR = 0.875
 */
  decimal_places?: number;

/**
 * OPTIONAL – If 'true' then this endpoint will return data for the following crypto currencies: ADA, BCH, DOGE, DOT, ETH, LINK, LTC, LUNA, UNI, XLM and XRP
 */
  crypto?: boolean;
}

export function v1MonthlyAverageGet(http: HttpClient, rootUrl: string, params: V1MonthlyAverageGet$Params, context?: HttpContext): Observable<StrictHttpResponse<MonthlyAverageResponse>> {
  const rb = new RequestBuilder(rootUrl, v1MonthlyAverageGet.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {});
    rb.query('to', params.to, {});
    rb.query('amount', params.amount, {});
    rb.query('year', params.year, {});
    rb.query('month', params.month, {});
    rb.query('obsolete', params.obsolete, {});
    rb.query('inverse', params.inverse, {});
    rb.query('decimal_places', params.decimal_places, {});
    rb.query('crypto', params.crypto, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MonthlyAverageResponse>;
    })
  );
}

v1MonthlyAverageGet.PATH = '/v1/monthly_average';
