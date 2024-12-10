import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-arrowkeys',
  templateUrl: './arrowkeys.html',
  standalone: false
})
export class DemoTimepickerArrowkeysComponent {
  allowArrowKeys = true;
  myTime = new Date();
}
