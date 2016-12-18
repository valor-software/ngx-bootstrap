import { Component } from '@angular/core';
import { AlertConfig } from 'ng2-bootstrap';

// such override allows to keep some initial values
const newDefaults = Object.assign(new AlertConfig(), {type: 'success'});

@Component({
  selector: 'demo-alert-config',
  templateUrl: './config.html',
  providers: [{provide: AlertConfig, useValue: newDefaults}]
})
export class DemoAlertConfigComponent {
}
