import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-radio-reactiveforms',
  templateUrl: './radio-reactiveforms.html'
})
export class DemoButtonsRadioReactiveFormsComponent implements OnInit {
  myForm?: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      radio: 'C'
    });
  }
}
