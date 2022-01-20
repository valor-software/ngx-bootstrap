import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-form',
  templateUrl: './form.html'
})
export class DemoTimepickerFormComponent {
  form = new FormGroup({
    myControl: new FormControl(new Date())
  });
}
