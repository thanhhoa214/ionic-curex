import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonListHeader,
  IonLabel,
  IonIcon,
  IonItem,
  IonList,
  IonModal,
  IonText,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonReorderGroup,
  ItemReorderEventDetail,
  IonReorder,
  IonNote,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  chevronExpandOutline,
  colorWandOutline,
  refreshOutline,
  trashOutline,
} from 'ionicons/icons';
import { filter, interval, map, startWith } from 'rxjs';
import {
  AddFavorite,
  RemoveFavorite,
  ReorderFavorites,
} from 'src/app/data-access/store/core.actions';
import { CoreState } from 'src/app/data-access/store/core.state';
import { CurrencyListSheetComponent } from '../../ui/currency-list-sheet/currency-list-sheet.component';
import { CurrencyDetailSheetComponent } from '../../ui/currency-detail-sheet/currency-detail-sheet.component';
import { RateState } from 'src/app/data-access/store/rate/rate.state';
import { formatDate } from 'date-fns/format';
import { nonNullable } from 'src/app/util/helpers/non-nullable';
import { REFRESH_TIME_SEC } from 'src/app/util/constants';
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonReorder,
    IonReorderGroup,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonText,
    IonModal,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonListHeader,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    CurrencyListSheetComponent,
    CurrencyDetailSheetComponent,
    AsyncPipe,
    DecimalPipe,
    NgClass,
  ],
})
export class HomePage {
  readonly CURRENCY_LIMIT = 10;
  private store = inject(Store);

  base = toSignal(this.store.select(CoreState.base));
  favorites = toSignal(this.store.select(RateState.favoritesWithRate));
  codesWithRate = toSignal(this.store.select(RateState.rates));
  ystChangeRate = toSignal(this.store.select(RateState.ystChangeRate));
  selectedCode = signal<string | null>(null);
  allCurrencyExpanded = signal(false);
  showAddFavoriteSheet = signal(false);
  inEditFavorites = signal(false);
  lastUpdateAt$ = this.store.select(RateState.lastUpdateAt).pipe(
    filter(nonNullable),
    map((d) => formatDate(d, 'yyyy-MM-dd HH:mm:ss'))
  );
  refreshCountdown$ = interval(1000).pipe(
    map((i) => REFRESH_TIME_SEC - (i % 60)),
    startWith(REFRESH_TIME_SEC)
  );

  private tempOrder: string[] = [];

  constructor() {
    addIcons({
      colorWandOutline,
      addCircleOutline,
      trashOutline,
      refreshOutline,
      chevronExpandOutline,
    });
  }

  addFavorite(code: string) {
    this.store.dispatch(new AddFavorite(code));
  }
  setFavorites(codes: string[]) {
    this.store.dispatch(new ReorderFavorites(codes));
  }
  removeFavorite(code: string) {
    this.store.dispatch(new RemoveFavorite(code));
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Change the order of the favorites array
    this.tempOrder =
      this.favorites()
        ?.slice()
        .map((f) => f.code) || [];
    const draggedItem = this.tempOrder.splice(ev.detail.from, 1)[0];
    this.tempOrder.splice(ev.detail.to, 0, draggedItem);
    ev.detail.complete();
  }
  toggleEdit() {
    if (this.inEditFavorites()) {
      this.store.dispatch(new ReorderFavorites(this.tempOrder));
    } else {
      this.tempOrder = this.favorites()?.map((f) => f.code) || [];
    }
    this.inEditFavorites.set(!this.inEditFavorites());
  }
}
