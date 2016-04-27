import {
  Directive, Input, HostListener, DynamicComponentLoader,
  ComponentRef, Provider, ReflectiveInjector, ViewContainerRef
} from 'angular2/core';
import {TooltipOptions} from './tooltip-options.class';
import {TooltipContainer} from './tooltip-container.component';

@Directive({selector: '[tooltip]'})
export class Tooltip {
  /* tslint:disable */
  @Input('tooltip') public content:string;
  @Input('tooltipPlacement') public placement:string = 'top';
  @Input('tooltipIsOpen') public isOpen:boolean;
  @Input('tooltipEnable') public enable:boolean;
  @Input('tooltipAnimation') public animation:boolean = true;
  @Input('tooltipAppendToBody') public appendToBody:boolean;
  /* tslint:enable */

  public viewContainerRef:ViewContainerRef;
  public loader:DynamicComponentLoader;

  private visible:boolean = false;
  private tooltip:Promise<ComponentRef>;

  public constructor(viewContainerRef:ViewContainerRef, loader:DynamicComponentLoader) {
    this.viewContainerRef = viewContainerRef;
    this.loader = loader;
  }

  // todo: filter triggers
  // params: event, target
  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  public show():void {
    if (this.visible) {
      return;
    }
    this.visible = true;
    let options = new TooltipOptions({
      content: this.content,
      placement: this.placement,
      animation: this.animation,
      hostEl: this.viewContainerRef.element
    });

    let binding = ReflectiveInjector.resolve([
      new Provider(TooltipOptions, {useValue: options})
    ]);

    this.tooltip = this.loader
      .loadNextToLocation(TooltipContainer, this.viewContainerRef, binding)
      .then((componentRef:ComponentRef) => {
        return componentRef;
      });
  }

  // params event, target
  @HostListener('focusout', ['$event', '$target'])
  @HostListener('mouseleave', ['$event', '$target'])
  public hide():void {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.tooltip.then((componentRef:ComponentRef) => {
      componentRef.destroy();
      return componentRef;
    });
  }
}
