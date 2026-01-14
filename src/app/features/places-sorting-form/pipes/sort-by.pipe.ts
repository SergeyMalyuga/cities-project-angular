import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {SortType} from '../../../core/constants/const';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(offers: OfferPreview[], sortType: SortType): OfferPreview[] {
    if (!offers?.length) return [];
    const copyOffers = [...offers];
    switch (sortType) {
      case SortType.PRICE_LOW_TO_HIGH: {
        return copyOffers.sort(this.sortByPriceLowToHigh);
      }
      case SortType.PRICE_HIGH_TO_LOW: {
        return copyOffers.sort(this.sortByPriceHighToLow);
      }
      case SortType.TOP_RATED_FIRST: {
        return copyOffers.sort(this.sortByTopRatedFirst);
      }
      default: {
        return copyOffers;
      }
    }
  }

  private sortByPriceLowToHigh(
    offerFirst: OfferPreview,
    offerSecond: OfferPreview,
  ) {
    return offerFirst.price - offerSecond.price;
  }

  private sortByPriceHighToLow(
    offerFirst: OfferPreview,
    offerSecond: OfferPreview,
  ) {
    return offerSecond.price - offerFirst.price;
  }

  private sortByTopRatedFirst(
    offerFirst: OfferPreview,
    offerSecond: OfferPreview,
  ) {
    return offerSecond.rating - offerFirst.rating;
  }
}
