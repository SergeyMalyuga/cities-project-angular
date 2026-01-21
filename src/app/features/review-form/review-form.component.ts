import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommentService} from '../../core/services/comment.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Comment} from '../../core/models/comments';

@Component({
  selector: 'app-review-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  @Input({required: true}) offerId!: string | null;
  @Output() commentAdded = new EventEmitter<Comment>();

  private formBuilder = inject(FormBuilder);
  private commentService = inject(CommentService);
  private destroyRef = inject(DestroyRef);

  public reviewForm: FormGroup = this.formBuilder.group({
    rating: ['', [Validators.required]],
    comments: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(360)]],
  })

  public onSubmit() {
    if (this.reviewForm.valid && this.offerId) {
      const {rating, comments} = this.reviewForm.value;
      this.commentService.postComment(this.offerId, Number(rating), comments).pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: comment => {
            this.commentAdded.emit(comment);
            this.reviewForm.reset();
          },
          error: error => {
            console.error('Comment submission failed', error)
          },
        });
    }
  }
}
