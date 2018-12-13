import { Component } from '@angular/core';

@Component({
  selector: 'demo-datepicker-inline',
  templateUrl: './inline-datepicker.component.html'
})
export class DemoDatepickerInlineComponent {
  bsInlineValue = new Date();
}
