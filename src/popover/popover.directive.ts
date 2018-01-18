import {
  Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
  Renderer2, TemplateRef, ViewContainerRef
} from '@angular/core';
import { PopoverConfig } from './popover.config';
import { ComponentLoader, ComponentLoaderFactory } from '../component-loader/index';
import { PopoverContainerComponent } from './popover-container.component';

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
@Directive({selector: '[popover]', exportAs: 'bs-popover'})
export class PopoverDirective implements OnInit, OnDestroy {
  /**
   * Content to be displayed as popover.
   */
  @Input() popover: string | TemplateRef<any>;
  /**
   * Context to be used if popover is a template.
   */
  @Input() popoverContext: any;
  /**
   * Title of a popover.
   */
  @Input() popoverTitle: string;
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /**
   * Close popover on outside click
   */
  @Input() outsideClick = false;
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
   * Css class for popover container
   */
  @Input() containerClass = '';

  /**
   * Returns whether or not the popover is currently being shown
   */
  @Input()
  get isOpen(): boolean {
    return this._popover.isShown;
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

  private _popover: ComponentLoader<PopoverContainerComponent>;
  private _isInited = false;

  constructor(_elementRef: ElementRef,
              _renderer: Renderer2,
              _viewContainerRef: ViewContainerRef,
              _config: PopoverConfig,
              cis: ComponentLoaderFactory) {
    this._popover = cis
      .createLoader<PopoverContainerComponent>(
        _elementRef,
        _viewContainerRef,
        _renderer
      )
      .provide({provide: PopoverConfig, useValue: _config});
    Object.assign(this, _config);
    this.onShown = this._popover.onShown;
    this.onHidden = this._popover.onHidden;

    // fix: no focus on button on Mac OS #1795
    if (typeof window !== 'undefined') {
      _elementRef.nativeElement.addEventListener('click', function () {
        try {
          _elementRef.nativeElement.focus();
        } catch (err) {
          return;
        }
      });
    }
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  show(): void {
    if (this._popover.isShown || !this.popover) {
      return;
    }

    this._popover
      .attach(PopoverContainerComponent)
      .to(this.container)
      .position({attachment: this.placement})
      .show({
        content: this.popover,
        context: this.popoverContext,
        placement: this.placement,
        title: this.popoverTitle,
        containerClass: this.containerClass
      });
    this.isOpen = true;
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  hide(): void {
    if (this.isOpen) {
      this._popover.hide();
      this.isOpen = false;
    }
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  ngOnInit(): any {
    // fix: seems there are an issue with `routerLinkActive`
    // which result in duplicated call ngOnInit without call to ngOnDestroy
    // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
    if (this._isInited) {
      return;
    }
    this._isInited = true;

    this._popover.listen({
      triggers: this.triggers,
      outsideClick: this.outsideClick,
      show: () => this.show()
    });
  }

  ngOnDestroy(): any {
    this._popover.dispose();
  }
}
