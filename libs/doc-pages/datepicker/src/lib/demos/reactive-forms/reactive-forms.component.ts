import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDatepickerReactiveFormsComponent implements OnInit {
  myForm?: UntypedFormGroup;
  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
  }
}
