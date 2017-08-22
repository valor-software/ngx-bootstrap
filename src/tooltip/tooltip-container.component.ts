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
    '[class]': '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
    '[class.show]': '!isBs3',
    role: 'tooltip'
  },
  styles: [`
    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {
      left: calc(50% - 2.5px);
    }
    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {
      top: calc(50% - 2.5px);
    }
  `],
  template: `
    <div class="tooltip-arrow arrow"></div>
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
  //       <ng-template [ngTemplateOutlet]="htmlContent"
  //                 [ngOutletContext]="{model: context}">
  //       </ng-template>
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
  public containerClass: string;
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

    if (this.containerClass) {
      this.classMap[this.containerClass] = true;
    }
  }
}
