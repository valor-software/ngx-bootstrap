import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, TemplateRef
} from '@angular/core';

import { positionService } from '../utils/position';
import { TooltipOptions } from './tooltip-options.class';

@Component({
  selector: 'tooltip-container',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="tooltip" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner"
           *ngIf="htmlContent && !isTemplate" 
           innerHtml="{{htmlContent}}">
      </div>
      <div class="tooltip-inner"
           *ngIf="htmlContent && isTemplate">
        <template [ngTemplateOutlet]="htmlContent"
                  [ngOutletContext]="{model: context}">
        </template>
      </div>
      <div class="tooltip-inner"
           *ngIf="content">
        {{content}}
      </div>
    </div>`
})
export class TooltipContainerComponent implements AfterViewInit {
  /* tslint:disable */
  public classMap:any;
  public top:string = '-1000px';
  public left:string = '-1000px';
  public display:string = 'block';
  public content:string;
  public htmlContent:string | TemplateRef<any>;
  protected placement:string;
  protected popupClass:string;
  protected animation:boolean;
  protected isOpen:boolean;
  protected appendToBody:boolean;
  protected hostEl:ElementRef;
  protected context:any;
  /* tslint:enable */

  protected element:ElementRef;
  protected cdr:ChangeDetectorRef;

  public constructor(element:ElementRef,
                     cdr:ChangeDetectorRef,
                     @Inject(TooltipOptions) options:TooltipOptions) {
    this.element = element;
    this.cdr = cdr;
    Object.assign(this, options);
    // tslint:disable-next-line
    this.classMap = {'in': false, fade: false};
    this.classMap[options.placement] = true;
    this.classMap['tooltip-' + options.placement] = true;
  }

  public ngAfterViewInit():void {
    let p = positionService
      .positionElements(
        this.hostEl.nativeElement,
        this.element.nativeElement.children[0],
        this.placement, this.appendToBody);
    this.top = p.top + 'px';
    this.left = p.left + 'px';
    this.classMap.in = true;
    if (this.animation) {
      this.classMap.fade = true;
    }

    if (this.popupClass) {
      this.classMap[this.popupClass] = true;
    }

    this.cdr.detectChanges();
  }

  public get isTemplate():boolean {
    return this.htmlContent instanceof TemplateRef;
  }
}
