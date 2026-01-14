import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appMouseLeave]',
})
export class MouseleaveDirective {
  @Output() mouseLeaved = new EventEmitter<void>();

  @HostListener('mouseleave')
  onMouseleave() {
    this.mouseLeaved.emit();
  }
}
