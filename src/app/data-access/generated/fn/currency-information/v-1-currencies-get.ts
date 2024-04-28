/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CurrencyInfoResponse } from '../../models/currency-info-response';

export interface V1CurrenciesGet$Params {

/**
 * OPTIONAL – Comma separated list of ISO 4217 codes. This will limit the data returned to only those currencies that are specified. If this parameter is omitted, this endpoint will return results for all currencies.</br></br> It is a prefix match; you can provide it with one, two, or three characters and it will return a list of all the currencies with ISO 4217 codes that match.</br></br> A list of acceptable ISO 4217 currency codes can be found here: http://www.xe.com/iso4217.php
 */
  iso?: string;

/**
 * OPTIONAL – If 'true' then endpoint will display currencies that are obsolete but for which historical data is available
 */
  obsolete?: boolean;

/**
 * OPTIONAL – Default is en. Specified as an RFC-1766-compliant language tag.</br></br>Languages available: ar, de, en, es, fr, it, ja, pt, sv, zh-CN, zh-HK.
 */
  language?: string;

/**
 * OPTIONAL - If 'symbol' then returns 'currency_symbol' and 'currency_symbol_on_right' in response
 */
  additionalInfo?: string;

/**
 * OPTIONAL – If 'true' then this endpoint will return data for the following crypto currencies: ADA, BCH, DOGE, DOT, ETH, LINK, LTC, LUNA, UNI, XLM and XRP
 */
  crypto?: boolean;
}

export function v1CurrenciesGet(http: HttpClient, rootUrl: string, params?: V1CurrenciesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CurrencyInfoResponse>> {
  const rb = new RequestBuilder(rootUrl, v1CurrenciesGet.PATH, 'get');
  if (params) {
    rb.query('iso', params.iso, {});
    rb.query('obsolete', params.obsolete, {});
    rb.query('language', params.language, {});
    rb.query('additionalInfo', params.additionalInfo, {});
    rb.query('crypto', params.crypto, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CurrencyInfoResponse>;
    })
  );
}

v1CurrenciesGet.PATH = '/v1/currencies';
