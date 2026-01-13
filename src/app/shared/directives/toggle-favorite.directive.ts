import {Directive, EventEmitter, HostListener, Input, Output,} from '@angular/core';
import {AuthorizationStatus, FavoriteClass} from '../../core/constants/const';

@Directive({
  selector: '[appToggleFavorite]',
})
export class ToggleFavoriteDirective {
  @Output() favoriteToggled = new EventEmitter<void>();
  @Input({required: true}) favoriteClassName!: FavoriteClass;
  @Input({required: true}) authStatus!: AuthorizationStatus;

  @HostListener('click')
  toggleFavorite() {
    this.favoriteToggled.emit();
  }
}
