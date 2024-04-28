/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CentralBankExchangeRateResponse } from '../models/central-bank-exchange-rate-response';
import { v1CentralBankRateGet } from '../fn/central-bank-exchange-rates/v-1-central-bank-rate-get';
import { V1CentralBankRateGet$Params } from '../fn/central-bank-exchange-rates/v-1-central-bank-rate-get';

@Injectable({ providedIn: 'root' })
export class CentralBankExchangeRatesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `v1CentralBankRateGet()` */
  static readonly V1CentralBankRateGetPath = '/v1/central_bank_rate';

  /**
   * Central bank exchange rates from currency of central bank to one or multiple counter currencies, provided by specified central bank.
   *
   * In the example below, the endpoint converts from CAD to all available currencies for the Bank of Canada (the asterisk * represents ALL currencies).</br><a href="https://xecdapi.xe.com/v1/central_bank_rate.csv/?central_bank=CAN&to=*&amount=1">https://xecdapi.xe.com/v1/central_bank_rate.csv/?central_bank=CAN&to=*&amount=1</a>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1CentralBankRateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1CentralBankRateGet$Response(params: V1CentralBankRateGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CentralBankExchangeRateResponse>> {
    return v1CentralBankRateGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Central bank exchange rates from currency of central bank to one or multiple counter currencies, provided by specified central bank.
   *
   * In the example below, the endpoint converts from CAD to all available currencies for the Bank of Canada (the asterisk * represents ALL currencies).</br><a href="https://xecdapi.xe.com/v1/central_bank_rate.csv/?central_bank=CAN&to=*&amount=1">https://xecdapi.xe.com/v1/central_bank_rate.csv/?central_bank=CAN&to=*&amount=1</a>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1CentralBankRateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1CentralBankRateGet(params: V1CentralBankRateGet$Params, context?: HttpContext): Observable<CentralBankExchangeRateResponse> {
    return this.v1CentralBankRateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<CentralBankExchangeRateResponse>): CentralBankExchangeRateResponse => r.body)
    );
  }

}
