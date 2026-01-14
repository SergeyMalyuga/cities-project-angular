import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {login} from '../../store/user/actions/user.actions';
import {Router} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class LoginFormComponent {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);

  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'),
      ],
    ],
  });

  public onSubmit() {
    if (this.loginGroup.valid) {
      const { email, password } = this.loginGroup.value;
      this.store.dispatch(login({ email, password }));
      this.router.navigate([AppRoute.MAIN]);
    }
  }
}
