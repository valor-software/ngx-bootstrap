import {Directive, ElementRef, Host, OnInit} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({selector: '[dropdownMenu]'})
export class DropdownMenuDirective implements OnInit {
  public dropdown:DropdownDirective;
  public el:ElementRef;
  public constructor(@Host() dropdown:DropdownDirective, el:ElementRef) {
    this.dropdown = dropdown;
    this.el = el;
  }

  public ngOnInit():void {
    this.dropdown.dropDownMenu = this;
  }
}
