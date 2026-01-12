import { OffersState } from './offers.state';
import { UserState } from './user.state';
import { FavoriteOffersState } from './favorite-offers.state';

export interface AppState {
  favoriteOffers: FavoriteOffersState;
  user: UserState;
  offers: OffersState;
}
