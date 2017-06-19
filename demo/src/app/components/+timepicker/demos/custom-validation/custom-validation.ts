import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'demo-timepicker-custom-validation',
  templateUrl: './custom-validation.html'
})
export class DemoTimepickerCustomValidationComponent {
  public myTime: Date;

  public ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;
    console.log('control', control);
    return control;
  });
}
