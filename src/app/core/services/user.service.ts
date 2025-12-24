import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { APIRoute, BASE_URL } from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public getUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`);
  }

  public login(email: string, password: string) {
    return this.http.post(`${BASE_URL}/${APIRoute.LOGIN}`, { email, password });
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.LOGOUT}`);
  }
}
