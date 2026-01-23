import { Component, Input } from '@angular/core';
import { SortedFavoriteOffers } from '../../core/models/sorted-favorite-offers';
import { FavoriteLocationGroupComponent } from '../favorite-location-group/favorite-location-group.component';
import { isKeyOfSortedFavoriteOffers } from '../../core/utils/sorted-favorite-offers.guard';

@Component({
  selector: 'app-favorite-list',
  imports: [FavoriteLocationGroupComponent],
  templateUrl: './favorite-list.component.html',
})
export class FavoriteListComponent {
  @Input({ required: true }) offers!: SortedFavoriteOffers;
  protected readonly Object = Object;
  protected readonly isKeyOfSortedFavoriteOffers = isKeyOfSortedFavoriteOffers;
}
