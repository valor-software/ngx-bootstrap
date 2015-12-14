part of ns_dropdown;

@Directive (selector: "[dropdown-toggle]",
    inputs: const [ "disabled"],
    host: const {
      "(click)" : "toggleDropdown(\$event)",
      "[class.dropdown-toggle]" : "true",
      "[class.disabled]" : "disabled",
      "[attr.aria-haspopup]" : "true",
      "[attr.aria-expanded]" : "isOpen"
    })
class DropdownToggle implements DropdownToggleInterface, OnInit {
  Dropdown dropdown;

  ElementRef el;

  bool disabled = false;

  DropdownToggle(@Host () this .dropdown, this .el) {}

  ngOnInit() {
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