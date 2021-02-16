import { Component } from '@angular/core';

@Component({
  selector: 'demo-alert-styling-local',
  templateUrl: './styling-local.html',
  /* tslint:disable no-unused-css*/
  styles: [
    `
  :host >>> .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ]
})
export class DemoAlertStylingLocalComponent {}
