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
    if (!value) {
      return null;
    }
    const hours = value.getHours();
    if (hours < 11 || hours > 12) {
      return { outOfRange: true };
    }

    return null;
  });
}
