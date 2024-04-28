/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ConvertFromResponse } from '../models/convert-from-response';
import { ConvertToResponse } from '../models/convert-to-response';
import { HistoricRatePeriodResponse } from '../models/historic-rate-period-response';
import { HistoricRateResponse } from '../models/historic-rate-response';
import { MonthlyAverageResponse } from '../models/monthly-average-response';
import { StatsResponse } from '../models/stats-response';
import { v1ConvertFromGet } from '../fn/mid-market-rates/v-1-convert-from-get';
import { V1ConvertFromGet$Params } from '../fn/mid-market-rates/v-1-convert-from-get';
import { v1ConvertToGet } from '../fn/mid-market-rates/v-1-convert-to-get';
import { V1ConvertToGet$Params } from '../fn/mid-market-rates/v-1-convert-to-get';
import { v1HistoricRateGet } from '../fn/mid-market-rates/v-1-historic-rate-get';
import { V1HistoricRateGet$Params } from '../fn/mid-market-rates/v-1-historic-rate-get';
import { v1HistoricRatePeriodGet } from '../fn/mid-market-rates/v-1-historic-rate-period-get';
import { V1HistoricRatePeriodGet$Params } from '../fn/mid-market-rates/v-1-historic-rate-period-get';
import { v1MonthlyAverageGet } from '../fn/mid-market-rates/v-1-monthly-average-get';
import { V1MonthlyAverageGet$Params } from '../fn/mid-market-rates/v-1-monthly-average-get';
import { v1StatsGet } from '../fn/mid-market-rates/v-1-stats-get';
import { V1StatsGet$Params } from '../fn/mid-market-rates/v-1-stats-get';

@Injectable({ providedIn: 'root' })
export class MidMarketRatesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `v1ConvertFromGet()` */
  static readonly V1ConvertFromGetPath = '/v1/convert_from';

  /**
   * Convert from one base currency to one or multiple counter currencies.
   *
   * In the example below, the Convert FROM API query endpoint is to convert from GBP to all available currencies (the asterisk * represents ALL currencies).</br><a href="https://xecdapi.xe.com/v1/convert_from.csv/?from=GBP&to=*&amount=1">https://xecdapi.xe.com/v1/convert_from.csv/?from=GBP&to=*&amount=1</a>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ConvertFromGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ConvertFromGet$Response(params: V1ConvertFromGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ConvertFromResponse>> {
    return v1ConvertFromGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Convert from one base currency to one or multiple counter currencies.
   *
   * In the example below, the Convert FROM API query endpoint is to convert from GBP to all available currencies (the asterisk * represents ALL currencies).</br><a href="https://xecdapi.xe.com/v1/convert_from.csv/?from=GBP&to=*&amount=1">https://xecdapi.xe.com/v1/convert_from.csv/?from=GBP&to=*&amount=1</a>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1ConvertFromGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ConvertFromGet(params: V1ConvertFromGet$Params, context?: HttpContext): Observable<ConvertFromResponse> {
    return this.v1ConvertFromGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConvertFromResponse>): ConvertFromResponse => r.body)
    );
  }

  /** Path part for operation `v1ConvertToGet()` */
  static readonly V1ConvertToGetPath = '/v1/convert_to';

  /**
   * Convert to a currency amount from one or multiple other currencies.
   *
   * In the example below, the Convert TO API query endpoint is to convert to GBP from all available currencies (the asterisk * represents ALL currencies).</br><a href="https://xecdapi.xe.com/v1/convert_to.csv/?to=GBP&from=*&amount=1">https://xecdapi.xe.com/v1/convert_to.csv/?to=GBP&from=*&amount=1</a>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1ConvertToGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ConvertToGet$Response(params: V1ConvertToGet$Params, context?: HttpContext): Observable<StrictHttpResponse<ConvertToResponse>> {
    return v1ConvertToGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Convert to a currency amount from one or multiple other currencies.
   *
   * In the example below, the Convert TO API query endpoint is to convert to GBP from all available currencies (the asterisk * represents ALL currencies).</br><a href="https://xecdapi.xe.com/v1/convert_to.csv/?to=GBP&from=*&amount=1">https://xecdapi.xe.com/v1/convert_to.csv/?to=GBP&from=*&amount=1</a>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1ConvertToGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1ConvertToGet(params: V1ConvertToGet$Params, context?: HttpContext): Observable<ConvertToResponse> {
    return this.v1ConvertToGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConvertToResponse>): ConvertToResponse => r.body)
    );
  }

  /** Path part for operation `v1HistoricRateGet()` */
  static readonly V1HistoricRateGetPath = '/v1/historic_rate';

  /**
   * Get historic rates for one base currency against one or more counter currencies.
   *
   * The Currency Data API provides you with access to daily historical rates back to 1998. When retrieving historical rates through our Currency Data API, you would specify your requested currencies along with the date and/or date range and time (hh:mm). If your account is registered for a Live package then you have access to minutely rates for the past 7 days and outside of 7 days you have access to rates on the hour. Historical rates are available with all API packages. The time parameter (hh:mm) only applies to Live packages.</br> The endpoint returns the historic rate for a single base currency and one or more counter currencies.</br></br><a href="https://xecdapi.xe.com/v1/historic_rate.csv/?from=USD&date=2011-03-05&to=CAD,EUR">https://xecdapi.xe.com/v1/historic_rate.csv/?from=USD&date=2011-03-05&to=CAD,EUR</a></br>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1HistoricRateGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1HistoricRateGet$Response(params: V1HistoricRateGet$Params, context?: HttpContext): Observable<StrictHttpResponse<HistoricRateResponse>> {
    return v1HistoricRateGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get historic rates for one base currency against one or more counter currencies.
   *
   * The Currency Data API provides you with access to daily historical rates back to 1998. When retrieving historical rates through our Currency Data API, you would specify your requested currencies along with the date and/or date range and time (hh:mm). If your account is registered for a Live package then you have access to minutely rates for the past 7 days and outside of 7 days you have access to rates on the hour. Historical rates are available with all API packages. The time parameter (hh:mm) only applies to Live packages.</br> The endpoint returns the historic rate for a single base currency and one or more counter currencies.</br></br><a href="https://xecdapi.xe.com/v1/historic_rate.csv/?from=USD&date=2011-03-05&to=CAD,EUR">https://xecdapi.xe.com/v1/historic_rate.csv/?from=USD&date=2011-03-05&to=CAD,EUR</a></br>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1HistoricRateGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1HistoricRateGet(params: V1HistoricRateGet$Params, context?: HttpContext): Observable<HistoricRateResponse> {
    return this.v1HistoricRateGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<HistoricRateResponse>): HistoricRateResponse => r.body)
    );
  }

  /** Path part for operation `v1HistoricRatePeriodGet()` */
  static readonly V1HistoricRatePeriodGetPath = '/v1/historic_rate/period';

  /**
   * Get historic rates for one base currency against one or more counter currencies over a period of time.
   *
   * This endpoint returns a daily historic rate for a single base currency and one or more counter currencies over a period of time.</br></br><a href="https://xecdapi.xe.com/v1/historic_rate/period.csv/?from=USD&to=CAD&start_timestamp=2017-09-01&end_timestamp=2017-11-30&per_page=500">https://xecdapi.xe.com/v1/historic_rate/period.csv/?from=USD&to=CAD&start_timestamp=2017-09-01&end_timestamp=2017-11-30&per_page=500</a></br></br>Optional parameters available with Live accounts:</br></br>&interval=minutely</br>&interval=hourly</br>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1HistoricRatePeriodGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1HistoricRatePeriodGet$Response(params: V1HistoricRatePeriodGet$Params, context?: HttpContext): Observable<StrictHttpResponse<HistoricRatePeriodResponse>> {
    return v1HistoricRatePeriodGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get historic rates for one base currency against one or more counter currencies over a period of time.
   *
   * This endpoint returns a daily historic rate for a single base currency and one or more counter currencies over a period of time.</br></br><a href="https://xecdapi.xe.com/v1/historic_rate/period.csv/?from=USD&to=CAD&start_timestamp=2017-09-01&end_timestamp=2017-11-30&per_page=500">https://xecdapi.xe.com/v1/historic_rate/period.csv/?from=USD&to=CAD&start_timestamp=2017-09-01&end_timestamp=2017-11-30&per_page=500</a></br></br>Optional parameters available with Live accounts:</br></br>&interval=minutely</br>&interval=hourly</br>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1HistoricRatePeriodGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1HistoricRatePeriodGet(params: V1HistoricRatePeriodGet$Params, context?: HttpContext): Observable<HistoricRatePeriodResponse> {
    return this.v1HistoricRatePeriodGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<HistoricRatePeriodResponse>): HistoricRatePeriodResponse => r.body)
    );
  }

  /** Path part for operation `v1MonthlyAverageGet()` */
  static readonly V1MonthlyAverageGetPath = '/v1/monthly_average';

  /**
   * Get monthly average rates for a single base currency and one or more counter currency for the month/year you specify in your API query. .
   *
   * The monthly average endpoint returns monthly average rates for a single base currency and one or more counter currency for the year you specify in your API query. The monthly average rate is calculated by taking the 00:00 UTC Daily rate for each day in the month/year you specify in your query. Months are returned as a numeric value from 1 to 12 where 1 is for January and 12 is for December. If no month is provided, then all months for the given year are returned.</br>
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1MonthlyAverageGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1MonthlyAverageGet$Response(params: V1MonthlyAverageGet$Params, context?: HttpContext): Observable<StrictHttpResponse<MonthlyAverageResponse>> {
    return v1MonthlyAverageGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get monthly average rates for a single base currency and one or more counter currency for the month/year you specify in your API query. .
   *
   * The monthly average endpoint returns monthly average rates for a single base currency and one or more counter currency for the year you specify in your API query. The monthly average rate is calculated by taking the 00:00 UTC Daily rate for each day in the month/year you specify in your query. Months are returned as a numeric value from 1 to 12 where 1 is for January and 12 is for December. If no month is provided, then all months for the given year are returned.</br>
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1MonthlyAverageGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1MonthlyAverageGet(params: V1MonthlyAverageGet$Params, context?: HttpContext): Observable<MonthlyAverageResponse> {
    return this.v1MonthlyAverageGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<MonthlyAverageResponse>): MonthlyAverageResponse => r.body)
    );
  }

  /** Path part for operation `v1StatsGet()` */
  static readonly V1StatsGetPath = '/v1/stats';

  /**
   * Gets an average rate over the specified time period, as well various additional statistics such as the standard deviation and volatility.
   *
   * The stats endpoint returns average rates for a single base currency and one or more counter currencies over the time period you specify in your API query. Note that, unlike the monthly_average endpoint, you specify exact start and end dates, which provides a heightened level of control. This can be quite useful if you want statistics for bi-monthly averages or any other intervals of time. </br></br> This endpoint also provides several other statistics: the highest and lowest rate over the period (and their respective timestamps), the average rate, the standard deviation, volatility, and the number of data points over this period. </br></br> To provide some background to how we obtain our statistics, volatility is measured by applying the standard deviation of the logarithmic daily returns, expressed in a percentage score. We calculate daily returns using the values of two consecutive days and measure the gain or loss of a currency pair (<b>for live rate frequency packages this comparison is done at 00:00 UTC; daily rate frequency packages will compute stats based on the rate lock-in time specified on the account</b>). Then, we apply a logarithm to the ratio between those two values (Ex: ln (valueDay2 / valueDay1) is the logarithmic return between day2 and day1). As for the standard deviation, we apply it to the daily logarithmic returns we calculated during the given time period. When applicable, values are expressed as a percentage so they are already multiplied by 100.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1StatsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1StatsGet$Response(params: V1StatsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<StatsResponse>> {
    return v1StatsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Gets an average rate over the specified time period, as well various additional statistics such as the standard deviation and volatility.
   *
   * The stats endpoint returns average rates for a single base currency and one or more counter currencies over the time period you specify in your API query. Note that, unlike the monthly_average endpoint, you specify exact start and end dates, which provides a heightened level of control. This can be quite useful if you want statistics for bi-monthly averages or any other intervals of time. </br></br> This endpoint also provides several other statistics: the highest and lowest rate over the period (and their respective timestamps), the average rate, the standard deviation, volatility, and the number of data points over this period. </br></br> To provide some background to how we obtain our statistics, volatility is measured by applying the standard deviation of the logarithmic daily returns, expressed in a percentage score. We calculate daily returns using the values of two consecutive days and measure the gain or loss of a currency pair (<b>for live rate frequency packages this comparison is done at 00:00 UTC; daily rate frequency packages will compute stats based on the rate lock-in time specified on the account</b>). Then, we apply a logarithm to the ratio between those two values (Ex: ln (valueDay2 / valueDay1) is the logarithmic return between day2 and day1). As for the standard deviation, we apply it to the daily logarithmic returns we calculated during the given time period. When applicable, values are expressed as a percentage so they are already multiplied by 100.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `v1StatsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v1StatsGet(params: V1StatsGet$Params, context?: HttpContext): Observable<StatsResponse> {
    return this.v1StatsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<StatsResponse>): StatsResponse => r.body)
    );
  }

}
