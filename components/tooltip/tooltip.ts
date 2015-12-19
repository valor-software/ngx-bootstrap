import {
  Directive, Component,
  OnInit, Input, HostListener,
  ElementRef, EventEmitter,
  DynamicComponentLoader, ComponentRef
} from 'angular2/core';
import { NgClass, NgStyle } from 'angular2/common';
import { bind, Injectable, forwardRef, ResolvedBinding, Injector } from 'angular2/core';

import { positionService } from '../position';
import { IAttribute } from '../common';

class TooltipOptions {
  public placement:string;
  public popupClass:string;
  public animation:boolean;
  public isOpen:boolean;

  constructor(options:Object) {
    Object.assign(this, options);
  }
}

@Component({
  selector: 'tooltip-container',
  directives: [NgClass, NgStyle],
  template: `
    <div class="tooltip" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap" >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{content}}
      </div>
    </div>`
})
class TooltipContainer {
  private classMap:any;
  private positionMap:any;
  private top:string;
  private left:string;
  private display:string;
  private content:string;
  private placement:string;
  private appendToBody:boolean;

  private isOpen:boolean;

  constructor(public element:ElementRef, options:TooltipOptions) {
    Object.assign(this, options);
    this.classMap = {'in': false};
    this.classMap[options.placement] = true;
  }

  public position(hostEl:ElementRef) {
    this.display = 'block';
    this.top = '0px';
    this.left = '0px';
    let p = positionService
      .positionElements(hostEl.nativeElement,
        this.element.nativeElement.children[0],
        this.placement, this.appendToBody);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
    this.classMap['in'] = true;
  }
}

@Directive({selector: '[tooltip]'})
export class Tooltip implements OnInit {
  @Input('tooltip') private content:string;
  @Input('tooltip-placement') private placement:string = 'top';
  @Input('tooltip-isOpen') private isOpen:boolean;
  @Input('tooltip-enable') private enable:boolean;
  @Input() private appendToBody:boolean;

  private visible:boolean = false;
  private tooltip:Promise<ComponentRef>;

  constructor(public element:ElementRef,
              public loader:DynamicComponentLoader) {
  }

  ngOnInit() {
  }

  // todo: filter triggers
  // params: event, target
  @HostListener('focusin', ['$event', '$target'])
  @HostListener('mouseenter', ['$event', '$target'])
  show() {
    if (this.visible) {
      return;
    }
    this.visible = true;

    let options = new TooltipOptions({
      content: this.content,
      placement: this.placement
    });

    let binding = Injector.resolve([
      bind(TooltipOptions).toValue(options)
    ]);

    this.tooltip = this.loader
      .loadNextToLocation(TooltipContainer, this.element, binding)
      .then((componentRef:ComponentRef) => {
        componentRef.instance.position(this.element);
        return componentRef;
      });
  }

  // params event, target
  @HostListener('focusout', ['$event', '$target'])
  @HostListener('mouseleave', ['$event', '$target'])
  hide() {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.tooltip.then((componentRef:ComponentRef) => {
      componentRef.dispose();
      return componentRef;
    });
  }
}

export const TOOLTIP_DIRECTIVES:Array<any> = [Tooltip, TooltipContainer];
/**
 * @deprecated
 * @type {Tooltip|TooltipContainer[]}
 */
export const tooltip:Array<any> = [Tooltip, TooltipContainer];
