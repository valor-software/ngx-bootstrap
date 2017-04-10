import { Component } from '@angular/core';
import { DatepickerService } from './datepicker.service';
import { DatePickerTemplateOptions } from './datepicker-template-options.class';

@Component({
  selector: 'datepicker-menu-right',
  template: `
<button type="button" 
  class="btn btn-default btn-secondary btn-sm {{themeTemplate.floatRight}}" 
  tabindex="-1"
  [innerHTML]="themeTemplate.arrowRight">
</button>
  `
})
export class DatePickerMenuRightComponent {
  public themeTemplate: DatePickerTemplateOptions;

  public constructor(datePickerService: DatepickerService) {
    this.themeTemplate = datePickerService.getTemplateOptions();
  }
}
