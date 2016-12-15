import {
  Directive, Input, TemplateRef, ViewContainerRef, Output, EventEmitter,
  Renderer, ElementRef, OnInit, OnDestroy
} from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory, ComponentLoader } from '../component-loader';

@Directive({
  selector: '[tooltip], [tooltipHtml]',
  exportAs: 'bs-tooltip'
})
export class TooltipDirective implements OnInit, OnDestroy {
  /**
   * Content to be displayed as popover.
   */
  @Input() public tooltip: string | TemplateRef<any>;
  /**
   * Title of a popover.
   */
  @Input() public tooltipTitle: string;
  /**
   * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
   */
  @Input() public placement: string;
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() public triggers: string;
  /**
   * A selector specifying the element the tooltip should be appended to.
   * Currently only supports "body".
   */
  @Input() public container: string;

  /**
   * Returns whether or not the tooltip is currently being shown
   */
  @Input()
  public get isOpen(): boolean { return this._tooltip.isShown; }

  public set isOpen(value: boolean) {
    if (value) {this.show();} else {this.hide();}
  }

  /**
   * Allows to disable tooltip
   */
  @Input() public isDisabled: boolean;

  /**
   * Emits an event when the tooltip is shown
   */
  @Output() public onShown: EventEmitter<any>;
  /**
   * Emits an event when the tooltip is hidden
   */
  @Output() public onHidden: EventEmitter<any>;

  /* tslint:disable */
  /** @deprecated */
  @Input('tooltipHtml')
  public set htmlContent(value: string | TemplateRef<any>) {
    console.warn('tooltipHtml was deprecated, please use `tooltip` instead');
    this.tooltip = value;
  }

  /** @deprecated */
  @Input('tooltipPlacement')
  public set _placement(value: string) {
    console.warn('tooltipPlacement was deprecated, please use `placement` instead');
    this.placement = value;
  }

  /** @deprecated */
  @Input('tooltipIsOpen')
  public set _isOpen(value: boolean) {
    console.warn('tooltipIsOpen was deprecated, please use `isOpen` instead');
    this.isOpen = value;
  }

  public get _isOpen(): boolean {
    console.warn('tooltipIsOpen was deprecated, please use `isOpen` instead');
    return this.isOpen;
  }

  /** @deprecated */
  @Input('tooltipEnable')
  public set _enable(value: boolean) {
    console.warn('tooltipEnable was deprecated, please use `isDisabled` instead');
    this.isDisabled = value === true;
  }

  public get _enable(): boolean {
    console.warn('tooltipEnable was deprecated, please use `isDisabled` instead');
    return this.isDisabled === true;
  }

  /** @deprecated */
  @Input('tooltipAppendToBody')
  public set _appendToBody(value: boolean) {
    console.warn('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    this.container = value ? 'body' : this.container;
  }

  public get _appendToBody(): boolean {
    console.warn('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    return this.container === 'body';
  }

  /** @deprecated */
  @Input('tooltipAnimation') public _animation: boolean = true;

  /** @deprecated */
  @Input('tooltipClass')
  public set _popupClass(value: string) {
    console.warn('tooltipClass deprecated');
  }

  /** @deprecated */
  @Input('tooltipContext')
  public set _tooltipContext(value: any) {
    console.warn('tooltipContext deprecated');
  }

  @Input('tooltipPopupDelay') public _delay: number = 0;

  /** @deprecated */
  @Input('tooltipFadeDuration') public _fadeDuration: number = 150;

  /** @deprecated */
  @Input('tooltipTrigger')
  public get _tooltipTrigger(): string|Array<string> {
    console.warn('tooltipTrigger was deprecated, please use `triggers` instead');
    return this.triggers;
  };

  public set _tooltipTrigger(value: string|Array<string>) {
    console.warn('tooltipTrigger was deprecated, please use `triggers` instead');
    this.triggers = (value || '').toString();
  };

  /* tslint:enable */

  @Output() public tooltipStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected _delayTimeoutId: number;

  private _tooltip: ComponentLoader<TooltipContainerComponent>;

  // tslint:disable-next-line
  public constructor(_viewContainerRef: ViewContainerRef,
                     _renderer: Renderer,
                     _elementRef: ElementRef,
                     cis: ComponentLoaderFactory,
                     config: TooltipConfig) {
    this._tooltip = cis
      .createLoader<TooltipContainerComponent>(_elementRef, _viewContainerRef, _renderer)
      .provide({provide: TooltipConfig, useValue: config});

    Object.assign(this, config);
    this.onShown = this._tooltip.onShown;
    this.onHidden = this._tooltip.onHidden;
  }

  public ngOnInit(): void {
    this._tooltip.listen({
      triggers: this.triggers,
      show: () => this.show()
    });
  }

  public show(): void {
    if (this._tooltip.isShown || this.isDisabled || this._delayTimeoutId) {
      return;
    }

    const showTooltip = () => this._tooltip
      .attach(TooltipContainerComponent)
      .to(this.container)
      .position({attachment: this.placement})
      .show(this.tooltip, {
        placement: this.placement,
        title: this.tooltipTitle
      });

    if (this._delay) {
      this._delayTimeoutId = setTimeout(() => { showTooltip(); }, this._delay);
    } else {
      showTooltip();
    }
  }

  public hide(): void {
    if (this._delayTimeoutId) {
      clearTimeout(this._delayTimeoutId);
      this._delayTimeoutId = undefined;
    }

    if (!this._tooltip.isShown) {
      return;
    }

    this._tooltip.instance.classMap.in = false;
    setTimeout(() => {
      this._tooltip.hide();
    }, this._fadeDuration);
  }

  public ngOnDestroy(): void {
    this._tooltip.dispose();
  }
}
