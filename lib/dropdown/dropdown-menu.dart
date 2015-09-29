/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, ElementRef, Host, OnInit;
import "dropdown.dart" show Dropdown;

@Directive (selector: "[dropdown-menu], .dropdown-menu",
    properties: const [ "templateUrl"])
class DropdownMenu implements OnInit {
  Dropdown dropdown;

  ElementRef el;

  String templateUrl;

  DropdownMenu(@Host () this .dropdown, this .el) {}

  onInit() {
    this.dropdown.dropDownMenu = this;
  }
}