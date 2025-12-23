import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {offerAdapter} from '../../offer/offer.reducer';

const selectOfferState = createFeatureSelector<AppState['offers']>('offers');
const offerSelectors = offerAdapter.getSelectors();

export const selectOffers = createSelector(
  selectOfferState,
  offerSelectors.selectAll
  );

export const selectIsOfferLoading = createSelector(
  selectOfferState,
  (state) => state.isLoading
)
