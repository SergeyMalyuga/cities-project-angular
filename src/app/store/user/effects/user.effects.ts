import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

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

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((user) => {
            this.authService.setToken(user.token);
            return UserActions.loginSuccess({ user });
          }),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loginFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() => {
        return this.userService.logout().pipe(
          map(() => {
            this.authService.removeToken();
            return UserActions.logoutSuccess();
          }),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.logoutFailure({ error: error.message })),
          ),
        );
      }),
    ),
  );
}
