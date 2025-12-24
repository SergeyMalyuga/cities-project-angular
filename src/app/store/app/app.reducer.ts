import {AppState} from '../../core/models/app.state';
import {ActionReducerMap} from '@ngrx/store';
import {offerReducer} from '../offer/offer.reducer';
import {userReducer} from '../user/user.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
  user: userReducer,
};
