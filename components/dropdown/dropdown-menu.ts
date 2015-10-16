import {Directive, ElementRef, Host, OnInit} from 'angular2/angular2';
import {Dropdown} from './dropdown';

@Directive({
  selector: '[dropdown-menu], .dropdown-menu',
  properties: ['templateUrl']
})
export class DropdownMenu implements OnInit {
  public templateUrl:string;

  constructor(@Host() public dropdown:Dropdown, public el:ElementRef) {
  }

  onInit() {
    this.dropdown.dropDownMenu = this;
  }
}
