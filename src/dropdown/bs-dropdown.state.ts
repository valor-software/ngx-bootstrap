import { Injectable } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { Subject } from 'rxjs';

@Injectable()
export class BsDropdownState {
  direction: 'down' | 'up' = 'down';
  autoClose: boolean;
  insideClick: boolean;
  isOpenChange = new Subject<boolean>();
  isDisabledChange = new Subject<boolean>();
  toggleClick = new Subject<boolean>();

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
