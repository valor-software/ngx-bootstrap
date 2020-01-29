import { Component } from '@angular/core';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';

export function getConfig(): TooltipConfig {
  return Object.assign(new TooltipConfig(), {
    placement: 'right',
    container: 'body',
    hideAfterDelay: 3000
  });
}

@Component({
  selector: 'demo-tooltip-hide-after-delay',
  templateUrl: './hide-after-delay.html',
  providers: [{ provide: TooltipConfig, useFactory: getConfig }]
})
export class DemoTooltipHideAfterDelayComponent {}
