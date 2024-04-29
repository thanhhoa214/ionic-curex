import { Injectable, inject } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import {
  AddFavorite,
  FetchCodes,
  RemoveFavorite,
  ReorderFavorites,
  ResetState,
  SetBaseCurrency,
} from './core.actions';
import { tap } from 'rxjs';
import { CurrencyInformationService } from '../generated/services';
import { CurrencyInfoResponse } from '../generated/models';

export interface CoreStateModel {
  base: string;
  codes: CurrencyInfoResponse['currencies'] | null;
  favorites: string[];
}

const initState: CoreStateModel = {
  base: 'USD',
  codes: null,
  favorites: [],
};

@State<CoreStateModel>({
  name: 'core',
  defaults: initState,
})
@Injectable()
export class CoreState implements NgxsOnInit {
  private xeCurrencyApi = inject(CurrencyInformationService);

  ngxsOnInit(ctx: StateContext<CoreStateModel>): void {
    if (ctx.getState().codes === null) ctx.dispatch(new FetchCodes());
  }

  @Selector() static codes(state: CoreStateModel) {
    return state.codes;
  }
  @Selector() static base(state: CoreStateModel) {
    return state.base;
  }
  @Selector() static favorites(state: CoreStateModel) {
    return state.favorites;
  }

  @Action(FetchCodes) fetchCodes({ patchState }: StateContext<CoreStateModel>) {
    return this.xeCurrencyApi
      .v1CurrenciesGet()
      .pipe(tap((response) => patchState({ codes: response.currencies })));
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
