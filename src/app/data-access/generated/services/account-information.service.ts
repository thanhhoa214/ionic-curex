/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AccountInfoResponse } from '../models/account-info-response';
import { v1AccountInfoGet } from '../fn/account-information/v-1-account-info-get';
import { V1AccountInfoGet$Params } from '../fn/account-information/v-1-account-info-get';

@Injectable({ providedIn: 'root' })
export class AccountInformationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `v1AccountInfoGet()` */
  static readonly V1AccountInfoGetPath = '/v1/account_info';

  /**
   * This endpoint will return basic information for a specific account.
   *
   * Requires Headers "username" and "password"</br>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1AccountInfoGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1AccountInfoGet$Response(params?: V1AccountInfoGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AccountInfoResponse>> {
    return v1AccountInfoGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This endpoint will return basic information for a specific account.
   *
   * Requires Headers "username" and "password"</br>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1AccountInfoGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1AccountInfoGet(params?: V1AccountInfoGet$Params, context?: HttpContext): Observable<AccountInfoResponse> {
    return this.v1AccountInfoGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<AccountInfoResponse>): AccountInfoResponse => r.body)
    );
  }

}
