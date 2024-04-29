import {
  Component,
  OnInit,
  Signal,
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
} from '@ionic/angular/standalone';
import {
  catchError,
  combineLatest,
  filter,
  forkJoin,
  map,
  switchMap,
} from 'rxjs';
import { ExchangeRateApiService } from 'src/app/data-access/services/exrate-api.service';
import { GetChartOptionsParams } from 'src/app/util/helpers/highchart-options-builder';
import { Store } from '@ngxs/store';
import { CoreState } from 'src/app/data-access/store';
import { NbpHistoricalRates } from 'src/app/data-access/models/nbp-historical-rates.model';
import { roundNumber } from 'src/app/util/helpers/format-number';
import { FormsModule } from '@angular/forms';
import { LineChartComponent } from '../../ui/line-chart/line-chart.component';
import { addDays } from 'date-fns/addDays';
import { subDays } from 'date-fns/subDays';
import { globalFormatDate } from 'src/app/util/helpers/global-format-date';
import { historicalApiCaller } from 'src/app/util/helpers/historical-api-caller';

const today = new Date();
@Component({
  selector: 'app-chart',
  templateUrl: 'chart.page.html',
  styleUrls: ['chart.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class ChartPage {
  private apiService = inject(ExchangeRateApiService);

  base = toSignal(inject(Store).select(CoreState.base), {
    initialValue: 'USD',
  });
  // withComponentInputBinding binds router param to input property directly
  counter = input('counter');

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
}
