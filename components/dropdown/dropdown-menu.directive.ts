import {
  Directive, ElementRef, Host,
  OnInit
} from 'angular2/core';

import {Dropdown} from './dropdown.directive';

@Directive({ selector: '[dropdownMenu]' })
export class DropdownMenu implements OnInit {
  constructor( @Host() public dropdown: Dropdown, public el: ElementRef) {
  }

  public ngOnInit() {
    this.dropdown.dropDownMenu = this;
  }
}
