import {
  Component,
  Output,
  ElementRef, EventEmitter,
  Inject, AfterViewInit
} from 'angular2/core';
import {NgClass, NgStyle} from 'angular2/common';
import {positionService} from '../position';
import {TooltipOptions} from './tooltip-options.class';

@Component({
  selector: 'tooltip-container',
  template: `<div class="tooltip" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner">
        {{content}}
      </div>
    </div>`
})
export class TooltipContainer implements AfterViewInit {
  private classMap:any;
  private top:string = '-1000px';
  private left:string = '-1000px';
  private display:string = 'block';
  private content:string;
  private placement:string;
  private appendToBody:boolean;
  private hostEl:ElementRef;

  @Output() positioned = new EventEmitter<boolean>();

  constructor(private element:ElementRef, @Inject(TooltipOptions) options:TooltipOptions) {
    Object.assign(this, options);
    this.classMap = {'in': false};
    this.classMap[options.placement] = true;
  }

  ngAfterViewInit() {
    let p = positionService
      .positionElements(
        this.hostEl.nativeElement,
        this.element.nativeElement.children[0],
        this.placement, this.appendToBody);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
    this.classMap['in'] = true;
    this.positioned.emit(true);
  }
}
