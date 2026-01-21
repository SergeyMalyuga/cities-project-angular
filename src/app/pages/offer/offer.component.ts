import {Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {Offer} from '../../core/models/offers';
import {OfferApiService} from '../../core/services/offer-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, EMPTY, forkJoin, switchMap} from 'rxjs';
import {AuthorizationStatus} from '../../core/constants/const';
import {selectAuthStatus} from '../../store/app/selectors/app.selectors';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import {ReviewFormComponent} from '../../features/review-form/review-form.component';
import {CommentService} from '../../core/services/comment.service';
import {Comment} from '../../core/models/comments';
import {SortByDatePipe} from './pipes/sort-by-date.pipe';
import {FormatMonthYearPipe} from '../../features/places-sorting-form/pipes/format-month-year.pipe';
import {FormatIsoDatePipe} from '../../features/places-sorting-form/pipes/format-iso-date.pipe';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, LoaderComponent, CapitalizePipe, ReviewFormComponent, SortByDatePipe, FormatMonthYearPipe, FormatIsoDatePipe],
  templateUrl: './offer.component.html',
})
export class OfferComponent implements OnInit {
  private store = inject(Store<AppState>);
  private offerService = inject(OfferApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private commentService = inject(CommentService);

  public offer = signal<Offer | undefined>(undefined);
  public offerId = signal<string | null>(null);
  public authStatus = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public comments = signal<Comment[]>([]);
  public amountComments = computed(() => this.comments().length);
  public readonly Math = Math;
  public readonly AuthorizationStatus = AuthorizationStatus;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const id = params.get('id');
          if (id === null) {
            this.router.navigate(['/', '**']);
            return EMPTY;
          }
          this.offerId.set(id);
          return forkJoin({
            offer: this.offerService.getOfferById(id),
            comments: this.commentService.getComments(id)
          }).pipe(catchError(() => {
            this.router.navigate(['/', '**']);
            return EMPTY
          }));
        }),
      )
      .subscribe((result) => {
        this.offer.set(result?.offer);
        this.comments.set(result?.comments ?? []);
      });

    this.store
      .select(selectAuthStatus)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => this.authStatus.set(status));
  }

  public onCommentAdded(comment: Comment) {
    this.comments.update(comments => [comment, ...comments]
    )
  }
}
