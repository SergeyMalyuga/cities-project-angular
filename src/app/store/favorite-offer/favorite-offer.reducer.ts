import {createEntityAdapter} from '@ngrx/entity';
import {OfferPreview} from '../../core/models/offers';
import {FavoriteOffersState} from '../../core/models/favorite-offers.state';
import {createReducer, on} from '@ngrx/store';
import {
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess
} from './actions/favorite-offer.actions';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOffersState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const favoriteOfferReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, state => ({
    ...state, isLoading: true
  })),
  on(loadFavoriteOffersSuccess, (state, {favoriteOffers}) =>
    favoriteOfferAdapter.setAll(favoriteOffers, {...state, isLoading: false, error: null}),
  ),
  on(loadFavoriteOffersFailure, (state, {error}) => ({
    ...state, isLoading: false, error
  }))
);
