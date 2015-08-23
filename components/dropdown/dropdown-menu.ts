/// <reference path="../../tsd.d.ts" />

import {Directive, ElementRef, Host, LifecycleEvent} from 'angular2/angular2';
import {Dropdown} from './dropdown';

@Directive({
  selector: '[dropdown-menu], .dropdown-menu',
  host: {
    '[attr.templateUrl]': 'templateUrl'
  },
  lifecycle: [LifecycleEvent.onInit]
})
export class DropdownMenu {
  public templateUrl:string;

  constructor(@Host() public dropdown:Dropdown, public el:ElementRef) {
  }

  onInit() {
    this.dropdown.dropDownMenu = this;
  }
}
