import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-forms',
  templateUrl: './forms.component.html',
  standalone: false
})
export class DemoDatepickerFormsComponent {
  datepickerModel?: Date;
  daterangepickerModel?: Date[];
}
