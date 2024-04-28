/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { HistoricRatePeriodResponse } from '../../models/historic-rate-period-response';

export interface V1HistoricRatePeriodGet$Params {

/**
 * OPTIONAL – Currency you want to convert from ISO code.  Note if this parameter is omitted, default is USD.</br>
 */
  from?: string;

/**
 * Comma separated list of to currencies based on ISO 4217 codes.</br>This will limit the data returned to only those currencies you are interested in.</br> Note: Obsolete currencies are replaced by their precursor or successor currency.</br>
 */
  to: string;

/**
 * OPTIONAL – This parameter can be used to specify the amount you want to convert, if an amount is not specified then 1.00 is assumed.</br>
 */
  amount?: number;

/**
 * OPTIONAL - ISO 8601 timestamp in the format yyyy-mm-ddThh:mm giving the UTC date and time of the start of the period for which you would like rates returned.</br></br>If your account is registered for a Daily package your endpoint will return rates at your preferred daily lock-in time starting on the date specified in your request.  If your account does not have a preferred daily lock-in time then rates will return as of 00:00 UTC</br>If your account is registered for a Live package your endpoint will return rates starting at 00:00 UTC if no time portion is specified.</br>
 */
  start_timestamp?: string;

/**
 * OPTIONAL – ISO 8601 timestamp in the format yyyy-mm-ddThh:mm giving the UTC date and time of the end of the period for which you would like rates returned. If a time in the future is specified, the current time will be used. If no end_time is specified, the time specified in the  “start_timestamp” paramenter will also be used for the end_timestamp.”</br>If your account is registered for a Daily package your endpoint will return rates at your preferred daily lock-in time ending on the date specified in your request.  If your account does not have a preferred daily lock-in time then rates will return as of 00:00 UTC.</br>If your account is registered for a Live package your endpoint will return rates at 00:00 UTC unless you specify a time parameter in your rate request.</br>
 */
  end_timestamp?: string;

/**
 * OPTIONAL – Interval is applicable to Live packages only.  Using one of the interval values below in your call request will return rates for that specific interval within the time period specified.</br></br>Example: adding the interval of "hourly" will return rates for every hour in the time period you specified.</br></br>  "daily" - Returns one rate for the days specified in your time period,</br>"hourly" - Returns rates for every hour in the time period you specify</br></br>If omitted, "daily" is used.  This parameter is only used if both the "start_timestamp" and "end_timestamp" parameters have been specified
 */
  interval?: string;

/**
 * OPTIONAL – You can specify the page number you want to request.</br>Note: that page numbering is 1-based (the first page being page 1).</br>Omitting this parameter will return the first page.</br>
 */
  page?: number;

/**
 * OPTIONAL – You can specify the number of results per page. The default is 30 results per page with a maximum of 500 results per page.</br>
 */
  per_page?: number;

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

export function v1HistoricRatePeriodGet(http: HttpClient, rootUrl: string, params: V1HistoricRatePeriodGet$Params, context?: HttpContext): Observable<StrictHttpResponse<HistoricRatePeriodResponse>> {
  const rb = new RequestBuilder(rootUrl, v1HistoricRatePeriodGet.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {});
    rb.query('to', params.to, {});
    rb.query('amount', params.amount, {});
    rb.query('start_timestamp', params.start_timestamp, {});
    rb.query('end_timestamp', params.end_timestamp, {});
    rb.query('interval', params.interval, {});
    rb.query('page', params.page, {});
    rb.query('per_page', params.per_page, {});
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
      return r as StrictHttpResponse<HistoricRatePeriodResponse>;
    })
  );
}

v1HistoricRatePeriodGet.PATH = '/v1/historic_rate/period';
