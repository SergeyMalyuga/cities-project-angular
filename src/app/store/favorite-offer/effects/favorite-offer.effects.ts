import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOfferService } from '../../../core/services/favorite-offer.service';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOfferServicer = inject(FavoriteOfferService);

  loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavoriteOffers),
      switchMap(() =>
        this.favoriteOfferServicer.getFavoriteOffers().pipe(
          map((favoriteOffers) =>
            FavoriteActions.loadFavoriteOffersSuccess({ favoriteOffers }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FavoriteActions.loadFavoriteOffersFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  changeFavoriteStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.changeFavoriteStatus),
      switchMap(({ offerId, status }) =>
        this.favoriteOfferServicer.changeStatus(offerId, status).pipe(
          map((favoriteOffer) =>
            FavoriteActions.changeFavoriteStatusSuccess({ favoriteOffer }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FavoriteActions.changeFavoriteStatusFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
