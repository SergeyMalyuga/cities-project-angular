import {createAction, props} from '@ngrx/store';
import {City} from '../../../core/models/city';

export const changeCity = createAction('[UI] Change City', props<{ city: City }>());
export const changeCitySuccess = createAction('[UI] Change City Success', props<{ city: City }>());
export const changeCityFailure = createAction('[UI] Change City Failure', props<{ error: string }>());
