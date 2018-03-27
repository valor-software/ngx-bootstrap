// tslint:disable:max-file-line-count
import {
  Directive, ElementRef, EmbeddedViewRef, EventEmitter, Input, OnDestroy,
  OnInit, Output, Renderer2, ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { ComponentLoader, ComponentLoaderFactory } from '../component-loader/index';

import { BsDropdownConfig } from './bs-dropdown.config';
import { BsDropdownContainerComponent } from './bs-dropdown-container.component';
import { BsDropdownState } from './bs-dropdown.state';
import { BsComponentRef } from '../component-loader/bs-component-ref.class';
import { BsDropdownMenuDirective } from './';
import { isBs3 } from '../utils/theme-provider';

@Directive({
  selector: '[bsDropdown],[dropdown]',
  exportAs: 'bs-dropdown',
  providers: [BsDropdownState],
  host: {
    '[class.dropup]': 'dropup',
    '[class.open]': 'isOpen',
    '[class.show]': 'isOpen && isBs4'
  }
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
  @Input()
  set autoClose(value: boolean) {
    this._state.autoClose = value;
  }

  get autoClose(): boolean {
    return this._state.autoClose;
  }

  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  @Input()
  set isDisabled(value: boolean) {
    this._isDisabled = value;
    this._state.isDisabledChange.emit(value);
    if (value) {
      this.hide();
    }
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  /**
   * Returns whether or not the popover is currently being shown
   */
  @Input()
  get isOpen(): boolean {
    if (this._showInline) {
      return this._isInlineOpen;
    }

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
   * Emits an event when isOpen change
   */
  @Output() isOpenChange: EventEmitter<any>;

  /**
   * Emits an event when the popover is shown
   */
  @Output() onShown: EventEmitter<any>;

  /**
   * Emits an event when the popover is hidden
   */
  @Output() onHidden: EventEmitter<any>;

  get isBs4(): boolean {
    return !isBs3();
  }

  // todo: move to component loader
  private _isInlineOpen = false;

  private get _showInline(): boolean {
    return !this.container;
  }

  private _inlinedMenu: EmbeddedViewRef<BsDropdownMenuDirective>;

  private _isDisabled: boolean;
  private _dropdown: ComponentLoader<BsDropdownContainerComponent>;
  private _subscriptions: Subscription[] = [];
  private _isInited = false;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2,
              private _viewContainerRef: ViewContainerRef,
              private _cis: ComponentLoaderFactory,
              private _config: BsDropdownConfig,
              private _state: BsDropdownState) {
    // set initial dropdown state from config
    this._state.autoClose = this._config.autoClose;

    // create dropdown component loader
    this._dropdown = this._cis
      .createLoader<BsDropdownContainerComponent>(
        this._elementRef,
        this._viewContainerRef,
        this._renderer
      )
      .provide({provide: BsDropdownState, useValue: this._state});

    this.onShown = this._dropdown.onShown;
    this.onHidden = this._dropdown.onHidden;
    this.isOpenChange = this._state.isOpenChange;

  }

  ngOnInit(): void {
    // fix: seems there are an issue with `routerLinkActive`
    // which result in duplicated call ngOnInit without call to ngOnDestroy
    // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
    if (this._isInited) {
      return;
    }
    this._isInited = true;

    // attach DOM listeners
    this._dropdown.listen({
      // because of dropdown inline mode
      outsideClick: false,
      triggers: this.triggers,
      show: () => this.show()
    });

    // toggle visibility on toggle element click
    this._subscriptions.push(
      this._state.toggleClick.subscribe((value: boolean) => this.toggle(value))
    );

    // hide dropdown if set disabled while opened
    this._subscriptions.push(
      this._state.isDisabledChange
        .filter((value: boolean) => value)
        .subscribe((value: boolean) => this.hide())
    );
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show(): void {
    if (this.isOpen || this.isDisabled) {
      return;
    }

    if (this._showInline) {
      if (!this._inlinedMenu) {
        this._state.dropdownMenu.then(
          (dropdownMenu: BsComponentRef<BsDropdownMenuDirective>) => {
            this._dropdown.attachInline(
              dropdownMenu.viewContainer,
              dropdownMenu.templateRef
            );
            this._inlinedMenu = this._dropdown._inlineViewRef;
            this.addBs4Polyfills();
          }
        )
        // swallow errors
          .catch();
      }
      this.addBs4Polyfills();
      this._isInlineOpen = true;
      this.onShown.emit(true);
      this._state.isOpenChange.emit(true);

      return;
    }
    this._state.dropdownMenu.then(dropdownMenu => {
      // check direction in which dropdown should be opened
      const _dropup =
        this.dropup ||
        (typeof this.dropup !== 'undefined' && this.dropup);
      this._state.direction = _dropup ? 'up' : 'down';
      const _placement =
        this.placement || (_dropup ? 'top left' : 'bottom left');

      // show dropdown
      this._dropdown
        .attach(BsDropdownContainerComponent)
        .to(this.container)
        .position({attachment: _placement})
        .show({
          content: dropdownMenu.templateRef,
          placement: _placement
        });

      this._state.isOpenChange.emit(true);
    })
    // swallow error
      .catch();
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide(): void {
    if (!this.isOpen) {
      return;
    }

    if (this._showInline) {
      this.removeShowClass();
      this.removeDropupStyles();
      this._isInlineOpen = false;
      this.onHidden.emit(true);
    } else {
      this._dropdown.hide();
    }

    this._state.isOpenChange.emit(false);
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover. With parameter <code>true</code> allows toggling, with parameter <code>false</code>
   * only hides opened dropdown. Parameter usage will be removed in ngx-bootstrap v3
   */
  toggle(value?: boolean): void {
    if (this.isOpen || !value) {
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

  private addBs4Polyfills(): void {
    if (!isBs3()) {
      this.addShowClass();
      this.checkRightAlignment();
      this.addDropupStyles();
    }
  }

  private addShowClass(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.addClass(this._inlinedMenu.rootNodes[0], 'show');
    }
  }

  private removeShowClass(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeClass(this._inlinedMenu.rootNodes[0], 'show');
    }
  }

  private checkRightAlignment(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      const isRightAligned = this._inlinedMenu.rootNodes[0].classList.contains(
        'dropdown-menu-right'
      );
      this._renderer.setStyle(
        this._inlinedMenu.rootNodes[0],
        'left',
        isRightAligned ? 'auto' : '0'
      );
      this._renderer.setStyle(
        this._inlinedMenu.rootNodes[0],
        'right',
        isRightAligned ? '0' : 'auto'
      );
    }
  }

  private addDropupStyles(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      // a little hack to not break support of bootstrap 4 beta
      this._renderer.setStyle(
        this._inlinedMenu.rootNodes[0],
        'top',
        this.dropup ? 'auto' : '100%'
      );
      this._renderer.setStyle(
        this._inlinedMenu.rootNodes[0],
        'transform',
        this.dropup ? 'translateY(-101%)' : 'translateY(0)'
      );
    }
  }

  private removeDropupStyles(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'top');
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'transform');
    }
  }
}
