import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SupportedCodesResponse } from '../models/supported-codes.model';
import { ConversionRates } from '../models/conversion-rates.model';

export const EXCHANGE_API_KEY = '28b27efc0fd3e7aeeafd31c1';
export const EXCHANGE_API_URL = 'https://v6.exchangerate-api.com/v6';

@Injectable({ providedIn: 'root' })
export class ExchangeRateApiService {
  private http = inject(HttpClient);

  getAllSupportedCodes() {
    return this.http.get<SupportedCodesResponse>(
      `${EXCHANGE_API_URL}/${EXCHANGE_API_KEY}/codes`
    );
  }

  getRates(base: string) {
    return this.http.get<ConversionRates>(
      `${EXCHANGE_API_URL}/${EXCHANGE_API_KEY}/latest/${base}`
    );
  }
}
