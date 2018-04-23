import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { isBs3 } from '../utils/theme-provider';

@Component({
  selector: 'bs-tooltip-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {
    '[class]':
      '"tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
    '[class.show]': '!isBs3',
    role: 'tooltip'
  },
  styles: [
    `
    :host.tooltip {
      display: block;
    }
    :host.bs-tooltip-top .arrow, :host.bs-tooltip-bottom .arrow {
      left: 50%;
      margin-left: -6px;
    }
    :host.bs-tooltip-left .arrow, :host.bs-tooltip-right .arrow {
      top: 50%;
      margin-top: -6px;
    }
  `
  ],
  template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `
})
export class TooltipContainerComponent implements AfterViewInit {
  classMap: any;
  placement: string;
  containerClass: string;
  animation: boolean;

  get isBs3(): boolean {
    return isBs3();
  }

  constructor(config: TooltipConfig) {
    Object.assign(this, config);
  }

  ngAfterViewInit(): void {
    this.classMap = { in: false, fade: false };
    this.classMap[this.placement] = true;
    this.classMap[`tooltip-${this.placement}`] = true;

    this.classMap.in = true;
    if (this.animation) {
      this.classMap.fade = true;
    }

    if (this.containerClass) {
      this.classMap[this.containerClass] = true;
    }
  }
}
