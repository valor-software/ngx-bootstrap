/// <reference path="../../../tsd.d.ts" />
import "package:angular2/angular2.dart" show Component, View, CORE_DIRECTIVES;
import "../../../lib/index.dart" show dropdown;

// webpack html imports
var template = require("./dropdown-demo.html");

@Component(selector: "dropdown-demo")
@View(template: template, directives: const [dropdown, CORE_DIRECTIVES])
class DropdownDemo {
  bool disabled = false;
  dynamic status = {"isopen": false};
  Array<String> items = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
  void toggled(bool open) {
    console.log("Dropdown is now: ", open);
  }

  void toggleDropdown(MouseEvent $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
