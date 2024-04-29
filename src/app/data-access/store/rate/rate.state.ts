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
import { MidMarketRatesService } from '../../generated/services';
import { Rate } from '../../generated/models';
import { CoreState, CoreStateModel } from '../core.state';
import { subDays } from 'date-fns/subDays';
import { startOfDay } from 'date-fns/startOfDay';
import { nonNullable } from 'src/app/util/helpers/non-nullable';
import { ExchangeRateApiService } from '../../services/exrate-api.service';

export interface RateStateModel {
  rates: Rate[] | null;
  lastUpdateAt: number | null;
  historical: {
    yesterday?: Rate[];
    lastWeek?: Rate[];
    lastMonth?: Rate[];
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
  private xeMidMarketRateApi = inject(MidMarketRatesService);

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
          code: rate.quotecurrency,
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
  @Selector([CoreState]) static codesWithRate(
    { rates }: RateStateModel,
    { codes }: CoreStateModel
  ) {
    return codes?.map((code) => {
      const rate = rates?.find((r) => r.quotecurrency === code.iso)?.mid;
      return {
        code: code.iso,
        name: code.currency_name,
        rate: rate ? Math.round((1 / rate) * 1000000) / 1000000 : 0,
      };
    });
  }
  @Selector([RateState.codesWithRate, CoreState.favorites])
  static favoritesWithRate(
    _: RateStateModel,
    codesWithRate: ReturnType<typeof RateState.codesWithRate>,
    favorites: CoreStateModel['favorites']
  ) {
    const map = codesWithRate?.reduce(
      (pre, cur) => ({ ...pre, [cur.code]: cur }),
      {} as Record<string, { code: string; name: string; rate: number }>
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
    const { base } = this.store.selectSnapshot(CoreState) as CoreStateModel;

    return this.exchangeApi.getRates(base).pipe(
      tap((response) => {
        const rates = Object.entries(response.conversion_rates).map(
          ([code, value]) => ({ mid: value, quotecurrency: code })
        );
        patchState({ rates, lastUpdateAt: Date.now() });
      })
    );
  }

  @Action(FetchYesterdayRates) fetchYesterdayRates({
    patchState,
    getState,
  }: StateContext<RateStateModel>) {
    const { codes, base } = this.store.selectSnapshot(
      CoreState
    ) as CoreStateModel;
    const yesterday = startOfDay(subDays(new Date(), 1)).toISOString();
    const { historical } = getState();
    return this.exchangeApi.getRatesYesterday(base).pipe(
      tap((response) => {
        const rates = Object.entries(response.conversion_rates).map(
          ([code, value]) => ({ mid: value, quotecurrency: code })
        );
        patchState({ historical: { ...historical, yesterday: rates } });
      })
    );
  }
}
