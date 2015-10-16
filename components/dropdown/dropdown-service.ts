export const ALWAYS = 'always';
export const DISABLED = 'disabled';
export const OUTSIDECLICK = 'outsideClick';

import {Dropdown} from './dropdown';

export class DropdownService {
  private openScope:Dropdown;
  private dropdownScope:Dropdown;

  private closeDropdownBind:EventListener = this.closeDropdown.bind(this);
  private keybindFilterBind:EventListener = this.keybindFilter.bind(this);

  public open(dropdownScope:Dropdown) {
    if (!this.openScope) {
      window.document.addEventListener('click', this.closeDropdownBind);
      window.document.addEventListener('keydown', this.keybindFilterBind);
    }

    if (this.openScope && this.openScope !== this.dropdownScope) {
      this.openScope.isOpen = false;
    }

    this.openScope = dropdownScope;
  }

  public close(dropdownScope:Dropdown) {
    if (this.openScope !== dropdownScope) {
      return;
    }

    this.openScope = null;
    window.document.removeEventListener('click', this.closeDropdownBind);
    window.document.removeEventListener('keydown', this.keybindFilterBind);
  }

  private closeDropdown(event:MouseEvent) {
    if (!this.openScope) {
      return;
    }

    if (event && this.openScope.autoClose === DISABLED) {
      return;
    }

    if (event && this.openScope.toggleEl &&
      this.openScope.toggleEl.nativeElement === event.target) {
      return;
    }

    if (event && this.openScope.autoClose === OUTSIDECLICK &&
      this.openScope.menuEl &&
      this.openScope.menuEl.nativeElement === event.target) {
      return;
    }

    this.openScope.isOpen = false;
  }

  private keybindFilter(event:KeyboardEvent) {
    if (event.which === 27) {
      this.openScope.focusToggleElement();
      this.closeDropdown(null);
      return;
    }

    if (this.openScope.keyboardNav && this.openScope.isOpen &&
      (event.which === 38 || event.which === 40)) {
      event.preventDefault();
      event.stopPropagation();
      this.openScope.focusDropdownEntry(event.which);
    }
  }
}

export let dropdownService = new DropdownService();
