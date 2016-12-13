import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'bs-tooltip-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {'[class]': '"tooltip in tooltip-" + placement + " " + placement', role: 'tooltip'},
  template: `
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `
  // template: `<div class="tooltip" role="tooltip"
  //    [ngStyle]="{top: top, left: left, display: display}"
  //    [ngClass]="classMap">
  //     <div class="tooltip-arrow"></div>
  //     <div class="tooltip-inner"
  //          *ngIf="htmlContent && !isTemplate"
  //          innerHtml="{{htmlContent}}">
  //     </div>
  //     <div class="tooltip-inner"
  //          *ngIf="htmlContent && isTemplate">
  //       <template [ngTemplateOutlet]="htmlContent"
  //                 [ngOutletContext]="{model: context}">
  //       </template>
  //     </div>
  //     <div class="tooltip-inner"
  //          *ngIf="content">
  //       {{content}}
  //     </div>
  //   </div>`
})
export class TooltipContainerComponent implements AfterViewInit {
  public classMap: any;
  public placement: string;
  public popupClass: string;
  public animation: boolean;

  public ngAfterViewInit(): void {
    this.classMap = {in: false, fade: false};
    this.classMap[this.placement] = true;
    this.classMap['tooltip-' + this.placement] = true;

    this.classMap.in = true;
    if (this.animation) {
      this.classMap.fade = true;
    }

    if (this.popupClass) {
      this.classMap[this.popupClass] = true;
    }
  }
}
