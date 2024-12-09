import { Component } from '@angular/core';

type ExampleAlertType = { type: string; msg: string };

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-alert-dismiss',
  templateUrl: './dismiss.html',
  standalone: false
})
export class DemoAlertDismissComponent {
  dismissible = true;
  defaultAlerts: ExampleAlertType[] = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];
  alerts = this.defaultAlerts;

  reset(): void {
    this.alerts = this.defaultAlerts;
  }

  onClosed(dismissedAlert: ExampleAlertType): void {
    this.alerts = this.alerts.filter((alert) => alert !== dismissedAlert);
  }
}
