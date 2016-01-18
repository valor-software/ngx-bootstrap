import {
  Component,
  OnInit, Input, HostListener,
  ElementRef, EventEmitter,
  DynamicComponentLoader, ComponentRef, Inject
} from 'angular2/core';
import {NgClass, NgStyle} from 'angular2/common';
import {positionService} from '../position';
import {TooltipOptions} from './tooltip-options.class';

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
export class TooltipContainer {
  private classMap:any;
  private positionMap:any;
  private top:string;
  private left:string;
  private display:string;
  private content:string;
  private placement:string;
  private appendToBody:boolean;

  private isOpen:boolean;

  constructor(public element:ElementRef, @Inject(TooltipOptions) options:TooltipOptions) {
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
