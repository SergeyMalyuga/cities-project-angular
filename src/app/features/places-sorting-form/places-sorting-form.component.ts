import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {TogglePlacesSortDirective} from './directives/toggle-places-sort.directive';
import {MouseleaveDirective} from './directives/mouseleave.directive';
import {SelectSortTypeDirective} from './directives/select-sort-type.directive';
import {SortType} from '../../core/constants/const';

@Component({
  selector: 'app-places-sorting-form',
  templateUrl: './places-sorting-form.component.html',
  imports: [
    TogglePlacesSortDirective,
    MouseleaveDirective,
    SelectSortTypeDirective,
  ],
})
export class PlacesSortingFormComponent {
  @Input({ required: true }) currentSortType!: SortType;
  @Output() sortTypeSelected = new EventEmitter<SortType>();

  public isSortFormOpen = signal<boolean>(false);
  public readonly SortType = SortType;

  onPlacesSortToggled(isOpen: boolean) {
    this.isSortFormOpen.set(isOpen);
  }

  closeSortMenu() {
    this.isSortFormOpen.set(false);
  }

  public onSortTypeSelected(sortType: SortType) {
    this.sortTypeSelected.emit(sortType);
    this.isSortFormOpen.set(false);
  }
}
