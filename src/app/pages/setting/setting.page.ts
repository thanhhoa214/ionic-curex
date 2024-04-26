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
import { ExchangeRateApiService } from 'src/app/data-access/services/exrate-api.service';
import { CoreState } from 'src/app/data-access/store/core.state';

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
  codes = toSignal(inject(Store).select(CoreState.codes));

  constructor() {
    addIcons({ callOutline, starHalfOutline, shieldCheckmarkOutline });
  }
}
