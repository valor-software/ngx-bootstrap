import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-arrowkeys',
  templateUrl: './arrowkeys.html'
})
export class DemoTimepickerArrowkeysComponent {
  allowArrowKeys = true;
  myTime = new Date();
}
