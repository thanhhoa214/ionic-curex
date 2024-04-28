import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonSearchbar,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonList,
  IonCheckbox,
  IonItem,
  CheckboxChangeEventDetail,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  CoreState,
  AddFavorite,
  RemoveFavorite,
} from 'src/app/data-access/store';
@Component({
  selector: 'app-currency-list-sheet',
  templateUrl: './currency-list-sheet.component.html',
  styleUrls: ['./currency-list-sheet.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonCheckbox,
    IonList,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonContent,
  ],
})
export class CurrencyListSheetComponent {
  private store = inject(Store);
  private codes = toSignal(this.store.select(CoreState.codes));

  favorites = toSignal(
    this.store
      .select(CoreState.favorites)
      .pipe(map((f) => f?.map((c) => c.code)))
  );
  search = signal('');

  filteredCodes = computed(() =>
    this.codes()?.filter((c) =>
      [c.iso.toLowerCase(), c.currency_name.toLowerCase()].some((n) =>
        n.includes(this.search())
      )
    )
  );

  checkboxChange(detail: CheckboxChangeEventDetail<string>) {
    if (detail.checked) {
      this.store.dispatch(new AddFavorite(detail.value));
    } else {
      this.store.dispatch(new RemoveFavorite(detail.value));
    }
  }
}
