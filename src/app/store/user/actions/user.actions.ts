import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user';

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
