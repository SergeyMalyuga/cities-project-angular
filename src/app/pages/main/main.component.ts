import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OfferPreview} from '../../core/models/offers';
import {selectOffers} from '../../store/app/selectors/app.selectors';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {OfferCardComponent} from '../../shared/offer-card/offer-card.component';
import {SelectCityDirective} from './directives/select-city.directive';
import {CityName, DEFAULT_CITY} from '../../core/constants/const';
import {CityByNamePipe} from './pipes/city-by-name.pipe';
import {City} from '../../core/models/city';
import {OffersByCityPipe} from './pipes/offers-by-city.pipe';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [HeaderComponent, OfferCardComponent, SelectCityDirective, CityByNamePipe, OffersByCityPipe]
})
export class MainComponent implements OnInit {
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  public offers = signal<OfferPreview[]>([]);
  public currentCity = signal<City>(DEFAULT_CITY);
  public readonly CityName = CityName;

  ngOnInit(): void {
    this.store.select(selectOffers).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((offers: OfferPreview[]) => this.offers.set(offers));
  }

  onCitySelected(city: City) {
    this.currentCity.set(city);
  }
}
