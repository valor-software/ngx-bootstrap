part of ns_dropdown;

@Directive (selector: "[dropdown-menu], .dropdown-menu",
    inputs: const [ "templateUrl"])
class DropdownMenu implements DropdownMenuInterface, OnInit {
  Dropdown dropdown;

  ElementRef el;

  String templateUrl;

  DropdownMenu(@Host () this .dropdown, this .el) {}

  ngOnInit() {
    dropdown.dropDownMenu = this;
  }
}