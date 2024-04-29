import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { CoreState } from './app/data-access/store/core.state';
import { ApiModule } from './app/data-access/generated/api.module';
import {
  XE_API_URL,
  xeAuthInterceptor,
} from './app/data-access/services/xe-auth.interceptor';
import { RateState } from './app/data-access/store/rate/rate.state';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([xeAuthInterceptor])),
    importProvidersFrom(IonicStorageModule.forRoot()),
    importProvidersFrom([
      NgxsModule.forRoot([CoreState, RateState]),
      NgxsStoragePluginModule.forRoot({ key: [CoreState, RateState] }),
      NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    ]),
    importProvidersFrom(ApiModule.forRoot({ rootUrl: XE_API_URL })),
  ],
});
