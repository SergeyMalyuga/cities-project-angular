import { OffersState } from './offers.state';
import { City } from './city';
import { UserState } from './user.state';
import { FavoriteOffersState } from './favorite-offers.state';

export interface AppState {
 /* city: City;*/
  favoriteOffers: FavoriteOffersState;
  user: UserState;
  offers: OffersState;
}
