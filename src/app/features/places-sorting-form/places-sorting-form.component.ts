import {Component, signal} from '@angular/core';
import {TogglePlacesSortDirective} from './directives/toggle-places-sort.directive';

@Component({
  selector: 'app-places-sorting-form',
  templateUrl: './places-sorting-form.component.html',
  imports: [
    TogglePlacesSortDirective
  ]
})
export class PlacesSortingFormComponent {
  public isSortFormOpen = signal<boolean>(false);

  onPlacesSortToggled(isOpen: boolean) {
    this.isSortFormOpen.set(isOpen);
  }
}
