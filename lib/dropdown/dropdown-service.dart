import "dropdown.dart" show Dropdown;
import 'dart:html';

const ALWAYS = "always";

const DISABLED = "disabled";

const OUTSIDECLICK = "outsideClick";

class DropdownService {
  Dropdown openScope;

  Dropdown dropdownScope;

  EventListener closeDropdownBind = this.closeDropdown.bind(this);

  EventListener keybindFilterBind = this.keybindFilter.bind(this);

  open(Dropdown dropdownScope) {
    if (!this.openScope) {
      window.document.addEventListener("click", this.closeDropdownBind);
      window.document.addEventListener("keydown", this.keybindFilterBind);
    }
    if (this.openScope && !identical(this.openScope, this.dropdownScope)) {
      this.openScope.isOpen = false;
    }
    this.openScope = dropdownScope;
  }

  close(Dropdown dropdownScope) {
    if (!identical(this.openScope, dropdownScope)) {
      return;
    }
    this.openScope = null;
    window.document.removeEventListener("click", this.closeDropdownBind);
    window.document.removeEventListener("keydown", this.keybindFilterBind);
  }

  closeDropdown(MouseEvent event) {
    if (!this.openScope) {
      return;
    }
    if (event && identical(this.openScope.autoClose, DISABLED)) {
      return;
    }
    if (event && this.openScope.toggleEl &&
        identical(this.openScope.toggleEl.nativeElement, event.target)) {
      return;
    }
    if (event && identical(this.openScope.autoClose, OUTSIDECLICK) &&
        this.openScope.menuEl &&
        identical(this.openScope.menuEl.nativeElement, event.target)) {
      return;
    }
    this.openScope.isOpen = false;
  }

  keybindFilter(KeyboardEvent event) {
    if (identical(event.which, 27)) {
      this.openScope.focusToggleElement();
      this.closeDropdown(null);
      return;
    }
    if (this.openScope.keyboardNav && this.openScope.isOpen &&
        (identical(event.which, 38) || identical(event.which, 40))) {
      event.preventDefault();
      event.stopPropagation();
      this.openScope.focusDropdownEntry(event.which);
    }
  }
}

var dropdownService = new DropdownService ();