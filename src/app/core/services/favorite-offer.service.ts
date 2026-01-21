import {inject, Injectable} from '@angular/core';
import {changeFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {FavoriteStatus as FavoriteStatusType} from '../models/favorite-status';
import {AppRoute, AuthorizationStatus, FavoriteStatus} from '../constants/const';
import {OfferPreview} from '../models/offers';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoriteOfferService {
  private store = inject(Store<AppState>)
  private router = inject(Router);

  public changeStatus(authStatus: AuthorizationStatus, offer: OfferPreview) {
    if (authStatus === AuthorizationStatus.AUTH) {
      const status = +!offer.isFavorite;
      if (this.isFavoriteStatus(status)) {
        this.store.dispatch(
          changeFavoriteStatus({offerId: offer.id, status}),
        );
      }
    } else {
      this.router.navigate([AppRoute.LOGIN]);
    }
  }

  private isFavoriteStatus(value: number): value is FavoriteStatusType {
    return FavoriteStatus.ADDED === value || FavoriteStatus.REMOVED === value;
  }
}

