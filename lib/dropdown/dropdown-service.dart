import "dropdown.dart" show Dropdown;
import 'dart:html';
import 'dart:async';

const ALWAYS = "always";

const DISABLED = "disabled";

const OUTSIDECLICK = "outsideClick";

class DropdownService {
  Dropdown openScope;

  Dropdown dropdownScope;

  StreamSubscription closeDropdownStSub;

  StreamSubscription keybindFilterStSub;

  open(Dropdown dropdownScope) {
    if (openScope == null) {
      closeDropdownStSub = window.onClick.listen(closeDropdown);
      keybindFilterStSub = window.onKeyDown.listen(keybindFilter);
    }
    if (openScope != null && openScope != dropdownScope) {
      openScope.isOpen = false;
    }
    openScope = dropdownScope;
  }

  close(Dropdown dropdownScope) {
    if (openScope != dropdownScope) {
      return;
    }
    openScope = null;
    closeDropdownStSub.cancel();
    keybindFilterStSub.cancel();
  }

  closeDropdown(MouseEvent event) {
    if (openScope == null) {
      return;
    }
    if (event != null && identical(openScope.autoClose, DISABLED)) {
      return;
    }
    if (event != null
        && openScope.toggleEl != null
        && openScope.toggleEl.nativeElement == event.target) {
      return;
    }
    if (event != null && openScope.autoClose == OUTSIDECLICK &&
        openScope.menuEl != null &&
        openScope.menuEl.nativeElement == event.target) {
      return;
    }
    openScope.isOpen = false;
  }

  keybindFilter(KeyboardEvent event) {
    if (event.which == KeyCode.ESC) {
      openScope.focusToggleElement();
      closeDropdown(null);
      return;
    }
    if (openScope.keyboardNav && openScope.isOpen &&
        (event.which == KeyCode.UP || event.which == KeyCode.DOWN)) {
      event.preventDefault();
      event.stopPropagation();
      openScope.focusDropdownEntry(event.which);
    }
  }
}

var dropdownService = new DropdownService ();