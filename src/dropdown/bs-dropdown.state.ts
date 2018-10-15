import { EventEmitter, Injectable } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/loader';

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
  dropdownMenu: Promise<BsComponentRef<any>>;
  resolveDropdownMenu: (componentRef: BsComponentRef<any>) => void;

  constructor() {
    this.dropdownMenu = new Promise(resolve => {
      this.resolveDropdownMenu = resolve;
    });
  }
}
