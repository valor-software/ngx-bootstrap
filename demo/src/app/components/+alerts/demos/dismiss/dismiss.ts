import { Component } from '@angular/core';

@Component({
  selector: 'demo-alert-dismiss',
  templateUrl: './dismiss.html'
})
export class DemoAlertDismissComponent {
  public alerts: any = [
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

  public reset(): void {
    this.alerts = this.alerts.map((alert: any) => Object.assign({}, alert));
  }
}
