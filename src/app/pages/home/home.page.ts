import { Component, effect, inject, signal } from '@angular/core';
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
  AlertOptions,
  IonText,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonReorderGroup,
  ItemReorderEventDetail,
  IonReorder,
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
import { filter } from 'rxjs';
import {
  AddFavorite,
  RemoveFavorite,
  ReorderFavorites,
} from 'src/app/data-access/store/core.actions';
import { CoreState } from 'src/app/data-access/store/core.state';
import { CurrencyListSheetComponent } from '../../ui/currency-list-sheet/currency-list-sheet.component';
import { CurrencyDetailSheetComponent } from '../../ui/currency-detail-sheet/currency-detail-sheet.component';

const CURRENCY_LIMIT = 10;

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class HomePage {
  private store = inject(Store);

  base = toSignal(this.store.select(CoreState.base));
  codes = toSignal(
    this.store
      .select(CoreState.codes)
      .pipe(filter((_, index) => index < CURRENCY_LIMIT))
  );
  codesWithRate = toSignal(this.store.select(CoreState.codesWithRate));
  favorites = toSignal(this.store.select(CoreState.favorites));
  selectedCode = signal<string | null>(null);
  showAddFavoriteSheet = signal(false);
  inEditFavorites = signal(false);

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
    }
    this.inEditFavorites.set(!this.inEditFavorites());
  }
}
