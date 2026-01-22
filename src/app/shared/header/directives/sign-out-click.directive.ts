import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { AuthorizationStatus } from '../../../core/constants/const';

@Directive({
  selector: '[appSignOutClick]',
})
export class SignOutClickDirective {
  @Input({ required: true }) authStatus!: AuthorizationStatus;
  @Output() signOutClicked = new EventEmitter<void>();

  @HostListener('click')
  onSignOutClick() {
    if (this.authStatus === AuthorizationStatus.AUTH) {
      this.signOutClicked.emit();
    }
  }
}
