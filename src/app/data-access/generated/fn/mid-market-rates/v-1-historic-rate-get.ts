/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { HistoricRateResponse } from '../../models/historic-rate-response';

export interface V1HistoricRateGet$Params {

/**
 * OPTIONAL – Currency you want to convert from ISO code.</br>Note if this parameter is omitted, default is USD.</br>
 */
  from?: string;

/**
 * Comma separated list of to currencies ISO 4217 codes.</br>This will limit the data returned to only those currencies you are interested in. Use an asterisk * to specify all currencies.</br> Note: Obsolete currencies are replaced by their precursor or successor currency.</br>
 */
  to: string;

/**
 * OPTIONAL – This parameter can be used to specify the amount you want to convert, if an amount is not specified then 1.00 is assumed.</br>
 */
  amount?: number;

/**
 * UTC date should be in the form of YYYY-MM-DD, up to 1995-11-16.</br>If your account is registered for a Daily package your endpoint will return rates at your preferred daily lock-in time.</br>If your account is registered for a Live package your endpoint will return XE mid-day rate unless you specify a time parameter in your call request.</br>
 */
  date: string;

/**
 * OPTIONAL – *Time parameter is applicable to Live package only*.</br>UTC time is in format of HH:MM Time option is only available for the last 24 hours, if time is not specified, only one table is returned using the XE mid-day rates (As returned in http://www.xe.com/currencytables/)</br>
 */
  time?: string;

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
}

export function v1HistoricRateGet(http: HttpClient, rootUrl: string, params: V1HistoricRateGet$Params, context?: HttpContext): Observable<StrictHttpResponse<HistoricRateResponse>> {
  const rb = new RequestBuilder(rootUrl, v1HistoricRateGet.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {});
    rb.query('to', params.to, {});
    rb.query('amount', params.amount, {});
    rb.query('date', params.date, {});
    rb.query('time', params.time, {});
    rb.query('obsolete', params.obsolete, {});
    rb.query('inverse', params.inverse, {});
    rb.query('decimal_places', params.decimal_places, {});
    rb.query('margin', params.margin, {});
    rb.query('crypto', params.crypto, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<HistoricRateResponse>;
    })
  );
}

v1HistoricRateGet.PATH = '/v1/historic_rate';
