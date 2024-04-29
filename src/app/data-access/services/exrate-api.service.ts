import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  NbpHistoricalRates,
  NbpTableRates,
} from '../models/nbp-historical-rates.model';
import { map } from 'rxjs';

const NBP_API_URL = 'http://api.nbp.pl/api/exchangerates';

@Injectable({ providedIn: 'root' })
export class ExchangeRateApiService {
  private http = inject(HttpClient);
  /**
   * ref: https://api.nbp.pl/en.html
   */
  getHistoricalRates(base: string, from: string, to: string, table = 'A') {
    return this.http.get<NbpHistoricalRates>(
      `${NBP_API_URL}/rates/${table}/${base}/${from}/${to}?format=json`
    );
  }

  getRates(base: string, at = 'today', table = 'A') {
    return this.http
      .get<NbpTableRates[]>(`${NBP_API_URL}/tables/${table}/${at}?format=json`)
      .pipe(
        map(([response]) => {
          // As default, response is PLN rates
          const baseRate = response.rates.find((r) => r.code === base);
          if (!baseRate) return response;
          return {
            ...response,
            rates: response.rates.map((r) => ({
              ...r,
              mid: baseRate.mid / r.mid,
            })),
          };
        })
      );
  }
}
