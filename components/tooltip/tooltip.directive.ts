import {
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
import { OPTIONS } from './tooltip-options.token';
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
  @Input('tooltipContext') public context: any;
  @Input('tooltipPopupDelay') public delay: number = 0;

  @Output('tooltipStateChanged') public stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  /* tslint:enable */

  public viewContainerRef: ViewContainerRef;
  public componentsHelper: ComponentsHelper;

  private visible: boolean = false;
  private tooltip: ComponentRef<any>;

  private delayTimeoutId: number;

  public constructor(viewContainerRef: ViewContainerRef,
                     componentsHelper: ComponentsHelper) {
    this.viewContainerRef = viewContainerRef;
    this.componentsHelper = componentsHelper;
  }

  // todo: filter triggers
  // params: event, target
  @HostListener('focusin')
  @HostListener('mouseenter')
  public show(): void {
    if (this.visible || !this.enable || this.delayTimeoutId) {
      return;
    }

    if (this.delay) {
      this.delayTimeoutId = setTimeout(() => { this.showTooltip(); }, this.delay);
    } else {
      this.showTooltip();
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

  protected options(): TooltipOptions {
    return new TooltipOptions({
      content: this.content,
      htmlContent: this.htmlContent,
      placement: this.placement,
      animation: this.animation,
      hostEl: this.viewContainerRef.element,
      popupClass: this.popupClass,
      context: this.context
    });
  }

  protected get containerComponent(): any {
    return TooltipContainerComponent;
  }

  private showTooltip(): void {
    this.visible = true;
    let options = this.options();

    if (this.appendToBody) {
      this.tooltip = this.componentsHelper
        .appendNextToRoot(this.containerComponent, OPTIONS, options);
    } else {
      let binding = ReflectiveInjector.resolve([
        { provide: OPTIONS, useValue: options }
      ]);
      this.tooltip = this.componentsHelper
        .appendNextToLocation(this.containerComponent, this.viewContainerRef, binding);
    }

    this.triggerStateChanged();
  }

  private triggerStateChanged(): void {
    this.stateChanged.emit(this.visible);
  }
}
