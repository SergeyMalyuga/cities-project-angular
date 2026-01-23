import { Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { OfferCardComponent } from '../../shared/offer-card/offer-card.component';

@Component({
  selector: 'app-favorite-location-group',
  imports: [CapitalizePipe, OfferCardComponent],
  templateUrl: './favorite-location-group.component.html',
})
export class FavoriteLocationGroupComponent {
  @Input({ required: true }) cityName!: string;
  @Input({ required: true }) offers!: OfferPreview[];
}
