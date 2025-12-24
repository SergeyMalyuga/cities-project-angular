import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginFormComponent {
  private formBuilder = inject(FormBuilder);

  public loginGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')]]
  });
}
