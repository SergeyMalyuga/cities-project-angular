import { SortedFavoriteOffers } from '../models/sorted-favorite-offers';

export function isKeyOfSortedFavoriteOffers(
  value: string,
  favoriteOffers: SortedFavoriteOffers,
): value is keyof SortedFavoriteOffers {
  return value in favoriteOffers;
}
