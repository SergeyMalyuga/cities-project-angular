import {Component, DestroyRef, inject, Input, OnInit, signal} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {AppRoute, AuthorizationStatus, FavoriteClass, FavoriteStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {changeFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {FavoriteStatus as FavoriteStatusType} from '../../core/models/favorite-status';
import {selectAuthStatus, selectIsFavoriteOfferLoading} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [CapitalizePipe, ToggleFavoriteDirective, RouterLink],
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: OfferPreview;
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public isFavoriteBtnDisable = signal<boolean>(false);

  public readonly Math = Math;
  public readonly FavoriteClass = FavoriteClass;
  public store = inject(Store<AppState>);
  public readonly AuthorizationStatus = AuthorizationStatus;
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);

  ngOnInit(): void {
    this.store.select(selectIsFavoriteOfferLoading).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => this.isFavoriteBtnDisable.set(isLoading));
    this.store.select(selectAuthStatus).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((authStatus) => this.authStatus.set(authStatus));
  }

  public onFavoriteToggled() {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.isFavoriteBtnDisable.set(true);
      const status = +!this.offer.isFavorite;
      if (this.isFavoriteStatus(status)) {
        this.store.dispatch(changeFavoriteStatus({offerId: this.offer.id, status}))
      }
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
  }

  private isFavoriteStatus(value: unknown): value is FavoriteStatusType {
    return FavoriteStatus.ADDED === value || FavoriteStatus.REMOVED === value;
  }

  protected readonly AppRoute = AppRoute;
}
