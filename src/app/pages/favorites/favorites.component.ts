import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { Store } from '@ngrx/store';
import { selectFavoriteOffers } from '../../store/app/selectors/app.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SortedFavoriteOffers } from '../../core/models/sorted-favorite-offers';
import { FavoriteListComponent } from '../../features/favorite-list/favorite-list.component';
import { isKeyOfSortedFavoriteOffers } from '../../core/utils/sorted-favorite-offers.guard';
import { FavoritesEmptyComponent } from '../../features/favorites-empty/favorites-empty.component';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../core/constants/const';

@Component({
  selector: 'app-favorites',
  imports: [
    HeaderComponent,
    FavoriteListComponent,
    FavoritesEmptyComponent,
    RouterLink,
  ],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  public favoriteOffers = signal<SortedFavoriteOffers>(this.getSortedOffers());
  public offersAmount = computed(() => {
    return Object.values(this.favoriteOffers()).reduce(
      (total, cityOffers) => total + cityOffers.length,
      0,
    );
  });

  ngOnInit(): void {
    this.store
      .select(selectFavoriteOffers)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((offers) => {
        const sortedOffers = this.getSortedOffers();
        offers.forEach((offer) => {
          const key = offer.city.name.toLowerCase();
          if (isKeyOfSortedFavoriteOffers(key, this.favoriteOffers())) {
            sortedOffers[key].push(offer);
          }
        });
        this.favoriteOffers.set(sortedOffers);
      });
  }

  private getSortedOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: [],
    };
  }

  protected readonly AppRoute = AppRoute;
}
