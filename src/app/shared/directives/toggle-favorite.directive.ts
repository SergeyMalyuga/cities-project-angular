import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FavoriteClass } from '../../core/constants/const';

@Directive({
  selector: '[appToggleFavorite]',
})
export class ToggleFavoriteDirective {
  @Output() favoriteToggled = new EventEmitter<void>();
  @Input({ required: true }) favoriteClassName!: FavoriteClass;

  private elementRef = inject(ElementRef);

  @HostListener('click')
  toggleFavorite() {
    const target = this.elementRef.nativeElement as HTMLElement;
    target.classList.toggle(this.favoriteClassName);
    this.favoriteToggled.emit();
  }
}
