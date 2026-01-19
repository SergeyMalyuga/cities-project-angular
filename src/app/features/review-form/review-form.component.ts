import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-review-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  private formBuilder = inject(FormBuilder);

  public reviewForm: FormGroup = this.formBuilder.group({
    rating: ['', [Validators.required]],
    comments: ['', [Validators.required, Validators.minLength(50), Validators.max(360)]],
  })

}
