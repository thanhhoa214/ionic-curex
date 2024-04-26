import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
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
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  colorWandOutline,
  refreshOutline,
  trashOutline,
} from 'ionicons/icons';
import {
  AddFavorite,
  RemoveFavorite,
  ReorderFavorites,
  SetBaseCurrency,
} from 'src/app/data-access/store/core.actions';
import { CoreState } from 'src/app/data-access/store/core.state';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
  ],
})
export class HomePage {
  private store = inject(Store);

  base = toSignal(this.store.select(CoreState.base));
  codes = toSignal(this.store.select(CoreState.codes));
  codesWithRate = toSignal(this.store.select(CoreState.codesWithRate));
  favorites = toSignal(this.store.select(CoreState.favorites));

  customAlertOptions: AlertOptions = {
    inputs: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Name',
      },
    ],
  };

  constructor() {
    addIcons({
      colorWandOutline,
      addCircleOutline,
      trashOutline,
      refreshOutline,
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
}
