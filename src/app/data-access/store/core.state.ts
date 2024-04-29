import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddFavorite,
  RemoveFavorite,
  ReorderFavorites,
  ResetState,
  SetBaseCurrency,
} from './core.actions';

export interface CoreStateModel {
  base: string;
  favorites: string[];
}

const initState: CoreStateModel = {
  base: 'USD',
  favorites: [],
};

@State<CoreStateModel>({
  name: 'core',
  defaults: initState,
})
@Injectable()
export class CoreState {
  @Selector() static base(state: CoreStateModel) {
    return state.base;
  }
  @Selector() static favorites(state: CoreStateModel) {
    return state.favorites;
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
