import { Injectable, inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import {
  AddFavorite,
  FetchCodes,
  FetchRates,
  RemoveFavorite,
  ReorderFavorites,
  ResetState,
  SetBaseCurrency,
} from './core.actions';
import { ExchangeRateApiService } from '../services/exrate-api.service';
import { tap } from 'rxjs';
import { ConversionRates } from '../models/conversion-rates.model';
import {
  CurrencyInformationService,
  MidMarketRatesService,
} from '../generated/services';
import { CurrencyInfoResponse, Rate } from '../generated/models';

export interface CoreStateModel {
  base: string;
  codes: CurrencyInfoResponse['currencies'] | null;
  rates: Rate[] | null;
  favorites: string[];
}

const initState: CoreStateModel = {
  base: 'USD',
  codes: null,
  rates: null,
  favorites: [],
};

@State<CoreStateModel>({
  name: 'core',
  defaults: initState,
})
@Injectable()
export class CoreState implements NgxsOnInit {
  private apiService = inject(ExchangeRateApiService);
  private xeCurrencyApi = inject(CurrencyInformationService);
  private xeMideMarketRateApi = inject(MidMarketRatesService);

  ngxsOnInit(ctx: StateContext<CoreStateModel>): void {
    if (ctx.getState().codes === null) ctx.dispatch(new FetchCodes());
  }

  @Selector() static codes(state: CoreStateModel) {
    return state.codes;
  }
  @Selector() static codesWithRate(state: CoreStateModel) {
    return state.codes?.map((code) => {
      const rate = state.rates?.find((r) => r.quotecurrency === code.iso)?.mid;
      return {
        code: code.iso,
        name: code.currency_name,
        rate: rate ? Math.round((1 / rate) * 1000000) / 1000000 : 0,
      };
    });
  }
  @Selector() static favorites(state: CoreStateModel) {
    return this.codesWithRate(state)?.filter((code) =>
      state.favorites.includes(code?.code ?? '')
    );
  }
  @Selector() static base(state: CoreStateModel) {
    return state.base;
  }

  @Action(FetchCodes) fetchCodes({ patchState }: StateContext<CoreStateModel>) {
    return this.xeCurrencyApi
      .v1CurrenciesGet()
      .pipe(tap((response) => patchState({ codes: response.currencies })));
  }

  @Action(FetchRates) fetchRates({
    getState,
    patchState,
  }: StateContext<CoreStateModel>) {
    const state = getState();
    return this.xeMideMarketRateApi
      .v1ConvertFromGet({
        from: state.base,
        to: state.codes?.map((code) => code.iso).join(',') ?? '',
      })
      .pipe(tap((response) => patchState({ rates: response.to })));
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

  @Action(ResetState) resetState({ setState }: StateContext<CoreStateModel>) {
    setState(initState);
  }
}
