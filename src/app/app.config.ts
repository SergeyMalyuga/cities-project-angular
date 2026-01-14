import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { OfferEffects } from './store/offer/effects/offer.effects';
import { appReducer } from './store/app/app.reducer';
import { UserEffects } from './store/user/effects/user.effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { FavoriteOfferEffects } from './store/favorite-offer/effects/favorite-offer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideStore(appReducer),
    provideEffects(OfferEffects, UserEffects, FavoriteOfferEffects),
  ],
};
