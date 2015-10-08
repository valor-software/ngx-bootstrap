/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart";
import "dropdown.dart";
import 'package:ng2-strap/dropdown/dropdown.interfaces.dart';

@Directive (selector: "[dropdown-menu], .dropdown-menu",
    inputs: const [ "templateUrl"])
class DropdownMenu implements DropdownMenuInterface, OnInit {
  Dropdown dropdown;

  ElementRef el;

  String templateUrl;

  DropdownMenu(@Host () this .dropdown, this .el) {}

  onInit() {
    dropdown.dropDownMenu = this;
  }
}