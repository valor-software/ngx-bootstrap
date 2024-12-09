import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

type ExampleAlertType = { type: string; msg: SafeHtml };

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-alert-dynamic-html',
  templateUrl: './dynamic-html.html',
  standalone: false
})
export class DemoAlertDynamicHtmlComponent {
  alerts: ExampleAlertType[];

  constructor(sanitizer: DomSanitizer) {
    this.alerts = [
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
    ].map(
      (alert): ExampleAlertType => ({
        type: alert.type,
        msg: sanitizer.bypassSecurityTrustHtml(alert.msg)
      })
    );
  }
}
