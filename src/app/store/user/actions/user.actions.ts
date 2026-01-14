import {createAction, props} from '@ngrx/store';
import {User} from '../../../core/models/user';

export const checkAuthStatus = createAction(
  '[Main component] Check Auth Status',
);
export const checkAuthStatusSuccess = createAction(
  '[User Api] Check Auth Status Success',
  props<{ user: User }>(),
);
export const checkAuthStatusFailure = createAction(
  '[User Api] Check Auth Status Failure',
  props<{ error: string }>(),
);

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[User Api] Login Success',
  props<{ user: User }>(),
);
export const loginFailure = createAction(
  '[User Api] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Header Component] Logout');
export const logoutSuccess = createAction('[User Api] Logout Success');
export const logoutFailure = createAction(
  '[User Api] Logout Failure',
  props<{ error: string }>(),
);
