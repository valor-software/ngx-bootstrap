import {
  Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
  Renderer, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ComponentLoader, ComponentLoaderFactory } from '../component-loader';

import { BsDropdownConfig } from './bs-dropdown.config';
import { BsDropdownContainerComponent } from './bs-dropdown-container.component';
import { BsDropdownState } from './bs-dropdown.state';

@Directive({
  selector: '[bsDropdown],[dropdown]',
  exportAs: 'bs-dropdown',
  providers: [BsDropdownState]
})
export class BsDropdownDirective implements OnInit, OnDestroy {
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement: string;
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() triggers: string;
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;

  /**
   * This attribute indicates that the dropdown should be opened upwards
   */
  @Input() dropup: boolean;

  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  @Input() set autoClose(value: boolean) {
    if (typeof value === 'boolean') {
      this._state.autoClose = value;
    }
  };

  get autoClose(): boolean {
    return this._state.autoClose;
  }

  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  @Input() set isDisabled(value: boolean) {
    this._isDisabled = value;
    this._state.isDisabledChange.emit(value);
    if (value) {
      this.hide();
    }
  }

  get isDisabled(): boolean { return this._isDisabled; }

  /**
   * Returns whether or not the popover is currently being shown
   */
  @Input() get isOpen(): boolean {
    return this._dropdown.isShown;
  }

  set isOpen(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Emits an event when the popover is shown
   */
  @Output() onShown: EventEmitter<any>;
  /**
   * Emits an event when the popover is hidden
   */
  @Output() onHidden: EventEmitter<any>;

  private _isDisabled: boolean;
  private _dropdown: ComponentLoader<BsDropdownContainerComponent>;
  private _subscriptions: Subscription[] = [];

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer,
              private _viewContainerRef: ViewContainerRef,
              private _cis: ComponentLoaderFactory,
              private _config: BsDropdownConfig,
              private _state: BsDropdownState) {
    // create dropdown component loader
    this._dropdown = this._cis
      .createLoader<BsDropdownContainerComponent>(this._elementRef, this._viewContainerRef, this._renderer)
      .provide({provide: BsDropdownState, useValue: this._state});

    this.onShown = this._dropdown.onShown;
    this.onHidden = this._dropdown.onHidden;
  }

  ngOnInit(): void {
    // attach DOM listeners
    this._dropdown.listen({
      triggers: this.triggers,
      show: () => this.show()
    });

    // set initial dropdown state from config
    this._state.autoClose = this._config.autoClose;

    // toggle visibility on toggle element click
    this._subscriptions.push(this._state
      .toggleClick.subscribe((value: boolean) => this.toggle(value)));

    // hide dropdown if set disabled while opened
    this._subscriptions.push(this._state
      .isDisabledChange
      .filter((value: boolean) => value === true)
      .subscribe((value: boolean) => this.hide()));
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show(): void {
    if (this._dropdown.isShown || this.isDisabled) {
      return;
    }

    this._state.dropdownMenu
      .then((dropdownMenu) => {
        // check direction in which dropdown should be opened
        this.dropup = typeof this.dropup !== 'undefined' || this.dropup;
        this._state.direction = this.dropup ? 'up' : 'down';
        if (!this.placement) {
          this.placement = this.dropup ? 'top left' : 'bottom left';
        }

        // show dropdown
        this._dropdown
          .attach(BsDropdownContainerComponent)
          .to(this.container)
          .position({attachment: this.placement})
          .show({
            content: dropdownMenu,
            placement: this.placement
          });

        this._state.isOpenChange.emit(true);
      });
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide(): void {
    if (!this.isOpen) {
      return;
    }

    this._dropdown.hide();
    this._state.isOpenChange.emit(false);
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  toggle(value?: boolean): void {
    if (this.isOpen || value === false) {
      return this.hide();
    }

    return this.show();
  }

  ngOnDestroy(): void {
    // clean up subscriptions and destroy dropdown
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
    this._dropdown.dispose();
  }
}
