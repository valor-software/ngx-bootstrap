/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart"
    show Directive, OnInit, OnDestroy, EventEmitter, ElementRef;
import "dropdown.interfaces.dart"
    show DropdownMenuInterface, DropdownToggleInterface;
import "dropdown-service.dart" show dropdownService, ALWAYS;

@Directive (selector: "[dropdown]",
    properties: const [
      "isOpen", "autoClose", "keyboardNav", "dropdownAppendToBody"],
    events: const [ "onToggle"],
    host: const { "[class.dropdown]" : "true", "[class.open]" : "isOpen"})
class Dropdown implements OnInit, OnDestroy {
  ElementRef el;

  bool _isOpen;

  // enum string: ['always', 'outsideClick', 'disabled']
  bool dropdownAppendToBody;

  EventEmitter onToggle = new EventEmitter ();

  String autoClose;

  bool keyboardNav;

  // index of selected element
  num selectedOption;

  // drop menu html
  ElementRef menuEl;

  // drop down toggle element
  ElementRef toggleEl;

  // not implemented:
  String dropdownMenuTemplateUrl;

  Dropdown(this .el) {}

  onInit() {
    this.autoClose = this.autoClose || ALWAYS;
    this.keyboardNav = !identical(, "undefined");
    this.dropdownAppendToBody = !identical(, "undefined");
    if (this.isOpen) {}
  }

  onDestroy() {
    if (this.dropdownAppendToBody && this.menuEl) {
      this.menuEl.nativeElement.remove();
    }
  }

  set dropDownMenu(DropdownMenuInterface dropdownMenu) {
    // init drop down menu
    this.menuEl = dropdownMenu.el;
    if (dropdownMenu.templateUrl) {
      this.dropdownMenuTemplateUrl = dropdownMenu.templateUrl;
    }
    if (this.dropdownAppendToBody) {
      window.document.body.appendChild(this.menuEl.nativeElement);
    }
  }

  set dropDownToggle(DropdownToggleInterface dropdownToggle) {
    // init toggle element
    this.toggleEl = dropdownToggle.el;
  }

  bool toggle([ bool open ]) {
    return this.isOpen = arguments.length ? ! !open : !this.isOpen;
  }

  bool get isOpen {
    return this._isOpen;
  }

  set isOpen(value) {
    this._isOpen = ! !value;
    // todo: implement after porting position
    if (this.dropdownAppendToBody && this.menuEl) {}
    // todo: $animate open<->close transitions, as soon as ng2Animate will be ready
    if (this.isOpen) {
      if (this.dropdownMenuTemplateUrl) {}
      this.focusToggleElement();
      dropdownService.open(this);
    } else {
      if (this.dropdownMenuTemplateUrl) {}
      dropdownService.close(this);
      this.selectedOption = null;
    }
    this.onToggle.next(this.isOpen);
  }

  focusDropdownEntry(num keyCode) {
    // If append to body is used.
    var hostEl = this.menuEl ? this.menuEl.nativeElement : this.el.nativeElement
        .getElementsByTagName("ul") [ 0 ];
    if (!hostEl) {
      // todo: throw exception?
      return;
    }
    var elems = hostEl.getElementsByTagName("a");
    if (!elems || !elems.length) {
      // todo: throw exception?
      return;
    }
    // todo: use parseInt to detect isNumber?

    // todo: or implement selectedOption as a get\set pair with parseInt on set
    switch (keyCode) {
      case (40) :
        if (!identical(, "number")) {
          this.selectedOption = 0;
          break;
        }
        if (identical(this.selectedOption, elems.length - 1)) {
          break;
        }
        this.selectedOption ++;
        break;
      case (38) :
        if (!identical(, "number")) {
          return;
        }
        if (identical(this.selectedOption, 0)) {
          // todo: return?
          break;
        }
        this.selectedOption --;
        break;
    }
    elems [ this.selectedOption ].focus();
  }

  focusToggleElement() {
    if (this.toggleEl) {
      this.toggleEl.nativeElement.focus();
    }
  }
}