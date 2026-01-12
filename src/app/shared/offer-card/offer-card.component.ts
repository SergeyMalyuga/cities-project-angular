import {Component, inject, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {FavoriteClass, FavoriteStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {changeFavoriteStatus} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {FavoriteStatus as FavoriteStatusType} from '../../core/models/favorite-status';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [CapitalizePipe, ToggleFavoriteDirective],
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;

  public readonly Math = Math;
  public readonly FavoriteClass = FavoriteClass;
  public store = inject(Store<AppState>);

  public onFavoriteToggled() {
    const status = +!this.offer.isFavorite;
    if (this.isFavoriteStatus(status)) {
      this.store.dispatch(changeFavoriteStatus({offerId: this.offer.id, status}))
    }
  }

  private isFavoriteStatus(value: unknown): value is FavoriteStatusType {
    return FavoriteStatus.ADDED === value || FavoriteStatus.REMOVED === value;
  }
}
