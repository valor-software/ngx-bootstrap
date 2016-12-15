import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover-config';

@Component({
  selector: 'popover-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {'[class]': '"popover in popover-" + placement', role: 'tooltip'},
  template: `
<div class="popover-arrow"></div>
<h3 class="popover-title">{{title}}</h3><div class="popover-content"><ng-content></ng-content></div>
    `
})
export class PopoverContainerComponent {
  @Input() public placement: string;
  @Input() public title: string;

  public constructor(config: PopoverConfig) {
    Object.assign(this, config);
  }
}
