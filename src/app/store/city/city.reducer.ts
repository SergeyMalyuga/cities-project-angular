import {DEFAULT_CITY} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {changeCity} from './actions/city.actions';
import {CityState} from '../../core/models/city.state';

const initialState: CityState = {
  currentCity: DEFAULT_CITY,
};

export const cityReducer = createReducer(
  initialState,
  on(changeCity, (state, { city }) => ({
    ...state,
    currentCity: city,
  })),
);
