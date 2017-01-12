import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { isBs3 } from '../utils/ng2-bootstrap-config';

@Component({
  selector: 'popover-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {
    '[class]': '"popover in popover-" + placement + " " + placement',
    '[class.show]': '!isBs3',
    role: 'tooltip',
    style: 'display:block;'
  },
  template: `
<div class="popover-arrow arrow"></div>
<h3 class="popover-title" *ngIf="title">{{title}}</h3><div class="popover-content"><ng-content></ng-content></div>
    `
})
export class PopoverContainerComponent {
  @Input() public placement: string;
  @Input() public title: string;

  public get isBs3(): boolean {
    return isBs3();
  }

  public constructor(config: PopoverConfig) {
    Object.assign(this, config);
  }
}
