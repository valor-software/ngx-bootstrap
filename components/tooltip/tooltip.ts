import {
  Directive,
  Component, View,
  OnInit, EventEmitter,
  ElementRef,
  NgClass, NgStyle,
  ViewRef, ViewContainerRef, TemplateRef,
  DynamicComponentLoader, ComponentRef,
  ViewEncapsulation
} from 'angular2/angular2';

import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/angular2';

import {positionService} from '../position';
import {IAttribute} from '../common';

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
  selector: 'tooltip-container'
})
@View({
  template: `
    <div class="tooltip" role="tooltip"
     [ng-style]="{top: top, left: left, display: display}"
     [ng-class]="classMap" >
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{content}}
      </div>
    </div>`,
  directives: [NgClass, NgStyle],
  encapsulation: ViewEncapsulation.None
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

@Directive({
  selector: '[tooltip]',
  properties: [
    'content:tooltip',
    'placement:tooltip-placement',
    'appendToBody',
    'isOpen: tooltip-is-open',
    'enable: tooltip-enable'
  ],
  host: {
    '(mouseenter)': 'show($event, $targe)',
    '(mouseleave)': 'hide($event, $targe)',
    '(focusin)': 'show($event, $targe)',
    '(focusout)': 'hide($event, $targe)'
  }
})
export class Tooltip implements OnInit {
  private visible:boolean = false;

  private content:string;
  private placement:string = 'top';
  // todo:
  private appendToBody:boolean;

  private isOpen:boolean;
  private enable:boolean;

  private tooltip:Promise<ComponentRef>;

  constructor(public element:ElementRef,
              public loader:DynamicComponentLoader) {
  }

  onInit() {
  }

  // todo: filter triggers
  // params: event, target
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

export const tooltip:Array<any> = [Tooltip, TooltipContainer];
