import {DEFAULT_CITY} from '../../core/constants/const';
import {createReducer} from '@ngrx/store';

const initialState = DEFAULT_CITY;

export const cityReducer = createReducer(initialState,
  )
