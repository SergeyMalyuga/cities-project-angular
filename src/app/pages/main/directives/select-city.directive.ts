import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {City} from '../../../core/models/city';

@Directive({
  selector: '[appSelectCity]',
})
export class SelectCityDirective {
  @Input({required: true}) city!: City;
  @Input({required: true}) currentCity!: City;
  @Output() citySelected = new EventEmitter<City>();

  @HostBinding('class.tabs__item--active')
  get isActive() {
    return this.city.name === this.currentCity.name;
  }

  @HostListener("click", ["$event"])
  onCityBtnClick(evt: MouseEvent) {
    evt.preventDefault();
    this.citySelected.emit(this.city);
  }
}
