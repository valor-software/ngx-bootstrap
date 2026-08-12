import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-timepicker-form',
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTimepickerFormComponent {
  form = new UntypedFormGroup({
    myControl: new UntypedFormControl(new Date())
  });
}
