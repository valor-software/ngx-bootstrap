import {Directive, ElementRef, Host, OnInit} from 'angular2/angular2';

import {Dropdown} from './dropdown';

@Directive({
  selector: '[dropdown-toggle]',
  properties: ['disabled'],
  host: {
    '(click)': 'toggleDropdown($event)',
    '[class.dropdown-toggle]': 'true',
    '[class.disabled]': 'disabled',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-expanded]': 'isOpen'
  }
})
export class DropdownToggle implements OnInit {
  private disabled:boolean = false;

  constructor(@Host() public dropdown:Dropdown, public el:ElementRef) {
  }

  onInit() {
    this.dropdown.dropDownToggle = this;
  }

  get isOpen() {
    return this.dropdown.isOpen;
  }

  toggleDropdown(event:MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      this.dropdown.toggle();
    }
  }
}
