import { Component } from '@angular/core';

@Component({
  selector: 'demo-tooltip-styling-local',
  templateUrl: './styling-local.html',
  /* tslint:disable no-unused-css*/
  styles: [`
:host >>> .tooltip-inner {
  background-color: #009688;
  color: #fff;
}
:host >>> .tooltip .tooltip-arrow {
  border-bottom-color: #009688;
}
  `]
})
export class DemoTooltipStylingLocalComponent {
}
