import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {SortType} from '../../../core/constants/const';

@Directive({
  selector: '[appSelectSortType]',
})
export class SelectSortTypeDirective {
  @Input({required: true}) sortType!: SortType;
  @Output() sortTypeSelected = new EventEmitter<SortType>();

  @HostListener('click')
  onClick() {
    this.sortTypeSelected.emit(this.sortType);
  }
}
