import {Component, DestroyRef, inject, Input, OnInit, signal,} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {AppRoute, AuthorizationStatus, FavoriteClass,} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectIsFavoriteOfferLoading,} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';
import {FavoriteOfferService} from '../../core/services/favorite-offer.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [CapitalizePipe, ToggleFavoriteDirective, RouterLink],
})
export class OfferCardComponent implements OnInit {
  @Input({required: true}) offer!: OfferPreview;
  private destroyRef = inject(DestroyRef);
  private favoriteOfferService = inject(FavoriteOfferService)

  public isFavoriteBtnDisable = signal<boolean>(false);

  public readonly Math = Math;
  public readonly FavoriteClass = FavoriteClass;
  public store = inject(Store<AppState>);
  public readonly AuthorizationStatus = AuthorizationStatus;
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);

  ngOnInit(): void {
    this.store
      .select(selectIsFavoriteOfferLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => this.isFavoriteBtnDisable.set(isLoading));
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authStatus) => this.authStatus.set(authStatus));
  }

  public onFavoriteToggled() {
    this.isFavoriteBtnDisable.set(true);
    this.favoriteOfferService.changeStatus(this.authStatus(), this.offer);
  }

  protected readonly AppRoute = AppRoute;
}
