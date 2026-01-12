import { createAction, props } from '@ngrx/store';
import { Offer, OfferPreview } from '../../../core/models/offers';
import {FavoriteStatus} from '../../../core/models/favorite-status';


export const loadFavoriteOffers = createAction(
  '[Main page] Load Favorite Offers',
);
export const loadFavoriteOffersSuccess = createAction(
  '[Favorite Offer API] Load Success',
  props<{ favoriteOffers: OfferPreview[] }>(),
);
export const loadFavoriteOffersFailure = createAction(
  '[Favorite Offer API] Load Failure',
  props<{ error: string }>(),
);

export const changeFavoriteStatus = createAction(
  '[Offer Card Component] Change Favorite Status',
  props<{ offerId: string; status: FavoriteStatus }>(),
);
export const changeFavoriteStatusSuccess = createAction(
  '[Favorite Offer API] Change Favorite Status Success',
  props<{ favoriteOffer: Offer }>(),
);
export const changeFavoriteStatusFailure = createAction(
  '[Favorite Offer API] Change Favorite Status Failure',
  props<{ error: string }>(),
);
