import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  DatetimeChangeEventDetail,
  IonFooter,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { filter, switchMap } from 'rxjs';
import { GetChartOptionsParams } from 'src/app/util/helpers/highchart-options-builder';
import { Store } from '@ngxs/store';
import {
  AddFavorite,
  CoreState,
  RemoveFavorite,
} from 'src/app/data-access/store';
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from '../../ui/line-chart/line-chart.component';
import { addDays } from 'date-fns/addDays';
import { subDays } from 'date-fns/subDays';
import { globalFormatDate } from 'src/app/util/helpers/global-format-date';
import { historicalApiCaller } from 'src/app/util/helpers/historical-api-caller';
import { nonNullable } from 'src/app/util/helpers/non-nullable';
import { RateState } from 'src/app/data-access/store/rate/rate.state';
import { DecimalPipe } from '@angular/common';
import { CurrencyAdditionalInfoComponent } from '../../ui/currency-additional-info/currency-additional-info.component';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

const today = new Date();
@Component({
  selector: 'app-chart',
  templateUrl: 'chart.page.html',
  styleUrls: ['chart.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonIcon,
    IonFooter,
    IonButton,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    LineChartComponent,
    DecimalPipe,
    CurrencyAdditionalInfoComponent,
  ],
})
export class ChartPage {
  private store = inject(Store);
  private codes = toSignal(this.store.select(CoreState.codes));
  private favorites = toSignal(this.store.select(RateState.favoritesWithRate));
  base = toSignal(this.store.select(CoreState.base), { initialValue: 'USD' });
  // withComponentInputBinding binds router param to input property directly
  counter = input('counter');

  code = computed(() => this.codes()?.find((c) => c.iso === this.counter()));
  counterRate = toSignal(
    toObservable(this.counter).pipe(
      filter(nonNullable),
      switchMap((c) => this.store.select(RateState.ystRateOf(c)))
    )
  );
  isInFavorite = computed(() =>
    this.favorites()?.some((f) => f.code === this.counter())
  );

  tomorrow = addDays(today, 1);
  startEndDates = signal([
    globalFormatDate(subDays(today, 7)),
    globalFormatDate(today),
  ] as const);

  // API only supports rates with base PLN, so need calling 2 apis for base/counter then merging
  chartParams = signal<GetChartOptionsParams | undefined>(undefined);
  chartLoading = signal(true);

  historicalApi = historicalApiCaller();

  constructor() {
    addIcons({ star, starOutline });
    effect(
      () => {
        const [start, end] = this.startEndDates();
        this.chartLoading.set(true);
        // forkJoin waits for completion of all observables so no need unsubscribe
        this.historicalApi(this.counter(), start, end).subscribe((params) => {
          this.chartParams.set(params);
          this.chartLoading.set(false);
        });
      },
      { allowSignalWrites: true }
    );
  }

  dayFilterChanged(event: CustomEvent) {
    if (event.detail.value === 'custom') return;

    const days = parseInt(event.detail.value);
    this.startEndDates.set([
      globalFormatDate(subDays(today, days)),
      globalFormatDate(today),
    ]);
  }

  setCustomDate(
    type: 'start' | 'end',
    date: DatetimeChangeEventDetail['value']
  ) {
    if (typeof date === 'string') {
      date = date.split('T')[0];
      this.startEndDates.set([
        type === 'start' ? date : this.startEndDates()[0],
        type === 'end' ? date : this.startEndDates()[1],
      ]);
    }
  }
  toggleFavorite() {
    if (this.isInFavorite()) {
      this.store.dispatch(new RemoveFavorite(this.counter()));
    } else {
      this.store.dispatch(new AddFavorite(this.counter()));
    }
  }
}
