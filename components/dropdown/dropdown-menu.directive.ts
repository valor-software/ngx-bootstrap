import {Directive, ElementRef, Host, OnInit} from 'angular2/core';
import {Dropdown} from './dropdown.directive';

@Directive({selector: '[dropdownMenu]'})
export class DropdownMenu implements OnInit {
  public dropdown:Dropdown;
  public el:ElementRef;
  public constructor(@Host() dropdown:Dropdown, el:ElementRef) {
    this.dropdown = dropdown;
    this.el = el;
  }

  public ngOnInit():void {
    this.dropdown.dropDownMenu = this;
  }
}
