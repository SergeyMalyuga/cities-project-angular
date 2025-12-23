import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {City} from '../../../core/models/city';

@Directive({
  selector: '[appSelectCity]',
})
export class SelectCityDirective {
  @Input({required: true}) city!: City;
  @Output() citySelected = new EventEmitter<City>();

  @HostListener("click", ["$event"])
  onCityBtnClick(evt: MouseEvent) {
    evt.preventDefault();
    this.citySelected.emit(this.city);
    console.log(this.city);
  }
}
