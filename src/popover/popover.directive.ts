import {
  Directive, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer,
  ElementRef, TemplateRef, ViewContainerRef
} from '@angular/core';
import { PopoverConfig } from './popover.config';
import { ComponentLoaderFactory, ComponentLoader } from '../component-loader';
import { PopoverContainerComponent } from './popover-container.component';

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
@Directive({selector: '[popover]', exportAs: 'bs-popover'})
export class PopoverDirective implements OnInit, OnDestroy {
  /**
   * Content to be displayed as popover.
   */
  @Input() public popover: string | TemplateRef<any>;
  /**
   * Title of a popover.
   */
  @Input() public popoverTitle: string;
  /**
   * Placement of a popover. Accepts: "top", "bottom", "left", "right"
   */
  @Input() public placement: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() public triggers: string;
  /**
   * A selector specifying the element the popover should be appended to.
   * Currently only supports "body".
   */
  @Input() public container: string;

  /**
   * Returns whether or not the popover is currently being shown
   */
  @Input()
  public get isOpen(): boolean { return this._popover.isShown; }

  public set isOpen(value: boolean) {
    if (value) {this.show();} else {this.hide();}
  }

  /**
   * Emits an event when the popover is shown
   */
  @Output() public onShown: EventEmitter<any>;
  /**
   * Emits an event when the popover is hidden
   */
  @Output() public onHidden: EventEmitter<any>;

  private _popover: ComponentLoader<PopoverContainerComponent>;

  public constructor(_elementRef: ElementRef,
                     _renderer: Renderer,
                     _viewContainerRef: ViewContainerRef,
                     _config: PopoverConfig,
                     cis: ComponentLoaderFactory) {
    this._popover = cis
      .createLoader<PopoverContainerComponent>(_elementRef, _viewContainerRef, _renderer)
      .provide({provide: PopoverConfig, useValue: _config});
    Object.assign(this, _config);
    this.onShown = this._popover.onShown;
    this.onHidden = this._popover.onHidden;
  }

  /**
   * Opens an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public show(): void {
    if (this._popover.isShown) {
      return;
    }

    this._popover
      .attach(PopoverContainerComponent)
      .to(this.container)
      .position({attachment: this.placement})
      .show({
        content: this.popover,
        placement: this.placement,
        title: this.popoverTitle
      });
    this.isOpen = true;
  }

  /**
   * Closes an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public hide(): void {
    if (this.isOpen) {
      this._popover.hide();
      this.isOpen = false;
    }
  }

  /**
   * Toggles an element’s popover. This is considered a “manual” triggering of
   * the popover.
   */
  public toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  public ngOnInit(): any {
    this._popover.listen({
      triggers: this.triggers,
      show: () => this.show()
    });
  }

  public ngOnDestroy(): any {
    this._popover.dispose();
  }
}
