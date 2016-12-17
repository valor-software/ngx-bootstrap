import { Component } from '@angular/core';

@Component({
  selector: 'demo-alert-dynamic-html',
  templateUrl: './dynamic-html.html'
})
export class DemoAlertDynamicHtmlComponent {
  public alerts: any = [
    {
      type: 'success',
      msg: `<strong>Well done!</strong> You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `<strong>Heads up!</strong> This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `<strong>Warning!</strong> Better check yourself, you're not looking too good.`
    }
  ];
}
