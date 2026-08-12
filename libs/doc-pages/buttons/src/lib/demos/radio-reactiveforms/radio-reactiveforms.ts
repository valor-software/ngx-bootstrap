import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-buttons-radio-reactiveforms',
  templateUrl: './radio-reactiveforms.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoButtonsRadioReactiveFormsComponent implements OnInit {
  myForm?: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      radio: 'C'
    });
  }
}
