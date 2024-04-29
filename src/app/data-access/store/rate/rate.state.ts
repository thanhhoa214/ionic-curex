import { Injectable, inject } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  Store,
  createSelector,
} from '@ngxs/store';
import { FetchRates, FetchYesterdayRates } from './rate.actions';
import { tap } from 'rxjs';
import { CoreState, CoreStateModel } from '../core.state';
import { subDays } from 'date-fns/subDays';
import { startOfDay } from 'date-fns/startOfDay';
import { nonNullable } from 'src/app/util/helpers/non-nullable';
import { ExchangeRateApiService } from '../../services/exrate-api.service';
import { NbpTableRate } from '../../models/nbp-historical-rates.model';
import { globalFormatDate } from 'src/app/util/helpers/global-format-date';

export interface RateStateModel {
  rates: NbpTableRate[] | null;
  lastUpdateAt: number | null;
  historical: {
    yesterday?: NbpTableRate[];
    lastWeek?: NbpTableRate[];
    lastMonth?: NbpTableRate[];
  };
}

const initState: RateStateModel = {
  lastUpdateAt: null,
  rates: null,
  historical: {},
};

@State<RateStateModel>({
  name: 'rate',
  defaults: initState,
})
@Injectable()
export class RateState {
  private store = inject(Store);
  private exchangeApi = inject(ExchangeRateApiService);

  @Selector() static codes(state: RateStateModel) {
    return state.rates?.map((r) => r.code);
  }
  @Selector() static rates(state: RateStateModel) {
    return state.rates;
  }
  @Selector() static lastUpdateAt(state: RateStateModel) {
    return state.lastUpdateAt;
  }
  @Selector() static ystChangeRate({ rates, historical }: RateStateModel) {
    return rates
      ?.map((rate, index) => {
        const ystRate = historical.yesterday?.[index];
        if (ystRate === undefined) return undefined;
        return {
          code: rate.code,
          rate: rate.mid,
          ystRateMid: ystRate.mid,
          changePercentage: (rate.mid - ystRate.mid) / ystRate.mid,
        };
      })
      .filter(nonNullable)
      .reduce(
        (pre, cur) => ({ ...pre, [cur.code]: cur }),
        {} as Record<
          string,
          {
            code: string;
            rate: number;
            ystRateMid: number;
            changePercentage: number;
          }
        >
      );
  }
  @Selector([CoreState.favorites])
  static favoritesWithRate(
    { rates }: RateStateModel,
    favorites: CoreStateModel['favorites']
  ) {
    const map = rates?.reduce(
      (pre, cur) => ({ ...pre, [cur.code]: cur }),
      {} as Record<string, NbpTableRate>
    );
    return favorites.map((f) => map?.[f]).filter(nonNullable);
  }
  static ystRateOf(code: string) {
    return createSelector(
      [RateState],
      (state: RateStateModel) => this.ystChangeRate(state)?.[code]
    );
  }

  @Action(FetchRates) fetchRates({ patchState }: StateContext<RateStateModel>) {
    const base = this.store.selectSnapshot(CoreState.base);

    return this.exchangeApi
      .getRates(base)
      .pipe(
        tap(({ rates }) => patchState({ rates, lastUpdateAt: Date.now() }))
      );
  }

  @Action(FetchYesterdayRates) fetchYesterdayRates({
    patchState,
    getState,
  }: StateContext<RateStateModel>) {
    const base = this.store.selectSnapshot(CoreState.base);
    const today = new Date();

    let minus = 1;
    // If Monday, get Friday's rate
    if (today.getUTCDay() === 1) minus = 3;
    const dayBefore = globalFormatDate(startOfDay(subDays(today, minus)));

    const { historical } = getState();
    return this.exchangeApi
      .getRates(base, dayBefore)
      .pipe(
        tap(({ rates }) =>
          patchState({ historical: { ...historical, yesterday: rates } })
        )
      );
  }
}
