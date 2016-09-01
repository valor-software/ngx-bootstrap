import { Directive, ElementRef, Host, HostBinding, OnInit } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';

@Directive({
  selector: '[dropdownMenu]',
  exportAs: 'bs-dropdown-menu'
})
export class DropdownMenuDirective implements OnInit {
  public dropdown:DropdownDirective;
  public el:ElementRef;

  /* tslint:disable:no-unused-variable */
  @HostBinding('class.dropdown-menu')
  public addClass:boolean = true;
  /* tslint:enable:no-unused-variable */

  public constructor(@Host() dropdown:DropdownDirective, el:ElementRef) {
    this.dropdown = dropdown;
    this.el = el;
  }

  public ngOnInit():void {
    this.dropdown.dropDownMenu = this;
  }
}
