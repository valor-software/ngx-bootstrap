import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  HostListener,
  Input,
  ReflectiveInjector,
  TemplateRef,
  ViewContainerRef,
  Output,
  EventEmitter,
  Renderer,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipOptions } from './tooltip-options.class';
import { ComponentsHelper } from '../utils/components-helper.service';
import { TooltipConfig } from './tooltip.config';

/* tslint:disable */
@Directive({
  selector: '[tooltip], [tooltipHtml]',
  exportAs: 'bs-tooltip'
})
/* tslint:enable */
export class TooltipDirective implements OnInit, OnDestroy {
  /* tslint:disable */
  @Input('tooltip') public content: string;
  @Input('tooltipHtml') public htmlContent: string | TemplateRef<any>;
  @Input('tooltipPlacement') public placement: string = 'top';
  @Input('tooltipIsOpen') public isOpen: boolean;
  @Input('tooltipEnable') public enable: boolean = true;
  @Input('tooltipAnimation') public animation: boolean = true;
  @Input('tooltipAppendToBody') public appendToBody: boolean = false;
  @Input('tooltipClass') public popupClass: string;
  @Input('tooltipContext') public tooltipContext: any;
  @Input('tooltipPopupDelay') public delay: number = 0;
  @Input('tooltipFadeDuration') public fadeDuration: number = 150;
  @Input('tooltipTrigger') public tooltipTrigger: string|Array<string>;
  /* tslint:enable */

  @Output() public tooltipStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected visible: boolean = false;
  protected tooltip: ComponentRef<any>;
  protected delayTimeoutId: number;
  protected toggleOnShowListeners: Array<Function> = [];

  public constructor(protected viewContainerRef: ViewContainerRef,
                     protected componentsHelper: ComponentsHelper,
                     protected changeDetectorRef: ChangeDetectorRef,
                     protected renderer: Renderer,
                     protected elementRef: ElementRef,
                     protected config: TooltipConfig) {
    this.configureOptions();
  }

  public ngOnInit(): void {
    this.bindListeners();
  }

  protected configureOptions(): void {
    Object.assign(this, this.config);
  }

  protected bindListeners(): void {
    const tooltipElement = this.elementRef.nativeElement;
    const events: Array<string> = this.normalizeEventsSet(this.tooltipTrigger);
    /* tslint:disable */
    for (var i = 0; i < events.length; i++) {
      const listener = this.renderer.listen(tooltipElement, events[i], this.show.bind(this));
      this.toggleOnShowListeners.push(listener);
    }
    /* tslint:enable */
  }

  protected normalizeEventsSet(events: string|Array<string>): Array<string> {
    if (typeof events === 'string') {
      return events.split(/[\s,]+/);
    }
    return events;
  }

  // params: event, target
  public show(e: MouseEvent|FocusEvent): void {
    this.preventAndStop(e);

    if (this.visible || !this.enable || this.delayTimeoutId) {
      return;
    }

    const showTooltip = () => {
      this.visible = true;
      let options = new TooltipOptions({
        content: this.content,
        htmlContent: this.htmlContent,
        placement: this.placement,
        animation: this.animation,
        appendToBody: this.appendToBody,
        hostEl: this.viewContainerRef.element,
        popupClass: this.popupClass,
        context: this.tooltipContext,
        trigger: this.tooltipTrigger
      });

      if (this.appendToBody) {
        this.tooltip = this.componentsHelper
          .appendNextToRoot(TooltipContainerComponent, TooltipOptions, options);
      } else {
        let binding = ReflectiveInjector.resolve([
          {provide: TooltipOptions, useValue: options}
        ]);
        this.tooltip = this.componentsHelper
          .appendNextToLocation(TooltipContainerComponent, this.viewContainerRef, binding);
      }

      this.changeDetectorRef.markForCheck();
      this.triggerStateChanged();
    };

    if (this.delay) {
      this.delayTimeoutId = setTimeout(() => { showTooltip(); }, this.delay);
    } else {
      showTooltip();
    }
  }

  // params event, target
  @HostListener('mouseleave')
  @HostListener('mouseout')
  @HostListener('focusout')
  @HostListener('blur')
  public hide(): void {
    if (this.delayTimeoutId) {
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = undefined;
    }

    if (!this.visible) {
      return;
    }
    this.tooltip.instance.classMap.in = false;
    setTimeout(() => {
      this.visible = false;
      this.tooltip.destroy();
      this.triggerStateChanged();
    }, this.fadeDuration);

  }

  protected triggerStateChanged(): void {
    this.tooltipStateChanged.emit(this.visible);
  }

  protected preventAndStop(event: MouseEvent|FocusEvent): void {
    if (!event) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
  }

  public ngOnDestroy(): void {
    const listeners = this.toggleOnShowListeners;
    /* tslint:disable */
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].call(this);
    }
    /* tslint:enable */
  }
}
