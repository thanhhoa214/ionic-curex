import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NbpHistoricalRates } from '../models/nbp-historical-rates.model';

const NBP_API_URL = 'http://api.nbp.pl/api/exchangerates/rates';

@Injectable({ providedIn: 'root' })
export class ExchangeRateApiService {
  private http = inject(HttpClient);
  /**
   * ref: https://api.nbp.pl/en.html
   */
  getHistoricalRates(base: string, from: string, to: string, table = 'A') {
    return this.http.get<NbpHistoricalRates>(
      `${NBP_API_URL}/${table}/${base}/${from}/${to}?format=json`
    );
  }
}
