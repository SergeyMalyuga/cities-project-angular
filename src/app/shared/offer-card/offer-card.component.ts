import {Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [
    CapitalizePipe
  ]
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  protected readonly Math = Math;
}
