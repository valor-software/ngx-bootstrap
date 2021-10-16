import { EventEmitter, Injectable } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { BsDropdownMenuDirective } from './bs-dropdown-menu.directive';

@Injectable()
export class BsDropdownState {
  direction: 'down' | 'up' = 'down';
  autoClose = true;
  insideClick = false;
  isAnimated = false;
  stopOnClickPropagation = false;
  isOpenChange = new EventEmitter<boolean>();
  isDisabledChange = new EventEmitter<boolean>();
  toggleClick = new EventEmitter<boolean>();
  counts = 0;
  /**
   * Content to be displayed as popover.
   */
  dropdownMenu: Promise<BsComponentRef<BsDropdownMenuDirective>>;
  resolveDropdownMenu!: (componentRef: BsComponentRef<BsDropdownMenuDirective>) => void;

  constructor() {
    this.dropdownMenu = new Promise(resolve => {
      this.resolveDropdownMenu = resolve;
    });
  }
}
