import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';

import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OnChange, warnOnce, parseTriggers, Trigger } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { timer, Subscription } from 'rxjs';

let id = 0;

@Directive({
  selector: '[tooltip], [tooltipHtml]',
  exportAs: 'bs-tooltip'
})
export class TooltipDirective implements OnInit, OnDestroy {
  tooltipId = id++;
  /** sets disable adaptive position */
  @Input() adaptivePosition = true;
  /**
   * Content to be displayed as tooltip.
   */
  @OnChange()
  @Input()
  tooltip?: string | TemplateRef<unknown>;
  /** Fired when tooltip content changes */
  @Output()
  tooltipChange: EventEmitter<string | TemplateRef<unknown>> = new EventEmitter();

  /**
   * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
   */
  @Input() placement = 'top';
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  @Input() triggers = 'hover focus';
  /**
   * A selector specifying the element the tooltip should be appended to.
   */
  @Input() container?: string;
  /**
   * Css class for tooltip container
   */
  @Input() containerClass = '';
  @Input() boundariesElement?: ('viewport' | 'scrollParent' | 'window');
  /**
   * Returns whether or not the tooltip is currently being shown
   */
  @Input()
  get isOpen(): boolean {
    return this._tooltip.isShown;
  }

  set isOpen(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  /**
   * Allows to disable tooltip
   */
  @Input() isDisabled = false;

  /**
   * Delay before showing the tooltip
   */
  @Input() delay = 0;

  /**
   * Emits an event when the tooltip is shown
   */
  @Output() onShown: EventEmitter<unknown>;
  /**
   * Emits an event when the tooltip is hidden
   */
  @Output() onHidden: EventEmitter<unknown>;

  /** @deprecated - please use `tooltip` instead */
  @Input('tooltipHtml')
    set htmlContent(value: string | TemplateRef<unknown>) {
    warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
    this.tooltip = value;
  }

  /** @deprecated - please use `placement` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipPlacement')
  set _placement(value: string) {
    warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
    this.placement = value;
  }

  /** @deprecated - please use `isOpen` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipIsOpen')
  set _isOpen(value: boolean) {
    warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
    this.isOpen = value;
  }

  get _isOpen(): boolean {
    warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');

    return this.isOpen;
  }

  /** @deprecated - please use `isDisabled` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipEnable')
  set _enable(value: boolean) {
    warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
    this.isDisabled = !value;
  }

  get _enable(): boolean {
    warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');

    return this.isDisabled;
  }

  /** @deprecated - please use `container="body"` instead */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipAppendToBody')
  set _appendToBody(value: boolean) {
    warnOnce(
      'tooltipAppendToBody was deprecated, please use `container="body"` instead'
    );
    this.container = value ? 'body' : this.container;
  }

  get _appendToBody(): boolean {
    warnOnce(
      'tooltipAppendToBody was deprecated, please use `container="body"` instead'
    );

    return this.container === 'body';
  }

  /** @deprecated - removed, will be added to configuration */
  @Input() tooltipAnimation = true;

  /** @deprecated - will replaced with customClass */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipClass')
  set _popupClass(value: string) {
    warnOnce('tooltipClass deprecated');
  }

  /** @deprecated - removed */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipContext')
  set _tooltipContext(value: undefined) {
    warnOnce('tooltipContext deprecated');
  }

  /** @deprecated */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tooltipPopupDelay')
  set _tooltipPopupDelay(value: number) {
    warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
    this.delay = value;
  }

  /** @deprecated */
  @Input() tooltipFadeDuration = 150;

  /** @deprecated -  please use `triggers` instead */
  @Input('tooltipTrigger')
  get _tooltipTrigger(): string | string[] {
    warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');

    return this.triggers;
  }

  set _tooltipTrigger(value: string | string[]) {
    warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
    this.triggers = (value || '').toString();
  }

  /** @deprecated */
  @Output()
  tooltipStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected _delayTimeoutId?: number;
  protected _tooltipCancelShowFn?: () => void;

  private _tooltip: ComponentLoader<TooltipContainerComponent>;
  private _delaySubscription?: Subscription;
  private _ariaDescribedby?: string;
  constructor(
    _viewContainerRef: ViewContainerRef,
    cis: ComponentLoaderFactory,
    config: TooltipConfig,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _positionService: PositioningService
  ) {

    this._tooltip = cis
      .createLoader<TooltipContainerComponent>(
        this._elementRef,
        _viewContainerRef,
        this._renderer
      )
      .provide({provide: TooltipConfig, useValue: config});

    Object.assign(this, config);
    this.onShown = this._tooltip.onShown;
    this.onHidden = this._tooltip.onHidden;
  }

  ngOnInit(): void {
    this._tooltip.listen({
      triggers: this.triggers,
      show: () => this.show()
    });
    this.tooltipChange.subscribe((value) => {
      if (!value) {
        this._tooltip.hide();
      }
    });

    this.onShown.subscribe(() => {
      this.setAriaDescribedBy();
    });

    this.onHidden.subscribe(() => {
      this.setAriaDescribedBy();
    });
  }

  setAriaDescribedBy(): void {
    this._ariaDescribedby = this.isOpen ? `tooltip-${this.tooltipId}` : void 0;

    if (this._ariaDescribedby) {
      this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ariaDescribedby);
    } else {
      this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
    }
  }

  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  /**
   * Opens an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  show(): void {
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this.adaptivePosition
        },
        preventOverflow: {
          enabled: this.adaptivePosition,
          boundariesElement: this.boundariesElement || 'scrollParent'
        }
      }
    });

    if (
      this.isOpen ||
      this.isDisabled ||
      this._delayTimeoutId ||
      !this.tooltip
    ) {
      return;
    }

    const showTooltip = () => {
      if (this._delayTimeoutId) {
        this._delayTimeoutId = undefined;
      }

      this._tooltip
        .attach(TooltipContainerComponent)
        .to(this.container)
        .position({attachment: this.placement})
        .show({
          content: this.tooltip,
          placement: this.placement,
          containerClass: this.containerClass,
          id: `tooltip-${this.tooltipId}`
        });
    };
    const cancelDelayedTooltipShowing = () => {
      if (this._tooltipCancelShowFn) {
        this._tooltipCancelShowFn();
      }
    };

    if (this.delay) {
      if (this._delaySubscription) {
        this._delaySubscription.unsubscribe();
      }

      this._delaySubscription = timer(this.delay).subscribe(() => {
        showTooltip();
        cancelDelayedTooltipShowing();
      });

      if (this.triggers) {
        parseTriggers(this.triggers)
          .forEach((trigger: Trigger) => {
            if (!trigger.close) {
              return;
            }
            this._tooltipCancelShowFn = this._renderer.listen(
              this._elementRef.nativeElement,
              trigger.close,
              () => {
                this._delaySubscription?.unsubscribe();
                cancelDelayedTooltipShowing();
              }
            );
          });
      }
    } else {
      showTooltip();
    }
  }

  /**
   * Closes an element’s tooltip. This is considered a “manual” triggering of
   * the tooltip.
   */
  hide(): void {
    if (this._delayTimeoutId) {
      clearTimeout(this._delayTimeoutId);
      this._delayTimeoutId = undefined;
    }

    if (!this._tooltip.isShown) {
      return;
    }

    if (this._tooltip.instance?.classMap) {
      this._tooltip.instance.classMap.in = false;
    }

    setTimeout(() => {
      this._tooltip.hide();
    }, this.tooltipFadeDuration);
  }

  ngOnDestroy(): void {
    this._tooltip.dispose();
    this.tooltipChange.unsubscribe();
    if (this._delaySubscription) {
      this._delaySubscription.unsubscribe();
    }
    this.onShown.unsubscribe();
    this.onHidden.unsubscribe();
  }
}
