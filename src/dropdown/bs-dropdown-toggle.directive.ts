import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs';

import { BsDropdownState } from './bs-dropdown.state';
import { BsDropdownDirective } from './bs-dropdown.directive';

@Directive({
  selector: '[bsDropdownToggle],[dropdownToggle]',
  exportAs: 'bs-dropdown-toggle',
  host: {
    '[attr.aria-haspopup]': 'true'
  }
})
export class BsDropdownToggleDirective implements OnDestroy, OnInit {
  @HostBinding('attr.disabled') isDisabled: boolean | null = null;

  // @HostBinding('class.active')
  @HostBinding('attr.aria-expanded') isOpen: boolean;

  private _subscriptions: Subscription[] = [];
  private _unlisten: Function;

  constructor(private _state: BsDropdownState,
              private _element: ElementRef,
              private _zone: NgZone,
              private _renderer: Renderer2,
              private dropdown: BsDropdownDirective) {
    // sync is open value with state
    this._subscriptions.push(
      this._state.isOpenChange.subscribe(
        (value: boolean) => (this.isOpen = value)
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
    this._state.toggleClick.next(true);
  }
  onDocumentClick(event: MouseEvent): void {
    if (
      this._state.autoClose &&
      event.button !== 2 &&
      !this._element.nativeElement.contains(event.target) &&
      !(this._state.insideClick && this.dropdown._contains(event))
    ) {
      this._state.toggleClick.next(false);
    }
  }

  @HostListener('keyup.esc')
  onEsc(): void {
    if (this._state.autoClose) {
      this._state.toggleClick.next(false);
    }
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      this._unlisten = this._renderer.listen('document', 'click', (event: MouseEvent) => this.onDocumentClick(event));
    });
  }

  ngOnDestroy(): void {
    if (this._unlisten) {
      this._zone.runOutsideAngular(() => this._unlisten());
    }
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
  }
}
