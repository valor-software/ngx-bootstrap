import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { getBsVer, IBsVersion } from 'ngx-bootstrap/utils';
import { PlacementForBs5 } from 'ngx-bootstrap/positioning';

@Component({
    selector: 'bs-tooltip-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': '"show tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
        '[attr.id]': 'this.id',
        role: 'tooltip'
    },
    styles: [
        `
    :host.tooltip {
      display: block;
      pointer-events: none;
      position: absolute;
    }

    :host.tooltip .tooltip-arrow {
      position: absolute;
    }
  `
    ],
    template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `,
    standalone: true
})
export class TooltipContainerComponent implements AfterViewInit {
  classMap?: { [key: string]: boolean };
  placement?: string;
  containerClass?: string;
  animation?: boolean;
  id?: string;

  get _bsVersions(): IBsVersion {
    return getBsVer();
  }

  constructor(config: TooltipConfig) {
    Object.assign(this, config);
  }

  ngAfterViewInit(): void {
    this.classMap = { in: false, fade: false };
    if (this.placement) {
      if (this._bsVersions.isBs5) {
        this.placement =  PlacementForBs5[this.placement as keyof typeof PlacementForBs5];
      }

      this.classMap[this.placement] = true;
    }
    this.classMap[`tooltip-${this.placement}`] = true;

    this.classMap["in"] = true;
    if (this.animation) {
      this.classMap["fade"] = true;
    }

    if (this.containerClass) {
      this.classMap[this.containerClass] = true;
    }
  }
}
