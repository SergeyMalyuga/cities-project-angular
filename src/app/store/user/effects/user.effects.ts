import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuthStatus),
      switchMap(() =>
        this.userService.getUser().pipe(
          map((user) => UserActions.checkAuthStatusSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.checkAuthStatusFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
