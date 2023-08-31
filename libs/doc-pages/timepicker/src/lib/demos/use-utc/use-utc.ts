import { Component } from '@angular/core';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    useUtc: true
  });
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-use-utc',
  templateUrl: './use-utc.html',
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class DemoTimepickerUseUtcComponent {
  myTime: Date = new Date();
}
