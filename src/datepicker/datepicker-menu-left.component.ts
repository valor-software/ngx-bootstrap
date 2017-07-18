import { Component, Input } from '@angular/core';
import { DatePickerTemplateOptions } from './datepicker-template-options.class';

@Component({
  selector: 'datepicker-menu-left',
  template: `
<button type="button" 
  class="btn btn-default btn-secondary btn-sm {{theme.floatLeft}}" 
  tabindex="-1"
  [innerHTML]="theme.arrowLeft">
 </button>
  `
})
export class DatePickerMenuLeftComponent {
  @Input() theme: DatePickerTemplateOptions;
}
