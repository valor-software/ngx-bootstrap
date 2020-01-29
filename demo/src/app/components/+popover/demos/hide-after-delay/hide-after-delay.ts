import { Component } from '@angular/core';
import { PopoverConfig } from 'ngx-bootstrap/popover';

export function getConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'right',
    container: 'body',
    triggers: 'focus',
    hideAfterDelay: 3000
  });
}

@Component({
  selector: 'demo-popover-hide-after-delay',
  templateUrl: './hide-after-delay.html',
  providers: [{ provide: PopoverConfig, useFactory: getConfig }]

})
export class DemoPopoverHideAfterDelayComponent {}
