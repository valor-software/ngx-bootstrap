import { Component, Input } from '@angular/core';
import { DatePickerTemplateOptions } from './datepicker-template-options.class';

@Component({
  selector: 'datepicker-menu-right',
  template: `
<button type="button" 
  class="btn btn-default btn-secondary btn-sm {{theme.floatRight}}" 
  tabindex="-1"
  [innerHTML]="theme.arrowRight">
</button>
  `
})
export class DatePickerMenuRightComponent {
  @Input() theme: DatePickerTemplateOptions;
}
