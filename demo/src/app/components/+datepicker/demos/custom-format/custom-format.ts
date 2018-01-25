import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'demo-date-picker-custom-format',
  templateUrl: './custom-format.html'
})
export class DemoDatePickerCustomFormatComponent {
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  myForm = new FormGroup({
    myDate: new FormControl(new Date())
  });
}
