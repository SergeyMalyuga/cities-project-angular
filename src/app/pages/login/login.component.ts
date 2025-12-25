import { Component } from '@angular/core';
import { AppRoute } from '../../core/constants/const';
import { RouterLink } from '@angular/router';
import { LoginFormComponent } from '../../features/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [RouterLink, LoginFormComponent],
})
export class LoginComponent {
  protected readonly AppRoute = AppRoute;
}
