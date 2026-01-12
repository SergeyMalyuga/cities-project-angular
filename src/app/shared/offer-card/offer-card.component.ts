import { Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import {ToggleFavoriteDirective} from '../directives/toggle-favorite.directive';
import {FavoriteClass} from '../../core/constants/const';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [CapitalizePipe, ToggleFavoriteDirective],
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: OfferPreview;
  public readonly Math = Math;
  public readonly FavoriteClass = FavoriteClass;

/*  public onFavoriteToggled() {

  }*/
}
