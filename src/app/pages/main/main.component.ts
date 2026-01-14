import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectCity, selectIsOfferLoading, selectOffers,} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {OfferCardComponent} from '../../shared/offer-card/offer-card.component';
import {SelectCityDirective} from './directives/select-city.directive';
import {CityName, DEFAULT_CITY, SortType} from '../../core/constants/const';
import {CityByNamePipe} from './pipes/city-by-name.pipe';
import {City} from '../../core/models/city';
import {OffersByCityPipe} from './pipes/offers-by-city.pipe';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {PlacesSortingFormComponent} from '../../features/places-sorting-form/places-sorting-form.component';
import {SortByPipe} from '../../features/places-sorting-form/pipes/sort-by.pipe';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [
    HeaderComponent,
    OfferCardComponent,
    SelectCityDirective,
    CityByNamePipe,
    OffersByCityPipe,
    LoaderComponent,
    PlacesSortingFormComponent,
    SortByPipe,
  ],
})
export class MainComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public offers = signal<OfferPreview[]>([]);
  public currentCity = signal<City>(DEFAULT_CITY);
  public isOfferLoading = signal<boolean>(false);
  public sortType = signal<SortType>(SortType.POPULAR);
  public readonly CityName = CityName;

  ngOnInit(): void {
    this.store
      .select(selectOffers)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((offers: OfferPreview[]) => this.offers.set(offers));

    this.store
      .select(selectIsOfferLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading: boolean) => this.isOfferLoading.set(isLoading));

    this.store
      .select(selectCity)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((city) => this.currentCity.set(city));
  }

  onCitySelected(city: City) {
    this.currentCity.set(city);
    this.sortType.set(SortType.POPULAR);
  }

  onSortTypeSelected(sortType: SortType) {
    this.sortType.set(sortType);
  }
}
