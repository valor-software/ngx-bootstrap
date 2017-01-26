import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bs-date-picker-container',
  template: `<bs-datepicker></bs-datepicker>`,
  // tslint:disable
  host: {
    'class': 'dropdown open',
    style: 'position: absolute;display: block;'
  },
  // tslint: enable
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsDatePickerContainer {
}
