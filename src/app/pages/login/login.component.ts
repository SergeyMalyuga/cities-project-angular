import { Component, inject, signal } from '@angular/core';
import { AppRoute, CITY_LOCATIONS } from '../../core/constants/const';
import { Router, RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../features/login-form/login-form.component';
import { City } from '../../core/models/city';
import { SelectCityDirective } from './directives/select-city.directive';
import { AppState } from '../../core/models/app.state';
import { Store } from '@ngrx/store';
import { changeCity } from '../../store/city/actions/city.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [RouterLink, LoginFormComponent, SelectCityDirective],
})
export class LoginComponent {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  public readonly AppRoute = AppRoute;
  public randomLocation = signal<City>(this.getRandomLocation());

  private getRandomLocation(): City {
    return CITY_LOCATIONS[Math.floor(Math.random() * CITY_LOCATIONS.length)];
  }

  public onCitySelected(selectedCity: City): void {
    this.store.dispatch(changeCity({ city: selectedCity }));
    this.router.navigate([AppRoute.MAIN]);
  }
}
