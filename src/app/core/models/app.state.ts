import { OffersState } from './offers.state';
import { UserState } from './user.state';
import { FavoriteOffersState } from './favorite-offers.state';
import { CityState } from './city.state';

export interface AppState {
  favoriteOffers: FavoriteOffersState;
  user: UserState;
  offers: OffersState;
  city: CityState;
}
