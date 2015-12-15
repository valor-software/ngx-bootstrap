import {
  Directive, ElementRef, Host,
  OnInit, Input, HostBinding, HostListener
} from 'angular2/core';

import {Dropdown} from './dropdown';

@Directive({ selector: '[dropdown-toggle]' })
export class DropdownToggle implements OnInit {
  @HostBinding('class.disabled')
  @Input() private disabled:boolean = false;

  @HostBinding('class.dropdown-toggle')
  @HostBinding('attr.aria-haspopup')
  private addClass = true;

  constructor(@Host() public dropdown:Dropdown, public el:ElementRef) {
  }

  public ngOnInit() {
    this.dropdown.dropDownToggle = this;
  }

  @HostBinding('attr.aria-expanded')
  public get isOpen() {
    return this.dropdown.isOpen;
  }

  @HostListener('click', ['$event'])
  public toggleDropdown(event:MouseEvent) {
    event.stopPropagation();

    if (!this.disabled) {
      this.dropdown.toggle();
    }
    return false;
  }
}
