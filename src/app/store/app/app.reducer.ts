import {AppState} from '../../core/models/app.state';
import {ActionReducerMap} from '@ngrx/store';
import {offerReducer} from '../offer/offer.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offerReducer
}
