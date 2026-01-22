import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Store} from '@ngrx/store';
import {selectFavoriteOffers} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  public favoriteOffers = signal<SortedFavoriteOffers>(this.getSortedOffers());

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(offers => offers.forEach(offer => {
        const key = offer.city.name.toLowerCase();
        const sortedOffers = this.getSortedOffers();
        if (this.isKeyOf(key)) {
          sortedOffers[key].push(offer);
        }
      }));
  }

  private isKeyOf(value: string): value is keyof SortedFavoriteOffers {
    return value in this.favoriteOffers();
  }

  private getSortedOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: []
    }
  }
}
