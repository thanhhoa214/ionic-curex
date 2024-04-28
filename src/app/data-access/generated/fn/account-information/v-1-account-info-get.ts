/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AccountInfoResponse } from '../../models/account-info-response';

export interface V1AccountInfoGet$Params {
}

export function v1AccountInfoGet(http: HttpClient, rootUrl: string, params?: V1AccountInfoGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AccountInfoResponse>> {
  const rb = new RequestBuilder(rootUrl, v1AccountInfoGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AccountInfoResponse>;
    })
  );
}

v1AccountInfoGet.PATH = '/v1/account_info';
