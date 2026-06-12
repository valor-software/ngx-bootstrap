import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  input,
  output,
  model
} from '@angular/core';

import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';

import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { warnOnce, parseTriggers, Trigger } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { timer, Subscription } from 'rxjs';
import { AvailableBSPositions } from 'ngx-bootstrap/positioning';

let id = 0;

@Directive({
    selector: '[tooltip], [tooltipHtml]',
    exportAs: 'bs-tooltip',
    standalone: true,
    providers: [
      ComponentLoaderFactory, PositioningService
    ]
})
export class TooltipDirective implements OnInit, OnDestroy {
  tooltipId = id++;
  /** sets disable adaptive position */
  readonly adaptivePosition = input(this._config.adaptivePosition);
  /**
   * Content to be displayed as tooltip.
   */
  readonly tooltip = model<string | TemplateRef<unknown> | undefined>();

  /**
   * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
   */
  readonly placement = input<AvailableBSPositions>(this._config.placement as AvailableBSPositions);
  /**
   * Specifies events that should trigger. Supports a space separated list of
   * event names.
   */
  readonly triggers = input(this._config.triggers);
  /**
   * A selector specifying the element the tooltip should be appended to.
   */
  readonly container = input<string | undefined>(this._config.container);
  /**
   * Css class for tooltip container
   */
  readonly containerClass = input('');
  readonly boundariesElement = input<'viewport' | 'scrollParent' | 'window' | undefined>();
  /**
   * Returns whether or not the tooltip is currently being shown
   */
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
  readonly isDisabled = input(false);

  /**
   * Delay before showing the tooltip
   */
  readonly delay = input(this._config.delay);

  /**
   * Emits an event when the tooltip is shown
   */
  onShown: EventEmitter<unknown>;
  /**
   * Emits an event when the tooltip is hidden
   */
  onHidden: EventEmitter<unknown>;

  /** @deprecated - please use `tooltip` instead */
  readonly tooltipHtml = input<string | TemplateRef<unknown> | undefined>(undefined);

  /** @deprecated - please use `placement` instead */
  readonly tooltipPlacement = input<AvailableBSPositions | undefined>(undefined);

  /** @deprecated - please use `isOpen` instead */
  readonly tooltipIsOpen = input<boolean | undefined>(undefined);

  /** @deprecated - please use `isDisabled` instead */
  readonly tooltipEnable = input<boolean | undefined>(undefined);

  /** @deprecated - please use `container="body"` instead */
  readonly tooltipAppendToBody = input<boolean | undefined>(undefined);

  /** @deprecated - removed, will be added to configuration */
  readonly tooltipAnimation = input(true);

  /** @deprecated - will replaced with customClass */
  readonly tooltipClass = input<string | undefined>(undefined);

  /** @deprecated - removed */
  readonly tooltipContext = input<undefined>(undefined);

  /** @deprecated */
  readonly tooltipPopupDelay = input<number | undefined>(undefined);

  /** @deprecated */
  readonly tooltipFadeDuration = input(150);

  /** @deprecated -  please use `triggers` instead */
  readonly tooltipTrigger = input<string | string[] | undefined>(undefined);

  /** @deprecated */
  readonly tooltipStateChanged = output<boolean>();

  protected _delayTimeoutId?: number;
  protected _tooltipCancelShowFn?: () => void;

  private _tooltip: ComponentLoader<TooltipContainerComponent>;
  private _delaySubscription?: Subscription;
  private _ariaDescribedby?: string;

  constructor(
    _viewContainerRef: ViewContainerRef,
    cis: ComponentLoaderFactory,
    private _config: TooltipConfig,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _positionService: PositioningService
  ) {
    this._tooltip = cis
      .createLoader<TooltipContainerComponent>(this._elementRef, _viewContainerRef, this._renderer)
      .provide({ provide: TooltipConfig, useValue: _config });

    this.onShown = this._tooltip.onShown;
    this.onHidden = this._tooltip.onHidden;
  }

  ngOnInit(): void {
    // Handle deprecated inputs
    const htmlContent = this.tooltipHtml();
    if (htmlContent !== undefined) {
      warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
      this.tooltip.set(htmlContent);
    }

    const placementValue = this.tooltipPlacement();
    if (placementValue !== undefined) {
      warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
    }

    const isOpenValue = this.tooltipIsOpen();
    if (isOpenValue !== undefined) {
      warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
      this.isOpen = isOpenValue;
    }

    const enableValue = this.tooltipEnable();
    if (enableValue !== undefined) {
      warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
    }

    const appendToBodyValue = this.tooltipAppendToBody();
    if (appendToBodyValue !== undefined) {
      warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
    }

    const classValue = this.tooltipClass();
    if (classValue !== undefined) {
      warnOnce('tooltipClass deprecated');
    }

    const contextValue = this.tooltipContext();
    if (contextValue !== undefined) {
      warnOnce('tooltipContext deprecated');
    }

    const delayValue = this.tooltipPopupDelay();
    if (delayValue !== undefined) {
      warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
    }

    const triggerValue = this.tooltipTrigger();
    if (triggerValue !== undefined) {
      warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
    }

    this._tooltip.listen({
      triggers: this.triggers(),
      show: () => this.show()
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
   * Toggles an element's tooltip. This is considered a "manual" triggering of
   * the tooltip.
   */
  toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  /**
   * Opens an element's tooltip. This is considered a "manual" triggering of
   * the tooltip.
   */
  show(): void {
    this._positionService.setOptions({
      modifiers: {
        flip: {
          enabled: this.adaptivePosition()
        },
        preventOverflow: {
          enabled: this.adaptivePosition(),
          boundariesElement: this.boundariesElement() || 'scrollParent'
        }
      }
    });

    const tooltipValue = this.tooltip();
    const isDisabledValue = this.isDisabled() || (this.tooltipEnable() !== undefined && !this.tooltipEnable());
    const delayValue = this.tooltipPopupDelay() ?? this.delay();
    const containerValue = this.tooltipAppendToBody() ? 'body' : this.container();
    const placementValue = this.tooltipPlacement() ?? this.placement();
    const triggersValue = this.tooltipTrigger()?.toString() ?? this.triggers();

    if (this.isOpen || isDisabledValue || this._delayTimeoutId || !tooltipValue) {
      return;
    }

    const showTooltip = () => {
      if (this._delayTimeoutId) {
        this._delayTimeoutId = undefined;
      }

      this._tooltip
        .attach(TooltipContainerComponent)
        .to(containerValue)
        .position({ attachment: placementValue })
        .show({
          content: tooltipValue,
          placement: placementValue,
          containerClass: this.containerClass(),
          id: `tooltip-${this.tooltipId}`
        });
    };
    const cancelDelayedTooltipShowing = () => {
      if (this._tooltipCancelShowFn) {
        this._tooltipCancelShowFn();
      }
    };

    if (delayValue) {
      if (this._delaySubscription) {
        this._delaySubscription.unsubscribe();
      }

      this._delaySubscription = timer(delayValue).subscribe(() => {
        showTooltip();
        cancelDelayedTooltipShowing();
      });

      if (triggersValue) {
        parseTriggers(triggersValue).forEach((trigger: Trigger) => {
          if (!trigger.close) {
            return;
          }
          this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
            this._delaySubscription?.unsubscribe();
            cancelDelayedTooltipShowing();
          });
        });
      }
    } else {
      showTooltip();
    }
  }

  /**
   * Closes an element's tooltip. This is considered a "manual" triggering of
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
      this._tooltip.instance.classMap['in'] = false;
    }

    setTimeout(() => {
      this._tooltip.hide();
    }, this.tooltipFadeDuration());
  }

  ngOnDestroy(): void {
    this._tooltip.dispose();
    if (this._delaySubscription) {
      this._delaySubscription.unsubscribe();
    }
    this.onShown.unsubscribe();
    this.onHidden.unsubscribe();
  }
}
