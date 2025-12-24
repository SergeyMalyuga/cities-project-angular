import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {checkAuthStatus, checkAuthStatusFailure, checkAuthStatusSuccess} from './actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(checkAuthStatus, state => ({
    ...state, isLoading: true
  })),
  on(checkAuthStatusSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.AUTH, error: null
  })),
  on(checkAuthStatusFailure, (state, {error}) => ({
    ...state, error, isLoading: false, authorizationStatus: AuthorizationStatus.UN_AUTH
  }))
);
