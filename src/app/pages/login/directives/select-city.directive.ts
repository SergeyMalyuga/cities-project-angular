import {Directive, EventEmitter, HostListener, Input, Output,} from '@angular/core';
import {City} from '../../../core/models/city';

@Directive({
  selector: '[appSelectCity]',
})
export class SelectCityDirective {
  @Output() citySelected = new EventEmitter<City>();
  @Input({ required: true }) city!: City;

  @HostListener('click', ['$event'])
  selectCity(evt: MouseEvent): void {
    evt.preventDefault();
    this.citySelected.emit(this.city);
  }
}
