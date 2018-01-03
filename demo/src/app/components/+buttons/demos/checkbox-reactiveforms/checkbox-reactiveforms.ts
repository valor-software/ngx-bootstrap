import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'demo-buttons-checkbox-reactiveforms',
  templateUrl: './checkbox-reactiveforms.html'
})
export class DemoButtonsCheckboxReactiveFormsComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      left: false,
      middle: true,
      right: false
    });
  }
}
