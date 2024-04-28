/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CentralBankExchangeRateResponse } from '../../models/central-bank-exchange-rate-response';

export interface V1CentralBankRateGet$Params {

/**
 * REQUIRED – Three letter codes representing the specific central bank you are querying for. The time(s) specified below highlights the time rates published by each respective central bank updates within the API service.</br>
 * |  | Code | Name | Available at (UTC) |
 * |:--- |:--- |:--- |:--- |
 * | 1 | AFG | The Afghanistan Bank | 06:00-11:00 |
 * | 2 | AGO | National Bank of Angola | 11:00-17:00 |
 * | 3 | ALB | Bank of Albania | 12:00 |
 * | 4 | AUS | Reserve Bank of Australia | 08:00 |
 * | 5 | AZE | The Central Bank of the Republic of Azerbaijan | 06:00 |
 * | 6 | BEAC | The Bank Of Central African States (Banque des États de l'Afrique Centrale) | 10:00 |
 * | 7 | BRA | Central Bank of Brazil | 17:00 |
 * | 8 | CAN | Bank of Canada | 23:00 |
 * | 9 | CAR | Eastern Caribbean Central Bank | 14:00 |
 * | 10 | CHE | Swiss National Bank | 11:00 |
 * | 11 | CHL | Central Bank of Chile | 03:00 |
 * | 12 | CHN | China Foreign Exchange Trade System | hourly |
 * | 13 | COL | Financial Superintendence of Colombia | 22:00 |
 * | 14 | CRI | Central Bank of Costa Rica (Banco Central de Costa Rica) | 15:00 |
 * | 15 | CZE | Czech National Bank | 13:00 |
 * | 16 | DNK | National Bank of Denmark (Danmarks Nationalbank) | 17:00 |
 * | 17 | DOM | Central Bank of the Dominican Republic (Banco Central de la República Dominicana) | 22:00 |
 * | 18 | ECB | European Central Bank | 17:00 |
 * | 19 | EGY | Central Bank of Egypt | 12:00 |
 * | 20 | GBR | Bank of England | 10:00 |
 * | 21 | GTM | Bank of Guatemala | 14:00 |
 * | 22 | HUN | Hungarian National Bank (Magyar Nemzeti Bank) | 12:00 |
 * | 23 | IDN | Bank Indonesia | 12:00 |
 * | 24 | IND | Reserve Bank of India | 07:30 |
 * | 25 | ISR | Bank of Israel | 05:00 |
 * | 26 | JPN | Bank of Japan | 08:00 |
 * | 27 | KOR | Seoul Money Brokerage Services | 00:00 |
 * | 28 | LAO | Bank of the Lao P.D.R | 03:00 |
 * | 29 | LBN | Bank of Lebanon (Banque du Liban) | middle of each month |
 * | 30 | MEX | Bank of Mexico | 19:00 |
 * | 31 | MNG | Central Bank of Mongolia | 11:00 |
 * | 32 | MOZ | Bank of Mozambique (Banco de Moçambique) | 09:00-15:00 |
 * | 33 | NOR | Central Bank of Norway (Norges Bank) | 16:00 |
 * | 34 | PHL | Central Bank of the Philippines (Bangko Sentral ng Pilipinas) | 10:00 |
 * | 35 | PNG | Bank of Papua New Guinea | 02:00-10:00 |
 * | 36 | POL | National Bank of Poland | 15:00 |
 * | 37 | ROU | National Bank of Romania | 11:00 |
 * | 38 | RUS | Central Bank of the Russian Federation | 16:00 |
 * | 39 | SRB | National Bank of Serbia | 07:00 |
 * | 40 | SVN | Bank of Slovenia | 15:00 |
 * | 41 | SYC | Central Bank of Seychelles | 15:00 |
 * | 42 | THA | Bank of Thailand | 12:00 |
 * | 43 | TJK | National Bank of Tajikistan | 16:00 |
 * | 44 | TKM | Central Bank of Turkmenistan | 14:00 |
 * | 45 | TUR | Central Bank of the Republic of Turkey | 12:00 |
 * | 46 | UAE | Central Bank of the UAE | 15:00 |
 * | 47 | UKR | National Bank of Ukraine | 23:00 |
 * | 48 | URY | Central Bank of Uruguay | 21:00 |
 * | 49 | UZB | National Bank for Foreign Economic Activity of Uzbekistan | 21:00 |
 * | 50 | VEN | Central Bank of Venezuela (Banco Central de Venezuela) | 15:00 |
 * | 51 | YEM | Central Bank of Yemen | 08:00 |
 * | 52 | ZAF | South African Reserve Bank | 15:00 |
 * | 53 | ZWE | Reserve Bank of Zimbabwe | 05:00 |
 */
  central_bank: string;

/**
 * Comma separated list of to currencies ISO 4217 codes.  This will limit the data returned to only those currencies you are interested in. Use an asterisk * to convert all currencies.
 */
  to: string;

/**
 * OPTIONAL – This parameter can be used to specify the amount you want to convert, if an amount is not specified then 1 is assumed.</br>
 */
  amount?: number;

/**
 * OPTIONAL – YYYY-MM-DD format - request rates for a particular past date.  Rates are often not posted on weekends.
 */
  date?: string;

/**
 * OPTIONAL – If ‘true’, the endpoint will include inverse rates. An inverse rate is a quote for which the base currency and counter currency are switched. An inverse is calculated by dividing one by the exchange rate. Example: If the exchange rate for 1 USD to EUR = 0.874852, then the inverse rate would be 1/0.874852 = 1.14305, meaning that US$1.14305 would buy 1 euro.
 */
  inverse?: boolean;

/**
 * OPTIONAL – This parameter can be used to specify the number of decimal places included in the output. Example: if 1 USD to EUR = 0.874852, adding decimal_places=3 to the query will result in the endpoint returning EUR = 0.875
 */
  decimal_places?: number;

/**
 * OPTIONAL – This parameter can be used to add a margin (+/-) to the exchange rate. Example: adding margin=2.05 to the query will result in the endpoint returning the current exchange rates with a +2.05% margin
 */
  margin?: number;
}

export function v1CentralBankRateGet(http: HttpClient, rootUrl: string, params: V1CentralBankRateGet$Params, context?: HttpContext): Observable<StrictHttpResponse<CentralBankExchangeRateResponse>> {
  const rb = new RequestBuilder(rootUrl, v1CentralBankRateGet.PATH, 'get');
  if (params) {
    rb.query('central_bank', params.central_bank, {});
    rb.query('to', params.to, {});
    rb.query('amount', params.amount, {});
    rb.query('date', params.date, {});
    rb.query('inverse', params.inverse, {});
    rb.query('decimal_places', params.decimal_places, {});
    rb.query('margin', params.margin, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CentralBankExchangeRateResponse>;
    })
  );
}

v1CentralBankRateGet.PATH = '/v1/central_bank_rate';
