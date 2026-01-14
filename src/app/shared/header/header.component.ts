import {Component, computed, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {selectAuthStatus, selectFavoriteOffers, selectUserEmail,} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {SignOutClickDirective} from './directives/sign-out-click.directive';
import {logout} from '../../store/user/actions/user.actions';
import {OfferPreview} from '../../core/models/offers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterLink, SignOutClickDirective],
})
export class HeaderComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public readonly AppRoute = AppRoute;
  public readonly AuthorizationStatus = AuthorizationStatus;
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public email = signal<string | undefined>(undefined);
  private favoriteOffers = signal<OfferPreview[]>([]);
  public offersAmount = computed(() => this.favoriteOffers().length);

  ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authStatus) => this.authStatus.set(authStatus));

    this.store
      .select(selectUserEmail)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((email) => this.email.set(email));

    this.store
      .select(selectFavoriteOffers)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((favoriteOffers) => this.favoriteOffers.set(favoriteOffers));
  }

  signOut() {
    this.store.dispatch(logout());
  }
}
