import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-datepicker-trigger-by-isopen',
  templateUrl: './trigger-by-isopen-property.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDatepickerByIsOpenPropComponent {
  isOpen = false;
}

