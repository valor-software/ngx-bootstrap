part of ns_dropdown;

@Directive (selector: "[dropdown]",
    inputs: const [
      "isOpen", "autoClose", "keyboardNav", "dropdownAppendToBody"],
    outputs: const ["onToggle"],
    host: const { "[class.dropdown]" : "true", "[class.open]" : "isOpen"})
class Dropdown implements OnInit, OnDestroy {
  ElementRef el;

  bool _isOpen = false;

  // enum string: ['always', 'outsideClick', 'disabled']
  bool dropdownAppendToBody = false;

  EventEmitter onToggle = new EventEmitter ();

  String autoClose = ALWAYS;

  bool keyboardNav = false;

  // index of selected element
  num selectedOption;

  // drop menu html
  ElementRef menuEl;

  // drop down toggle element
  ElementRef toggleEl;

  // not implemented:
  String dropdownMenuTemplateUrl;

  Dropdown(this .el);

  onInit() {
//    this.autoClose ?? ALWAYS;
//    this.keyboardNav ?? true;
//    this.dropdownAppendToBody ?? true;
//    if (this.isOpen) {}
  }

  onDestroy() {
    if (this.dropdownAppendToBody && truthy(this.menuEl)) {
      this.menuEl.nativeElement.remove();
    }
  }

  set dropDownMenu(DropdownMenuInterface dropdownMenu) {
    // init drop down menu
    this.menuEl = dropdownMenu.el;
    if (truthy(dropdownMenu.templateUrl)) {
      this.dropdownMenuTemplateUrl = dropdownMenu.templateUrl;
    }
    if (this.dropdownAppendToBody) {
      window.document.documentElement.children.add(this.menuEl.nativeElement);
    }
  }

  set dropDownToggle(DropdownToggleInterface dropdownToggle) {
    // init toggle element
    this.toggleEl = dropdownToggle.el;
  }

  bool toggle([ bool open ]) {
    return isOpen = open ?? !isOpen;
  }

  bool get isOpen {
    return this._isOpen;
  }

  set isOpen(value) {
    this._isOpen = value ?? false;
    // todo: implement after porting position
    if (truthy(this.dropdownAppendToBody) && truthy(this.menuEl)) {}
    // todo: $animate open<->close transitions, as soon as ng2Animate will be ready
    if (isOpen) {
      if (truthy(this.dropdownMenuTemplateUrl)) {
        // todo: implement template url option
      }
      this.focusToggleElement();
      dropdownService.open(this);
    } else {
      if (truthy(this.dropdownMenuTemplateUrl)) {
        // todo: implement template url option
      }
      dropdownService.close(this);
      this.selectedOption = null;
    }
    this.onToggle.add(this.isOpen);
    // todo: implement call to setIsOpen if set and function
  }

  focusDropdownEntry(num keyCode) {
    // If append to body is used.
    Element hostEl = this.menuEl?.nativeElement ?? this.el.nativeElement.querySelectorAll("ul")[0];
    if (hostEl == null) {
      // todo: throw exception?
      return;
    }
    var elems = hostEl.querySelectorAll("a");
    if (elems == null || elems.isEmpty) {
      // todo: throw exception?
      return;
    }
    // todo: use parseInt to detect isNumber?

    // todo: or implement selectedOption as a get\set pair with parseInt on set
    switch (keyCode) {
      case (40) :
        if (selectedOption is! num) {
          this.selectedOption = 0;
          break;
        }
        if (identical(this.selectedOption, elems.length - 1)) {
          break;
        }
        this.selectedOption ++;
        break;
      case (38) :
        if (selectedOption is! num) {
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
    if (truthy(this.toggleEl)) {
      this.toggleEl.nativeElement.focus();
    }
  }
}