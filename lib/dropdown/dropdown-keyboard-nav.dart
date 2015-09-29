/// <reference path="../../tsd.d.ts" />
import "package:angular2/angular2.dart" show Directive, ElementRef;
import "dropdown.dart" show Dropdown;

@Directive (selector: "[dropdown][keyboard-nav]",
    host: const { "(keydown)" : "onKeydown(\$event)"})
class KeyboardNav {
  Dropdown dd;

  ElementRef el;

  KeyboardNav(this .dd, this .el) {
    console.warn("keyboard-nav deprecated");
    dd.keyboardNav = true;
  }

  onKeydown(KeyboardEvent event) {
    if (!identical(event.which, 40) && !identical(event.which, 38)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    var elems = this.dd.menuEl.nativeElement.getElementsByTagName("a");
    switch (event.which) {
      case (40) :
        if (!identical(, "number")) {
          this.dd.selectedOption = 0;
          break;
        }
        if (identical(this.dd.selectedOption, elems.length - 1)) {
          break;
        }
        this.dd.selectedOption ++;
        break;
      case (38) :
        if (!identical(, "number")) {
          return;
        }
        if (identical(this.dd.selectedOption, 0)) {
          // todo: return?
          break;
        }
        this.dd.selectedOption --;
        break;
    }
    elems [ this.dd.selectedOption ].nativeElement.focus();
  }
}