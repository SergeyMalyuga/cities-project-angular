import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfferApiService } from '../../../core/services/offer-api.service';
import * as OfferActions from '../actions/offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OfferEffects {
  private actions$ = inject(Actions);
  private offerApiService = inject(OfferApiService);

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.loadOffers),
      switchMap(() =>
        this.offerApiService.getOffers().pipe(
          map((offers) => OfferActions.loadOffersSuccess({ offers })),
          catchError((error: HttpErrorResponse) =>
            of(OfferActions.loadOffersFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
