import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'demo-datepicker-reactive-forms',
  templateUrl: './reactive-forms.component.html'
})
export class DemoDatepickerReactiveFormsComponent implements OnInit {
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
  }
}
