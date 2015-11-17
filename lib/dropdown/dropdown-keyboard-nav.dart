part of ns_dropdown;

@Directive (selector: "[dropdown][keyboard-nav]",
    host: const { "(keydown)" : "onKeydown(\$event)"})
class KeyboardNav {
  Dropdown dd;

  ElementRef el;

  KeyboardNav(this .dd, this .el) {
    print("keyboard-nav deprecated");
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
        if (dd.selectedOption is! num) {
          this.dd.selectedOption = 0;
          break;
        }
        if (identical(this.dd.selectedOption, elems.length - 1)) {
          break;
        }
        this.dd.selectedOption ++;
        break;
      case (38) :
        if (dd.selectedOption is! num) {
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