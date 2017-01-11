import { Component } from '@angular/core';
import { ProgressbarConfig } from 'ng2-bootstrap';

// such override allows to keep some initial values

export function getProgressbarConfig(): ProgressbarConfig {
  return Object.assign(new ProgressbarConfig(), {animate: false, max: 150});
}

@Component({
  selector: 'demo-progressbar-config',
  templateUrl: './config.html',
  providers: [{provide: ProgressbarConfig, useFactory: getProgressbarConfig}]
})
export class DemoProgressbarConfigComponent {
}
