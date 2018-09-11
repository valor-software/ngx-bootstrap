import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs';

import { BsDropdownState } from './bs-dropdown.state';

@Directive({
  selector: '[bsDropdownToggle],[dropdownToggle]',
  exportAs: 'bs-dropdown-toggle',
  host: {
    '[attr.aria-haspopup]': 'true'
  }
})
export class BsDropdownToggleDirective implements OnDestroy {
  @HostBinding('attr.disabled') isDisabled: boolean = null;

  // @HostBinding('class.active')
  @HostBinding('attr.aria-expanded') isOpen: boolean;

  private _subscriptions: Subscription[] = [];
  private _documentClickListener: Function;
  private _escKeyUpListener: Function;

  constructor(private _state: BsDropdownState, private _element: ElementRef, private _renderer: Renderer2) {
    // sync is open value with state
    this._subscriptions.push(
      this._state.isOpenChange.subscribe(
        (value: boolean) => {
          this.isOpen = value;

          if (value) {
            this._documentClickListener = this._renderer.listen('document', 'click', (event: any) => {
              if (this._state.autoClose && event.button !== 2 &&
                !this._element.nativeElement.contains(event.target)) {
                this._state.toggleClick.emit(false);
              }
            });
            this._escKeyUpListener = this._renderer.listen(this._element.nativeElement, 'keyup.esc', () => {
              if (this._state.autoClose) {
                this._state.toggleClick.emit(false);
              }
            });
          } else {
            this._documentClickListener();
            this._escKeyUpListener();
          }
        }
      )
    );
    // populate disabled state
    this._subscriptions.push(
      this._state.isDisabledChange.subscribe(
        (value: boolean) => (this.isDisabled = value || null)
      )
    );
  }

  @HostListener('click', [])
  onClick(): void {
    if (this.isDisabled) {
      return;
    }
    this._state.toggleClick.emit(true);
  }

  ngOnDestroy(): void {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
}
