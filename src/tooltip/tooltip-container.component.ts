import {
  AfterViewInit, Component, ChangeDetectionStrategy, Inject
} from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { isBs3 } from '../utils/ng2-bootstrap-config';

@Component({
  selector: 'bs-tooltip-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {
    '[class]': '"tooltip in tooltip-" + placement + " " + placement',
    '[class.show]': '!isBs3',
    role: 'tooltip'
  },
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

  public get isBs3(): boolean {
    return isBs3();
  }

  public constructor(config: TooltipConfig) {
    Object.assign(this, config);
  }

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
