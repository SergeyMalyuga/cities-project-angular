import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';

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
