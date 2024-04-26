import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { SupportedCodesResponse } from '../models/supported-codes.model';
import { Storage } from '@ionic/storage-angular';

export const EXCHANGE_API_KEY = '28b27efc0fd3e7aeeafd31c1';
export const EXCHANGE_API_URL = 'https://v6.exchangerate-api.com/v6';
const cacheKey = 'api/codes';

@Injectable({ providedIn: 'root' })
export class ExchangeRateApiService {
  private http = inject(HttpClient);
  private storage = inject(Storage);

  codes = signal<SupportedCodesResponse | undefined>(undefined);

  constructor() {
    this.fetchCodesFromStorage();
    effect(async () => {
      const codes = this.codes();
      if (codes) this.storage.set(cacheKey, JSON.stringify(codes));
    });
  }

  private getAllSupportedCodes() {
    return this.http.get<SupportedCodesResponse>(
      `${EXCHANGE_API_URL}/${EXCHANGE_API_KEY}/codes`
    );
  }

  private async fetchCodesFromStorage() {
    this.storage = await this.storage.create();
    const cachedCodes = await this.storage.get(cacheKey);

    if (cachedCodes)
      this.codes.set(JSON.parse(cachedCodes) as SupportedCodesResponse);
    else this.getAllSupportedCodes().subscribe(this.codes.set);
  }
}
