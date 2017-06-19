import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'demo-buttons-radio-reactiveforms',
  templateUrl: './radio-reactiveforms.html'
})
export class DemoButtonsRadioReactiveFormsComponent {
  public myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      myControl: ['Middle', Validators.required]
    });
  }
}
