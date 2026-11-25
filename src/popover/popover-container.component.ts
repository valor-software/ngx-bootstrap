import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { getBsVer, IBsVersion } from 'ngx-bootstrap/utils';
import { PlacementForBs5, checkMargins, AvailableBSPositions } from 'ngx-bootstrap/positioning';


@Component({
    selector: 'popover-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.id]': 'popoverId',
        '[class]': '"popover in popover-" + _placement + " " + "bs-popover-" + _placement + " " + _placement + " " + containerClass + " " + checkMarginNecessity()',
        '[class.show]': '!_bsVersions["isBs3"]',
        '[class.bs3]': '_bsVersions["isBs3"]',
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
    imports: []
})
export class PopoverContainerComponent {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  readonly placementInput = input<AvailableBSPositions | undefined>(undefined, { alias: 'placement' });

  title?: string;

  containerClass?: string;
  popoverId?: string;
  _placement: AvailableBSPositions = 'top';

  get _bsVersions(): IBsVersion {
    return getBsVer();
  }

  constructor(config: PopoverConfig) {
    Object.assign(this, config);
  }

  /**
   * ComponentLoader hands the placement over by assigning this property,
   * it does not go through the `placement` input binding
   */
  set placement(value: AvailableBSPositions) {
    this._placement = this._bsVersions.isBs5
      ? PlacementForBs5[value as keyof typeof PlacementForBs5]
      : value;
  }

  ngOnInit(): void {
    const placementValue = this.placementInput();
    if (placementValue) {
      this.placement = placementValue;
    }
  }

  checkMarginNecessity(): string {
    return checkMargins(this._placement);
  }
}
