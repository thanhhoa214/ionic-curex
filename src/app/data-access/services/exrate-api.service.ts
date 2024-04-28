import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SupportedCodesResponse } from '../models/supported-codes.model';
import { ConversionRates } from '../models/conversion-rates.model';
import { NbpHistoricalRates } from '../models/nbp-historical-rates.model';

const EXCHANGE_API_KEY = '28b27efc0fd3e7aeeafd31c1';
const EXCHANGE_API_URL = 'https://v6.exchangerate-api.com/v6';
const NBP_API_URL = 'http://api.nbp.pl/api/exchangerates/rates';

@Injectable({ providedIn: 'root' })
export class ExchangeRateApiService {
  private http = inject(HttpClient);

  getAllSupportedCodes() {
    return this.http.get<SupportedCodesResponse>(
      `${EXCHANGE_API_URL}/${EXCHANGE_API_KEY}/codes`
    );
  }

  getRates(counter: string) {
    return this.http.get<ConversionRates>(
      `${EXCHANGE_API_URL}/${EXCHANGE_API_KEY}/latest/${counter}`
    );
  }

  /**
   * ref: https://api.nbp.pl/en.html
   */
  getHistoricalRates(base: string, from: string, to: string) {
    return this.http.get<NbpHistoricalRates>(
      `${NBP_API_URL}/A/${base}/${from}/${to}?format=json`
    );
  }
}
