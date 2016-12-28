import { Component } from '@angular/core';
import { PopoverConfig } from 'ng2-bootstrap';

// such override allows to keep some initial values

export function getAlertConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {placement: 'right', container: 'body', triggers: 'focus'});
}

@Component({
  selector: 'demo-popover-config',
  templateUrl: './config.html',
  providers: [{provide: PopoverConfig, useFactory: getAlertConfig}]
})
export class DemoPopoverConfigComponent {
}
