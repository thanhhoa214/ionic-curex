import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonItem,
  IonButton,
  IonList,
  IonListHeader,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import {
  callOutline,
  shieldCheckmarkOutline,
  starHalfOutline,
} from 'ionicons/icons';
import { CoreState, SetBaseCurrency } from 'src/app/data-access/store';
import {
  FetchRates,
  FetchYesterdayRates,
} from 'src/app/data-access/store/rate/rate.actions';
import { RateState } from 'src/app/data-access/store/rate/rate.state';

@Component({
  selector: 'app-setting-page',
  standalone: true,
  imports: [
    IonIcon,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonListHeader,
    IonList,
    IonButton,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
  ],
  templateUrl: './setting.page.html',
  styleUrl: './setting.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingPage {
  private store = inject(Store);
  codes = toSignal(this.store.select(RateState.rates));
  base = toSignal(this.store.select(CoreState.base));

  constructor() {
    addIcons({ callOutline, starHalfOutline, shieldCheckmarkOutline });
  }

  setBaseCurrency(code: string) {
    this.store.dispatch(new SetBaseCurrency(code));
    this.store.dispatch(new FetchRates());
    this.store.dispatch(new FetchYesterdayRates());
  }
}
