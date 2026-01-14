import {Directive, EventEmitter, HostListener, Input, Output,} from '@angular/core';

@Directive({
  selector: '[appTogglePlacesSort]',
})
export class TogglePlacesSortDirective {
  @Input({ required: true }) isOpen!: boolean;
  @Output() placesSortToggled = new EventEmitter<boolean>();

  @HostListener('click')
  onTogglePlacesSort() {
    this.placesSortToggled.emit(!this.isOpen);
  }
}
