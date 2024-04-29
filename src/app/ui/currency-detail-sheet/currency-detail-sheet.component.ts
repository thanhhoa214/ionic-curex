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
import { star, starOutline } from 'ionicons/icons';
import { filter, map, switchMap } from 'rxjs';
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
import { Browser } from '@capacitor/browser';

const recentNews = [
  {
    title: 'Tech stocks rally as major companies report strong earnings',
    date: '2021-05-14',
    source: 'CNN Business',
    url: 'https://www.cnn.com/2021/05/14/business/tech-stocks-rally-earnings/index.html',
    description:
      'Technology stocks surged on Friday as major companies reported better-than-expected earnings, boosting investor confidence in the sector amid a broader market rally.',
  },
  {
    title: 'Oil prices jump as OPEC+ sticks to gradual output increases',
    date: '2021-05-13',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2021-05-13/oil-jumps-as-opec-sticks-to-gradual-output-increases',
    description:
      'Oil prices soared on Thursday after the Organization of the Petroleum Exporting Countries and allies (OPEC+) decided to stick to their plan of gradual output increases, easing concerns about supply shortages.',
  },
  {
    title: 'Global stock markets hit new highs on positive economic outlook',
    date: '2021-05-12',
    source: 'Financial Times',
    url: 'https://www.ft.com/content/91a55fe3-5aa6-4e71-bdb2-0a9c64a32d17',
    description:
      'Global stock markets reached new highs on Wednesday amid growing optimism about the global economic recovery, fueled by strong corporate earnings and progress in vaccination efforts against COVID-19.',
  },
];

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
  ],
})
export class CurrencyDetailSheetComponent {
  private store = inject(Store);
  private codes = toSignal(this.store.select(CoreState.codes));
  private favorites = toSignal(this.store.select(RateState.favoritesWithRate));
  private historicalApi = historicalApiCaller();
  counter = input<string>('USD');
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
  code = computed(() => this.codes()?.find((c) => c.iso === this.counter()));
  chartParams = signal<GetChartOptionsParams | undefined>(undefined);
  chartLoading = signal(true);

  recommendations = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];
  recentNews = recentNews;

  constructor() {
    addIcons({ star, starOutline });
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

  openBrowser(url: string) {
    Browser.open({ url: 'http://capacitorjs.com/' });
  }
}
