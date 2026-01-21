import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offer, OfferPreview} from '../models/offers';
import {APIRoute, BASE_URL} from '../constants/const';
import {FavoriteStatus} from '../models/favorite-status';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferApiService {
  private http = inject(HttpClient);

  getFavoriteOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`);
  }

  changeStatus(offerId: string, status: FavoriteStatus): Observable<Offer> {
    return this.http.post<Offer>(
      `${BASE_URL}/${APIRoute.FAVORITE}/${offerId}/${status}`,
      {},
    );
  }
}
