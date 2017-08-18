import {
  Directive, ChangeDetectorRef, ElementRef, HostBinding, HostListener, OnDestroy, Renderer
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BsDropdownState } from './bs-dropdown.state';

@Directive({
  selector: '[bsDropdownToggle],[dropdownToggle]',
  exportAs: 'bs-dropdown-toggle',
  host: {
    '[attr.aria-haspopup]': 'true'
  }
})
export class BsDropdownToggleDirective implements OnDestroy {
  @HostBinding('attr.disabled')
  isDisabled: boolean = null;

  // @HostBinding('class.active')
  @HostBinding('attr.aria-expanded') isOpen: boolean;

  @HostListener('click')
  onClick(): void {
    if (this.isDisabled) {
      return;
    }
    this._state.toggleClick.emit();
  }

  private _subscriptions: Subscription[] = [];
  private _documentClickListener: Function;
  private _escKeyUpListener: Function;

  constructor(private _state: BsDropdownState,
              private _cd: ChangeDetectorRef,
              private _element: ElementRef,
              private _renderer: Renderer) {
    // sync is open value with state
    this._subscriptions.push(this._state
      .isOpenChange.subscribe((value: boolean) => {
        this.isOpen = value;
        if (value) {
          this._documentClickListener = this._renderer.listenGlobal('document', 'click', (event: any) => {
            if (this._state.autoClose && event.button !== 2 &&
              !this._element.nativeElement.contains(event.target)) {
              this._state.toggleClick.emit(false);
              this._cd.markForCheck();
            }
          });
          this._escKeyUpListener = this._renderer.listen(this._element.nativeElement, 'keyup.esc', () => {
            if (this._state.autoClose) {
              this._state.toggleClick.emit(false);
              this._cd.markForCheck();
            }
          });
        } else {
          this._documentClickListener();
          this._escKeyUpListener();
        }
      }));
    // populate disabled state
    this._subscriptions.push(this._state
      .isDisabledChange
      .subscribe((value: boolean) => this.isDisabled = value || null));
  }

  ngOnDestroy(): void {
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
}
