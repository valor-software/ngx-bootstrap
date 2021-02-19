import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-readonly',
  templateUrl: './readonly.html'
})
export class DemoTimepickerReadonlyComponent {
  isMeridian = false;
  readonly = true;
  myTime = new Date();
}
