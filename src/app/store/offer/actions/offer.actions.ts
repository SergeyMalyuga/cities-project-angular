import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';

export const loadOffers = createAction('[App Component] Load Offers');
export const loadOffersSuccess = createAction('[Offer Api] Retrieve Offers Success',
  props<{ offers: OfferPreview[]}>());
export const loadOffersFailure = createAction('[Offer Api] Retrieve Offers Failure',
  props<{error: string}>());
