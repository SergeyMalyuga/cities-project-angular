import {Component, signal} from '@angular/core';
import {TogglePlacesSortDirective} from './directives/toggle-places-sort.directive';
import {MouseleaveDirective} from './directives/mouseleave.directive';

@Component({
  selector: 'app-places-sorting-form',
  templateUrl: './places-sorting-form.component.html',
  imports: [
    TogglePlacesSortDirective,
    MouseleaveDirective
  ]
})
export class PlacesSortingFormComponent {
  public isSortFormOpen = signal<boolean>(false);

  onPlacesSortToggled(isOpen: boolean) {
    this.isSortFormOpen.set(isOpen);
  }

  closeSortMenu() {
    this.isSortFormOpen.set(false);
  }
}
