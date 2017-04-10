import { Component } from '@angular/core';
import { DatepickerService } from './datepicker.service';
import { DatePickerTemplateOptions } from './datepicker-template-options.class';

@Component({
  selector: 'datepicker-menu-left',
  template: `
<button type="button" 
  class="btn btn-default btn-secondary btn-sm {{themeTemplate.floatLeft}}" 
  tabindex="-1"
  [innerHTML]="themeTemplate.arrowLeft">
 </button>
  `
})
export class DatePickerMenuLeftComponent {
  public themeTemplate: DatePickerTemplateOptions;

  public constructor(datePickerService: DatepickerService) {
    this.themeTemplate = datePickerService.getTemplateOptions();
  }
}
