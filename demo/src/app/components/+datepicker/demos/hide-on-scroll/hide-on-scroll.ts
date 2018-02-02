import { Component, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'demo-date-picker-hide-on-scroll',
  templateUrl: './hide-on-scroll.html'
})
export class DemoDatepickerHideOnScrollComponent {
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;

  myForm = new FormGroup({
    myDate: new FormControl(new Date())
  });

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }
}
