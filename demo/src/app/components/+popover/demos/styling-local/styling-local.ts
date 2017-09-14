import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-styling-local',
  templateUrl: './styling-local.html',
  /* tslint:disable no-unused-css*/
  styles: [
    `
:host >>> .popover {
  background-color: #009688;
  color: #fff;
}
:host >>> .popover>.arrow:after {
  border-top-color: #009688;
}
  `
  ]
})
export class DemoPopoverStylingLocalComponent {}
