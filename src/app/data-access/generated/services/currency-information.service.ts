/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CurrencyInfoResponse } from '../models/currency-info-response';
import { v1CurrenciesGet } from '../fn/currency-information/v-1-currencies-get';
import { V1CurrenciesGet$Params } from '../fn/currency-information/v-1-currencies-get';

@Injectable({ providedIn: 'root' })
export class CurrencyInformationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `v1CurrenciesGet()` */
  static readonly V1CurrenciesGetPath = '/v1/currencies';

  /**
   * Access a list of all available currencies.
   *
   * This endpoint will return a list of all currencies, active and obsolete, available via the XE Currency Data Feed API.</br></br>If the obsolete optional parameter is included, then the list will contain both active and obsolete currencies.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1CurrenciesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1CurrenciesGet$Response(params?: V1CurrenciesGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CurrencyInfoResponse>> {
    return v1CurrenciesGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Access a list of all available currencies.
   *
   * This endpoint will return a list of all currencies, active and obsolete, available via the XE Currency Data Feed API.</br></br>If the obsolete optional parameter is included, then the list will contain both active and obsolete currencies.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1CurrenciesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1CurrenciesGet(params?: V1CurrenciesGet$Params, context?: HttpContext): Observable<CurrencyInfoResponse> {
    return this.v1CurrenciesGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<CurrencyInfoResponse>): CurrencyInfoResponse => r.body)
    );
  }

}
