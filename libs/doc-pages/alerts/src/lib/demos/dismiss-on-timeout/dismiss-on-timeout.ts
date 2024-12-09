import { Component } from '@angular/core';

type ExampleAlertType = { type: string; msg: string; timeout: number };

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-alert-timeout',
  templateUrl: './dismiss-on-timeout.html',
  standalone: false
})
export class DemoAlertTimeoutComponent {
  alerts: ExampleAlertType[] = [
    {
      type: 'success',
      msg: `Well done! You successfully read this important alert message. (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    }
  ];

  add(): void {
    this.alerts.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }

  onClosed(dismissedAlert: ExampleAlertType): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
