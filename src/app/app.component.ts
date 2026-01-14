import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './core/models/app.state';
import { loadOffers } from './store/offer/actions/offer.actions';
import { checkAuthStatus } from './store/user/actions/user.actions';
import { loadFavoriteOffers } from './store/favorite-offer/actions/favorite-offer.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(loadOffers());
    this.store.dispatch(checkAuthStatus());
    this.store.dispatch(loadFavoriteOffers());
  }
}
