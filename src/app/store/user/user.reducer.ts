import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {
  checkAuthStatus,
  checkAuthStatusFailure,
  checkAuthStatusSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
} from './actions/user.actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: DEFAULT_USER,
  isLoading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(checkAuthStatus, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(checkAuthStatusSuccess, (state, { user }) => ({
    ...state,
    user,
    authorizationStatus: AuthorizationStatus.AUTH,
    error: null,
  })),
  on(checkAuthStatusFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    isLoading: false,
    authorizationStatus: AuthorizationStatus.AUTH,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(logout, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    user: DEFAULT_USER,
    error: null,
    isLoading: false,
    authorizationStatus: AuthorizationStatus.UN_AUTH,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
);
