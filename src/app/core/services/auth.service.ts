import {Injectable} from '@angular/core';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';
import {Token} from '../models/token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  }

  public setToken(token: Token) {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  }

  public removeToken() {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  }
}
