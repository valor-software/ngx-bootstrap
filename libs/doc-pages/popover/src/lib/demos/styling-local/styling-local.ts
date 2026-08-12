import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-styling-local',
  templateUrl: './styling-local.html',
  styles: [
    `
:host .popover {
  background-color: #009688;
  color: #fff;
}
:host .popover>.arrow:after {
  border-top-color: #009688;
}
  `
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverStylingLocalComponent {}
