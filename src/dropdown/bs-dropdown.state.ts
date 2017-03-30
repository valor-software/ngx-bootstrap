import { EventEmitter, Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class BsDropdownState {
  direction: 'down' | 'up' = 'down';
  autoClose: boolean;
  isOpenChange = new EventEmitter<boolean>();
  isDisabledChange = new EventEmitter<boolean>();
  toggleClick = new EventEmitter<boolean>();

  /**
   * Content to be displayed as popover.
   */
  dropdownMenu: Promise<TemplateRef<any>>;
  resolveDropdownMenu: Function;

  constructor() {
    this.dropdownMenu = new Promise((resolve) => {
      this.resolveDropdownMenu = resolve;
    });
  }
}
