import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, forkJoin, map, switchMap } from 'rxjs';
import { NbpHistoricalRates } from 'src/app/data-access/models/nbp-historical-rates.model';
import { ExchangeRateApiService } from 'src/app/data-access/services/exrate-api.service';
import { CoreState } from 'src/app/data-access/store';
import { GetChartOptionsParams } from './highchart-options-builder';
import { roundNumber } from './format-number';

export function historicalApiCaller() {
  const apiService = inject(ExchangeRateApiService);
  const base$ = inject(Store).select(CoreState.base);
  return (counter: string, start: string, end: string) =>
    base$.pipe(
      switchMap((base) =>
        forkJoin(
          [base, counter].map((code) =>
            apiService
              .getHistoricalRates(code, start, end)
              .pipe(
                catchError(() =>
                  apiService.getHistoricalRates(code, start, end, 'B')
                )
              )
          )
        )
      ),
      map(mergeRateResponse)
    );
}

function mergeRateResponse([
  baseRes,
  counterRes,
]: NbpHistoricalRates[]): GetChartOptionsParams {
  const counterRateFallback = counterRes.rates[0];
  return {
    counter: counterRes.code,
    rates: baseRes.rates.map((r, index) => [
      new Date(r.effectiveDate).getTime(),
      roundNumber(r.mid / (counterRes.rates[index] || counterRateFallback).mid),
    ]),
  };
}
