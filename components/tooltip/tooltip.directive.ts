import {
  ComponentRef, Directive, HostListener, Input, ReflectiveInjector, TemplateRef, ViewContainerRef, Output, EventEmitter
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
  @Input('tooltip') public content:string;
  @Input('tooltipHtml') public htmlContent:string | TemplateRef<any>;
  @Input('tooltipPlacement') public placement:string = 'top';
  @Input('tooltipIsOpen') public isOpen:boolean;
  @Input('tooltipEnable') public enable:boolean = true;
  @Input('tooltipAnimation') public animation:boolean = true;
  @Input('tooltipAppendToBody') public appendToBody:boolean;
  @Input('tooltipClass') public popupClass:string;
  @Input('tooltipContext') public tooltipContext:any;
  /* tslint:enable */

  @Output() public tooltipStateChanged:EventEmitter<boolean> = new EventEmitter<boolean>();

  public viewContainerRef:ViewContainerRef;
  public componentsHelper:ComponentsHelper;

  private visible:boolean = false;
  private tooltip:ComponentRef<any>;

  public constructor(viewContainerRef:ViewContainerRef, componentsHelper:ComponentsHelper) {
    this.viewContainerRef = viewContainerRef;
    this.componentsHelper = componentsHelper;
  }

  // todo: filter triggers
  // params: event, target
  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  public show():void {
    if (this.visible || !this.enable) {
      return;
    }
    this.visible = true;
    let options = new TooltipOptions({
      content: this.content,
      htmlContent: this.htmlContent,
      placement: this.placement,
      animation: this.animation,
      hostEl: this.viewContainerRef.element,
      popupClass: this.popupClass,
      context: this.tooltipContext
    });

    let binding = ReflectiveInjector.resolve([
      {provide: TooltipOptions, useValue: options}
    ]);

    this.tooltip = this.componentsHelper
      .appendNextToLocation(TooltipContainerComponent, this.viewContainerRef, binding);

    this.triggerStateChanged();
  }

  // params event, target
  @HostListener('focusout', ['$event', '$target'])
  @HostListener('mouseleave', ['$event', '$target'])
  public hide():void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.tooltip.destroy();
    this.triggerStateChanged();
  }

  private triggerStateChanged():void {
    this.tooltipStateChanged.emit(this.visible);
  }
}
