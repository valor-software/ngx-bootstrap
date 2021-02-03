import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { isBs3 } from 'ngx-bootstrap/utils';

@Component({
  selector: 'popover-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {
    '[attr.id]': 'popoverId',
    '[class]':
      '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
    '[class.show]': '!isBs3',
    '[class.bs3]': 'isBs3',
    role: 'tooltip',
    style: 'display:block;'
  },
  styles: [
    `
    :host.bs3.popover-top {
      margin-bottom: 10px;
    }
    :host.bs3.popover.top>.arrow {
      margin-left: -2px;
    }
    :host.bs3.popover.top {
      margin-bottom: 10px;
    }
    :host.popover.bottom>.arrow {
      margin-left: -4px;
    }
    :host.bs3.bs-popover-left {
      margin-right: .5rem;
    }
    :host.bs3.bs-popover-right .arrow, :host.bs3.bs-popover-left .arrow{
      margin: .3rem 0;
    }
    `
  ],
  templateUrl: './popover-container.component.html'
})
export class PopoverContainerComponent {
  @Input() placement: string;
  @Input() title: string;
  containerClass: string;
  popoverId: string;

  get isBs3(): boolean {
    return isBs3();
  }

  constructor(config: PopoverConfig) {
    Object.assign(this, config);
  }
}
