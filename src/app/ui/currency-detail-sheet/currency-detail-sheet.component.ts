import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonTitle,
  IonToolbar,
  IonHeader,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { map } from 'rxjs';
import {
  AddFavorite,
  CoreState,
  RemoveFavorite,
} from 'src/app/data-access/store';

@Component({
  selector: 'app-currency-detail-sheet',
  templateUrl: './currency-detail-sheet.component.html',
  styleUrls: ['./currency-detail-sheet.component.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonIcon, IonHeader, IonToolbar, IonTitle],
})
export class CurrencyDetailSheetComponent {
  private store = inject(Store);
  private codes = toSignal(this.store.select(CoreState.codes));
  private favorites = toSignal(this.store.select(CoreState.favorites));
  counter = input<string>('USD');
  base = toSignal(this.store.select(CoreState.base));

  isInFavorite = computed(() =>
    this.favorites()?.some((f) => f.code === this.counter())
  );
  code = computed(() => this.codes()?.find((c) => c.iso === this.counter()));

  constructor() {
    addIcons({ star, starOutline });
  }

  toggleFavorite() {
    if (this.isInFavorite()) {
      this.store.dispatch(new RemoveFavorite(this.counter()));
    } else {
      this.store.dispatch(new AddFavorite(this.counter()));
    }
  }
}
