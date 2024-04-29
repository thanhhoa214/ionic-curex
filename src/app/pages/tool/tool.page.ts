import { DecimalPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { CoreState } from 'src/app/data-access/store';
import { RateState } from 'src/app/data-access/store/rate/rate.state';

@Component({
  templateUrl: 'tool.page.html',
  styleUrls: ['tool.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonList,
    IonInput,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSelect,
    IonSelectOption,
    FormsModule,
    DecimalPipe,
  ],
})
export class ToolPage {
  private store = inject(Store);
  codesWithRate = toSignal(this.store.select(RateState.codesWithRate));

  from = signal('USD');
  to = signal('AUD');
  fromAmount = signal(1);
  toAmount = signal(0);

  constructor() {
    effect(
      () => {
        const from = this.codesWithRate()?.find((c) => c.code === this.from());
        const to = this.codesWithRate()?.find((c) => c.code === this.to());
        this.toAmount.set(
          from && to ? (this.fromAmount() * from.rate) / to.rate : 0
        );
      },
      { allowSignalWrites: true }
    );
  }
}
