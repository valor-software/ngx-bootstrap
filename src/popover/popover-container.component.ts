import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { getBsVer, IBsVersion } from 'ngx-bootstrap/utils';
import { PlacementForBs5, checkMargins, AvailableBSPositions } from 'ngx-bootstrap/positioning';
import { NgIf } from '@angular/common';

@Component({
    selector: 'popover-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.id]': 'popoverId',
        '[class]': '"popover in popover-" + _placement + " " + "bs-popover-" + _placement + " " + _placement + " " + containerClass + " " + checkMarginNecessity()',
        '[class.show]': '!_bsVersions.isBs3',
        '[class.bs3]': '_bsVersions.isBs3',
        role: 'tooltip',
        style: 'display:block; position:absolute'
    },
    styles: [
        `
      :host.popover.bottom > .arrow {
        margin-left: -4px;
      }

      :host .popover-arrow {
        position: absolute;
      }
    `
    ],
    templateUrl: './popover-container.component.html',
    standalone: true,
    imports: [NgIf]
})
export class PopoverContainerComponent {
  @Input() set placement(value: AvailableBSPositions) {
    if (!this._bsVersions.isBs5) {
      this._placement = value;
    } else {
      this._placement = PlacementForBs5[value as keyof typeof PlacementForBs5];
    }
  }

  @Input() title?: string;

  containerClass?: string;
  popoverId?: string;
  _placement: AvailableBSPositions = 'top';

  get _bsVersions(): IBsVersion {
    return getBsVer();
  }

  constructor(config: PopoverConfig) {
    Object.assign(this, config);
  }

  checkMarginNecessity(): string {
    return checkMargins(this._placement);
  }
}
