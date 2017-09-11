import { Component } from '@angular/core';

@Component({
  selector: 'demo-alert-timeout',
  templateUrl: './dismiss-on-timeout.html'
})
export class DemoAlertTimeoutComponent {
  public alerts: any = [];

  public add(): void {
    this.alerts.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }
}
