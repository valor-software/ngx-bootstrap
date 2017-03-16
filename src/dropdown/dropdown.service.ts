import { Injectable } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';

export const ALWAYS = 'always';
export const DISABLED = 'disabled';
export const OUTSIDECLICK = 'outsideClick';
export const NONINPUT = 'nonInput';

@Injectable()
export class DropdownService {
  private openScope:DropdownDirective;

  private closeDropdownBind:EventListener = this.closeDropdown.bind(this);
  private keybindFilterBind:EventListener = this.keybindFilter.bind(this);

  private suspendedEvent: any;

  public open(dropdownScope:DropdownDirective):void {
    if (!this.openScope) {
      window.document.addEventListener('click', this.closeDropdownBind, true);
      window.document.addEventListener('keydown', this.keybindFilterBind);
    }

    if (this.openScope && this.openScope !== dropdownScope) {
      this.openScope.isOpen = false;
    }

    this.openScope = dropdownScope;
  }

  public close(dropdownScope:DropdownDirective):void {
    if (this.openScope !== dropdownScope) {
      return;
    }

    this.openScope = void 0;
    window.document.removeEventListener('click', this.closeDropdownBind, true);
    window.document.removeEventListener('keydown', this.keybindFilterBind);
  }

  public preventEventHandling(): void {
    clearTimeout(this.suspendedEvent);
  }

  protected closeDropdown(event:Event):void {
    this.suspendedEvent = setTimeout(() => {
      if (!this.openScope) {
        return;
      }

      if (event && this.openScope.autoClose === DISABLED) {
        return;
      }

      if (event && this.openScope.toggleEl &&
        this.openScope.toggleEl.nativeElement.contains(event.target)) {
        return;
      }

      if (event && this.openScope.autoClose === NONINPUT &&
        this.openScope.menuEl &&
        /input|textarea/i.test((event.target as any).tagName) &&
        this.openScope.menuEl.nativeElement.contains(event.target)) {
        return;
      }

      if (event && this.openScope.autoClose === OUTSIDECLICK &&
        this.openScope.menuEl &&
        this.openScope.menuEl.nativeElement.contains(event.target)) {
        return;
      }

      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.openScope.isOpen = false;
    }, 0);
  }

  protected keybindFilter(event: any):void {
    if (event.which === 27) {
      this.openScope.focusToggleElement();
      this.closeDropdown(void 0);
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
