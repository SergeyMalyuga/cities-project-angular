import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';

const selectOfferState = createFeatureSelector<AppState['offers']>('offers');
const offerSelectors = offerAdapter.getSelectors();

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
  (state) => state.user?.email);

export const selectAuthStatus = createSelector(
  selectUserState,
  (state) => state.authorizationStatus
);
