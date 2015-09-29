/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, ElementRef, Host, OnInit;
import "dropdown.dart" show Dropdown;

@Directive (selector: "[dropdown-toggle]",
    properties: const [ "disabled"],
    host: const {
      "(click)" : "toggleDropdown(\$event)",
      "[class.dropdown-toggle]" : "true",
      "[class.disabled]" : "disabled",
      "[attr.aria-haspopup]" : "true",
      "[attr.aria-expanded]" : "isOpen"
    })
class DropdownToggle implements OnInit {
  Dropdown dropdown;

  ElementRef el;

  bool disabled = false;

  DropdownToggle(@Host () this .dropdown, this .el) {}

  onInit() {
    this.dropdown.dropDownToggle = this;
  }

  get isOpen {
    return this.dropdown.isOpen;
  }

  toggleDropdown(MouseEvent event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.dropdown.toggle();
    }
  }
}