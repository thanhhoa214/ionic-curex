import { Injectable, inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { SupportedCodesResponse } from '../models/supported-codes.model';
import {
  AddFavorite,
  FetchCodes,
  FetchRates,
  RemoveFavorite,
  ReorderFavorites,
  SetBaseCurrency,
} from './core.actions';
import { ExchangeRateApiService } from '../services/exrate-api.service';
import { tap } from 'rxjs';
import { ConversionRates } from '../models/conversion-rates.model';

export interface CoreStateModel {
  base: string;
  codes: SupportedCodesResponse['supported_codes'] | null;
  rates: ConversionRates | null;
  favorites: string[];
}

@State<CoreStateModel>({
  name: 'core',
  defaults: { base: 'USD', codes: null, rates: null, favorites: [] },
})
@Injectable()
export class CoreState implements NgxsOnInit {
  private apiService = inject(ExchangeRateApiService);

  ngxsOnInit(ctx: StateContext<CoreStateModel>): void {
    if (ctx.getState().codes === null) ctx.dispatch(new FetchCodes());
  }

  @Selector() static codes(state: CoreStateModel) {
    return state.codes;
  }
  @Selector() static codesWithRate(state: CoreStateModel) {
    return state.codes?.map((code) => {
      const rate = state.rates?.conversion_rates[code[0]];
      return {
        code: code[0],
        name: code[1],
        rate: rate ? Math.round((1 / rate) * 1000000) / 1000000 : 0,
      };
    });
  }
  @Selector() static favorites(state: CoreStateModel) {
    return this.codesWithRate(state)?.filter((code) =>
      state.favorites.includes(code.code)
    );
  }
  @Selector() static base(state: CoreStateModel) {
    return state.base;
  }

  @Action(FetchCodes) fetchCodes({ patchState }: StateContext<CoreStateModel>) {
    return this.apiService
      .getAllSupportedCodes()
      .pipe(tap((response) => patchState({ codes: response.supported_codes })));
  }

  @Action(FetchRates) fetchRates({
    getState,
    patchState,
  }: StateContext<CoreStateModel>) {
    const state = getState();
    return this.apiService
      .getRates(state.base)
      .pipe(tap((response) => patchState({ rates: response })));
  }

  @Action(AddFavorite) addFavorite(
    { getState, patchState }: StateContext<CoreStateModel>,
    { code }: AddFavorite
  ) {
    const state = getState();
    patchState({ favorites: [...state.favorites, code] });
  }

  @Action(RemoveFavorite) removeFavorite(
    { getState, patchState }: StateContext<CoreStateModel>,
    { code }: RemoveFavorite
  ) {
    const state = getState();
    patchState({ favorites: state.favorites.filter((fav) => fav !== code) });
  }

  @Action(ReorderFavorites) reorderFavorites(
    { patchState }: StateContext<CoreStateModel>,
    { favorites }: ReorderFavorites
  ) {
    patchState({ favorites });
  }

  @Action(SetBaseCurrency) setBaseCurrency(
    { patchState }: StateContext<CoreStateModel>,
    { base }: SetBaseCurrency
  ) {
    patchState({ base });
  }
}
