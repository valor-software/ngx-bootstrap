import { Component, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-date-picker-manual',
  templateUrl: './datepicker-manual.html'
})
export class DemoDatepickerManualComponent {
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;

  myForm = new FormGroup({
    myDate: new FormControl(new Date())
  });

  @HostListener('window:scroll', ['$event'])
  onScrollEvent() {
    this.datepicker.hide();
  }
}
