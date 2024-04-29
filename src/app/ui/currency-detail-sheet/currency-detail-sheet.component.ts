import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  IonTitle,
  IonToolbar,
  IonHeader,
  IonIcon,
  IonButton,
  IonButtons,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import { expandOutline, star, starOutline } from 'ionicons/icons';
import { filter, switchMap } from 'rxjs';
import {
  AddFavorite,
  CoreState,
  RemoveFavorite,
} from 'src/app/data-access/store';
import { RateState } from 'src/app/data-access/store/rate/rate.state';
import { nonNullable } from 'src/app/util/helpers/non-nullable';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { DecimalPipe } from '@angular/common';
import { GetChartOptionsParams } from 'src/app/util/helpers/highchart-options-builder';
import { subDays } from 'date-fns/subDays';
import { globalFormatDate } from 'src/app/util/helpers/global-format-date';
import { historicalApiCaller } from 'src/app/util/helpers/historical-api-caller';
import { RouterLink } from '@angular/router';
import { CurrencyAdditionalInfoComponent } from '../currency-additional-info/currency-additional-info.component';

@Component({
  selector: 'app-currency-detail-sheet',
  templateUrl: './currency-detail-sheet.component.html',
  styleUrls: ['./currency-detail-sheet.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    LineChartComponent,
    DecimalPipe,
    RouterLink,
    CurrencyAdditionalInfoComponent,
  ],
})
export class CurrencyDetailSheetComponent {
  private store = inject(Store);
  private codes = toSignal(this.store.select(RateState.rates));
  private favorites = toSignal(this.store.select(RateState.favoritesWithRate));
  private historicalApi = historicalApiCaller();

  counter = input<string>('USD');
  expand = output();

  base = toSignal(this.store.select(CoreState.base));

  counterRate = toSignal(
    toObservable(this.counter).pipe(
      filter(nonNullable),
      switchMap((c) => this.store.select(RateState.ystRateOf(c)))
    )
  );

  isInFavorite = computed(() =>
    this.favorites()?.some((f) => f.code === this.counter())
  );
  code = computed(() => this.codes()?.find((c) => c.code === this.counter()));
  chartParams = signal<GetChartOptionsParams | undefined>(undefined);
  chartLoading = signal(true);

  constructor() {
    addIcons({ star, starOutline, expandOutline });
    effect(
      () => {
        const today = new Date();
        this.chartLoading.set(true);
        this.historicalApi(
          this.counter(),
          globalFormatDate(subDays(today, 7)),
          globalFormatDate(today)
        ).subscribe((params) => {
          this.chartParams.set(params);
          this.chartLoading.set(false);
        });
      },
      { allowSignalWrites: true }
    );
  }

  toggleFavorite() {
    if (this.isInFavorite()) {
      this.store.dispatch(new RemoveFavorite(this.counter()));
    } else {
      this.store.dispatch(new AddFavorite(this.counter()));
    }
  }
}
