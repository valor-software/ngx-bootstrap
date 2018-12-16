import { EventEmitter, Injectable } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';

@Injectable()
export class BsDropdownState {
  direction: 'down' | 'up' = 'down';
  autoClose: boolean;
  insideClick: boolean;
  isOpenChange = new EventEmitter<boolean>();
  isDisabledChange = new EventEmitter<boolean>();
  toggleClick = new EventEmitter<boolean>();

  /**
   * Content to be displayed as popover.
   */
  // tslint:disable:no-any
  dropdownMenu: Promise<BsComponentRef<any>>;
  resolveDropdownMenu: (componentRef: BsComponentRef<any>) => void;

  constructor() {
    this.dropdownMenu = new Promise(resolve => {
      this.resolveDropdownMenu = resolve;
    });
  }
}
