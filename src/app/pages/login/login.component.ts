import { Component } from '@angular/core';
import {AppRoute} from '../../core/constants/const';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    RouterLink
  ]
})
export class LoginComponent {
  protected readonly AppRoute = AppRoute;
}
