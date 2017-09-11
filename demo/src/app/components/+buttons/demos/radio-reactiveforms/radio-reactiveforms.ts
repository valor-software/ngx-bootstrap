import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'demo-buttons-radio-reactiveforms',
  templateUrl: './radio-reactiveforms.html'
})
export class DemoButtonsRadioReactiveFormsComponent implements OnInit {
  public myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      left: false,
      middle: true,
      right: false
    });
  }
}
