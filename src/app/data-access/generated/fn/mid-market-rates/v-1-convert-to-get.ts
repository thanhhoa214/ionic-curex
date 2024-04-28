/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConvertToResponse } from '../../models/convert-to-response';

export interface V1ConvertToGet$Params {

/**
 * Comma separated list of to currencies ISO codes.  This will limit the data returned to only those currencies you are interested in. Use an asterisk * to convert all currencies.</br> Note: Obsolete currencies are replaced by their successor currency.</br>
 */
  from: string;

/**
 * OPTIONAL - Currency you want to convert to ISO code.  Note if this parameter is omitted, default is USD.</br>
 */
  to?: string;

/**
 * OPTIONAL – This parameter can be used to specify the amount you want to convert, if an amount is not specified then 1 is assumed.</br>
 */
  amount?: number;

/**
 * OPTIONAL – If ‘true’ then endpoint will display rates for currencies that are obsolete. If ‘false’ then obsolete currencies are replaced by their successor currency.
 */
  obsolete?: boolean;

/**
 * OPTIONAL – If ‘true’ then endpoint will display the inverse of the converted value. If ‘false‘ then it will not be displayed.
 */
  inverse?: boolean;

/**
 * OPTIONAL – This parameter can be used to specify the number of decimal places included in the output. Example 1 USD to EUR = 0.874852 with decimal_places=3, the output returned will be EUR = 0.875
 */
  decimal_places?: number;

/**
 * OPTIONAL – This parameter can be used to add a margin (-/+)  to XE's mid-market rate. Example: add margin=2.05 parameter to the endpoint and the API will return our mid-market rates plus the margin of 2.05 percent
 */
  margin?: number;

/**
 * OPTIONAL – If 'true' then this endpoint will return data for the following crypto currencies: ADA, BCH, DOGE, DOT, ETH, LINK, LTC, LUNA, UNI, XLM and XRP
 */
  crypto?: boolean;

/**
 * OPTIONAL – LIVE accounts only – If 'true' then requests during the weekend will respond with the rate as of market close (Friday, 5pm America/New_York)
 */
  skip_weekends?: boolean;
}

export function v1ConvertToGet(http: HttpClient, rootUrl: string, params: V1ConvertToGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ConvertToResponse>> {
  const rb = new RequestBuilder(rootUrl, v1ConvertToGet.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {});
    rb.query('to', params.to, {});
    rb.query('amount', params.amount, {});
    rb.query('obsolete', params.obsolete, {});
    rb.query('inverse', params.inverse, {});
    rb.query('decimal_places', params.decimal_places, {});
    rb.query('margin', params.margin, {});
    rb.query('crypto', params.crypto, {});
    rb.query('skip_weekends', params.skip_weekends, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ConvertToResponse>;
    })
  );
}

v1ConvertToGet.PATH = '/v1/convert_to';
