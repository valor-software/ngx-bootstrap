import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
  input,
  effect,
  output
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BsComponentRef, ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';

import { BsDropdownConfig } from './bs-dropdown.config';
import { BsDropdownContainerComponent } from './bs-dropdown-container.component';
import { BsDropdownState } from './bs-dropdown.state';
import { BsDropdownMenuDirective } from './index';
import { DROPDOWN_ANIMATION_DURATION_MS, DROPDOWN_ANIMATION_TIMING } from './dropdown-animations';
import { animateExpand } from 'ngx-bootstrap/utils';

@Directive({
  selector: '[bsDropdown], [dropdown]',
  exportAs: 'bs-dropdown',
  providers: [BsDropdownState, ComponentLoaderFactory, BsDropdownConfig],
  standalone: true,
  host: {
    '[class.dropup]': '_dropup',
    '[class.open]': 'isOpen',
    '[class.show]': 'isOpen'
  }
})
export class BsDropdownDirective implements OnInit, OnDestroy {
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  placement = input<string | undefined>();
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  triggers = input<string | undefined>();
  /**
   * A selector specifying the element the popover should be appended to.
   */
  container = input<string | undefined>();

  /**
   * This attribute indicates that the dropdown should be opened upwards
   */
  dropup = input<boolean>(false);

  // Internal resolved value for dropup (for host binding)
  _dropup = false;

  /**
   * Indicates that dropdown will be closed on item or document click,
   * and after pressing ESC
   */
  autoClose = input<boolean | undefined>(undefined);

  /**
   * Indicates that dropdown will be animated
   */
  isAnimated = input<boolean | undefined>(undefined);

  /**
   * This attribute indicates that the dropdown shouldn't close on inside click when autoClose is set to true
   */
  insideClick = input<boolean | undefined>(undefined);

  /**
   * Disables dropdown toggle and hides dropdown menu if opened
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  isDisabledInput = input<boolean>(false, { alias: 'isDisabled' });

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  /**
   * Returns whether or not the popover is currently being shown
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  isOpenInput = input<boolean>(false, { alias: 'isOpen' });

  get isOpen(): boolean {
    if (this._showInline) {
      return this._isInlineOpen;
    }

    return this._dropdown.isShown;
  }

  /**
   * Emits an event when isOpen change
   */
  readonly isOpenChange = output<boolean>();

  /**
   * Emits an event when the popover is shown
   */
  readonly onShown = output<boolean>();

  /**
   * Emits an event when the popover is hidden
   */
  readonly onHidden = output<boolean>();

  private _dropdown: ComponentLoader<BsDropdownContainerComponent>;

  private get _showInline(): boolean {
    return !this.container();
  }

  // todo: move to component loader
  private _isInlineOpen = false;

  private _inlinedMenu?: EmbeddedViewRef<BsDropdownMenuDirective>;
  private _isDisabled = false;
  private _subscriptions: Subscription[] = [];
  private _isInited = false;
  private _cancelExpandAnimation?: () => void;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _viewContainerRef: ViewContainerRef,
    private _cis: ComponentLoaderFactory,
    private _state: BsDropdownState,
    private _config: BsDropdownConfig
  ) {
    // set initial dropdown state from config
    this._state.autoClose = this._config.autoClose;
    this._state.insideClick = this._config.insideClick;
    this._state.isAnimated = this._config.isAnimated;
    this._state.stopOnClickPropagation = this._config.stopOnClickPropagation;

    // create dropdown component loader
    this._dropdown = this._cis
      .createLoader<BsDropdownContainerComponent>(this._elementRef, this._viewContainerRef, this._renderer)
      .provide({ provide: BsDropdownState, useValue: this._state });

    this._dropdown.onShown.subscribe((v: boolean) => this.onShown.emit(v));
    this._dropdown.onHidden.subscribe((v: boolean) => this.onHidden.emit(v));
    this._state.isOpenChange.subscribe((v: boolean) => this.isOpenChange.emit(v));

    // Effect for dropup
    effect(() => {
      this._dropup = this.dropup();
    });

    // Effect for autoClose
    effect(() => {
      const val = this.autoClose();
      if (val !== undefined) {
        this._state.autoClose = val;
      }
    });

    // Effect for isAnimated
    effect(() => {
      const val = this.isAnimated();
      if (val !== undefined) {
        this._state.isAnimated = val;
      }
    });

    // Effect for insideClick
    effect(() => {
      const val = this.insideClick();
      if (val !== undefined) {
        this._state.insideClick = val;
      }
    });

    // Effect for isDisabled
    effect(() => {
      const val = this.isDisabledInput();
      this._isDisabled = val;
      this._state.isDisabledChange.emit(val);
      if (val) {
        this.hide();
      }
    });

    // Effect for isOpen
    effect(() => {
      const val = this.isOpenInput();
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    });
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
      triggers: this.triggers(),
      show: () => this.show()
    });

    // toggle visibility on toggle element click
    this._subscriptions.push(this._state.toggleClick.subscribe((value: boolean) => this.toggle(value)));

    // hide dropdown if set disabled while opened
    this._subscriptions.push(
      this._state.isDisabledChange
        .pipe(filter((value: boolean) => value))
        .subscribe((/*value: boolean*/) => this.hide())
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
        this._state.dropdownMenu
          .then((dropdownMenu: BsComponentRef<BsDropdownMenuDirective>) => {
            this._dropdown.attachInline(dropdownMenu.viewContainer, dropdownMenu.templateRef);
            this._inlinedMenu = this._dropdown._inlineViewRef;

            this.addBs4Polyfills();
            if (this._inlinedMenu) {
              this._renderer.addClass(this._inlinedMenu.rootNodes[0].parentNode, 'open');
            }

            this.playAnimation();
          })
          // swallow errors
          .catch();
      }
      this.addBs4Polyfills();

      this._isInlineOpen = true;
      this.onShown.emit(true);
      this._state.isOpenChange.emit(true);

      this.playAnimation();

      return;
    }
    this._state.dropdownMenu
      .then((dropdownMenu) => {
        // check direction in which dropdown should be opened
        const _dropup = this._dropup || (typeof this._dropup !== 'undefined' && this._dropup);
        this._state.direction = _dropup ? 'up' : 'down';
        const _placement = this.placement() || (_dropup ? 'top start' : 'bottom start');

        // show dropdown
        this._dropdown
          .attach(BsDropdownContainerComponent)
          .to(this.container())
          .position({ attachment: _placement })
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

  /** @internal */
  _contains(event: Event): boolean {
    // handle Event target typing
    if (!(event.target instanceof Node)) {
      return false;
    }
    return (
      this._elementRef.nativeElement.contains(event.target as Node) ||
      (this._dropdown.instance && this._dropdown.instance._contains(event.target as unknown as HTMLElement))
    );
  }

  @HostListener('keydown.arrowDown', ['$event'])
  @HostListener('keydown.arrowUp', ['$event'])
  navigationClick(event: Event): void {
    const ke = event as KeyboardEvent;
    const ref = this._elementRef.nativeElement.querySelector('.dropdown-menu');

    if (!ref) {
      return;
    }

    const firstActive = this._elementRef.nativeElement.ownerDocument.activeElement;
    const allRef = ref.querySelectorAll('.dropdown-item');
    switch (ke.keyCode) {
      case 38:
        if (this._state.counts > 0) {
          allRef[--this._state.counts].focus();
        }
        break;
      case 40:
        if (this._state.counts + 1 < allRef.length) {
          if (firstActive.classList !== allRef[this._state.counts].classList) {
            allRef[this._state.counts].focus();
          } else {
            allRef[++this._state.counts].focus();
          }
        }
        break;
      default:
    }
    if ('preventDefault' in ke) {
      ke.preventDefault();
    }
  }

  ngOnDestroy(): void {
    // clean up subscriptions and destroy dropdown
    for (const sub of this._subscriptions) {
      sub.unsubscribe();
    }
    this._cancelExpandAnimation?.();
    this._dropdown.dispose();
  }

  private addBs4Polyfills(): void {
    this.addShowClass();
    this.checkRightAlignment();
    this.addDropupStyles();
  }

  private playAnimation(): void {
    if (this._state.isAnimated && this._inlinedMenu) {
      const el = this._inlinedMenu.rootNodes[0] as HTMLElement;
      if (!el) {
        return;
      }
      this._cancelExpandAnimation?.();
      this._cancelExpandAnimation = animateExpand(this._renderer, el, {
        timing: DROPDOWN_ANIMATION_TIMING,
        durationMs: DROPDOWN_ANIMATION_DURATION_MS,
        useRaf: true,
        manageDisplay: true
      });
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
      const isRightAligned =
        this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-right') ||
        this._inlinedMenu.rootNodes[0].classList.contains('dropdown-menu-end');

      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'left', isRightAligned ? 'auto' : '0');
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'right', isRightAligned ? '0' : 'auto');
    }
  }

  private addDropupStyles(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      // a little hack to not break support of bootstrap 4 beta
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'top', this.dropup() ? 'auto' : '100%');
      this._renderer.setStyle(
        this._inlinedMenu.rootNodes[0],
        'transform',
        this.dropup() ? 'translateY(-101%)' : 'translateY(0)'
      );
      this._renderer.setStyle(this._inlinedMenu.rootNodes[0], 'bottom', 'auto');
    }
  }

  private removeDropupStyles(): void {
    if (this._inlinedMenu && this._inlinedMenu.rootNodes[0]) {
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'top');
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'transform');
      this._renderer.removeStyle(this._inlinedMenu.rootNodes[0], 'bottom');
    }
  }
}
