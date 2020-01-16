import { Component } from '@angular/core';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';

// such override allows to keep some initial values

export function getAlertConfig(): TooltipConfig {
  return Object.assign(new TooltipConfig(), {
    placement: 'right',
    container: 'body',
    delay: 500,
    hideAfterDelay: 3000
  });
}

@Component({
  selector: 'demo-tooltip-config',
  templateUrl: './config.html',
  providers: [{ provide: TooltipConfig, useFactory: getAlertConfig }]
})
export class DemoTooltipConfigComponent {}
