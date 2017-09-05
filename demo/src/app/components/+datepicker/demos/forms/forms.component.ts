import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-forms',
  templateUrl: './forms.component.html'
})
export class DemoDatepickerFormsComponent {
  datepickerModel: Date;
  daterangepickerModel: Date[] = [];
}
