import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import {
  selectAuthStatus,
  selectUserEmail,
} from '../../store/app/selectors/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink],
})
export class HeaderComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public email = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authStatus) => this.authStatus.set(authStatus));

    this.store
      .select(selectUserEmail)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((email) => this.email.set(email));
  }

  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
