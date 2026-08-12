import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-alert-styling-local',
  templateUrl: './styling-local.html',
  styles: [
    `
  :host .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoAlertStylingLocalComponent {}
