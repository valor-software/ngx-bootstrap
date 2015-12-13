import {Directive, ElementRef, Host, OnInit, Input} from 'angular2/core';
import {Dropdown} from './dropdown';

@Directive({ selector: '[dropdown-menu]' })
export class DropdownMenu implements OnInit {
  @Input() public templateUrl:string;

  constructor(@Host() public dropdown:Dropdown, public el:ElementRef) {
  }

  ngOnInit() {
    this.dropdown.dropDownMenu = this;
  }
}
