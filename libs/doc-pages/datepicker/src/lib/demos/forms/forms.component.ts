import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-forms',
  templateUrl: './forms.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDatepickerFormsComponent {
  datepickerModel?: Date;
  daterangepickerModel?: Date[];
}
