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
  EventEmitter
} from '@angular/core';

import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipOptions } from './tooltip-options.class';
import { ComponentsHelper } from '../utils/components-helper.service';

/* tslint:disable */
@Directive({
  selector: '[tooltip], [tooltipHtml]',
  exportAs: 'bs-tooltip'
})
/* tslint:enable */
export class TooltipDirective {
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
  /* tslint:enable */

  @Output() public tooltipStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public viewContainerRef: ViewContainerRef;
  public componentsHelper: ComponentsHelper;

  protected changeDetectorRef: ChangeDetectorRef;
  protected visible: boolean = false;
  protected tooltip: ComponentRef<any>;

  protected delayTimeoutId: number;

  public constructor(viewContainerRef: ViewContainerRef,
                     componentsHelper: ComponentsHelper,
                     changeDetectorRef: ChangeDetectorRef) {
    this.viewContainerRef = viewContainerRef;
    this.componentsHelper = componentsHelper;
    this.changeDetectorRef = changeDetectorRef;
  }

  // todo: filter triggers
  // params: event, target
  @HostListener('focusin')
  @HostListener('mouseenter')
  public show(): void {
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
        context: this.tooltipContext
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
      this.delayTimeoutId = <number>(<any>setTimeout(() => { showTooltip(); }, this.delay));
    } else {
      showTooltip();
    }
  }

  // params event, target
  @HostListener('focusout')
  @HostListener('mouseleave')
  public hide(): void {
    if (this.delayTimeoutId) {
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = undefined;
    }

    if (!this.visible) {
      return;
    }

    this.visible = false;
    this.tooltip.destroy();
    this.triggerStateChanged();
  }

  protected triggerStateChanged(): void {
    this.tooltipStateChanged.emit(this.visible);
  }
}
