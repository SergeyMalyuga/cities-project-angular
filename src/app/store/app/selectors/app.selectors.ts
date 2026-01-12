import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { offerAdapter } from '../../offer/offer.reducer';
import { favoriteOfferAdapter } from '../../favorite-offer/favorite-offer.reducer';

const selectOfferState = createFeatureSelector<AppState['offers']>('offers');
const offerSelectors = offerAdapter.getSelectors();

const selectFavoriteOfferState =
  createFeatureSelector<AppState['favoriteOffers']>('favoriteOffers');
const favoriteOfferSelectors = favoriteOfferAdapter.getSelectors();

const selectUserState = createFeatureSelector<AppState['user']>('user');

export const selectOffers = createSelector(
  selectOfferState,
  offerSelectors.selectAll,
);

export const selectIsOfferLoading = createSelector(
  selectOfferState,
  (state) => state.isLoading,
);

export const selectUserEmail = createSelector(
  selectUserState,
  (state) => state.user?.email,
);

export const selectAuthStatus = createSelector(
  selectUserState,
  (state) => state.authorizationStatus,
);

export const selectFavoriteOffers = createSelector(
  selectFavoriteOfferState,
  favoriteOfferSelectors.selectAll,
);
