import { Component, OnInit, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { interval, startWith } from 'rxjs';
import { FetchRates } from './data-access/store/core.actions';

@Component({
  selector: 'app-root',
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app> `,
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    interval(30 * 1000)
      .pipe(startWith(0))
      .subscribe((i) => {
        // this.store.dispatch(new FetchRates());
      });
  }
}
