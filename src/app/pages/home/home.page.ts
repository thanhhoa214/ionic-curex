import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { ExchangeRateApiService } from 'src/app/data-access/services/exrate-api.service';

@Component({
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
  api = inject(ExchangeRateApiService);
}
