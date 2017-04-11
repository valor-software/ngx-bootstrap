import { Injectable } from '@angular/core';
import { isBs3 } from '../utils/ng2-bootstrap-config';
import { DatePickerTemplateOptions } from './datepicker-template-options.class';

@Injectable()
export class DatepickerService {

  getTemplateOptions() {
    return isBs3() ?
      new DatePickerTemplateOptions({
        arrowLeft: `<i class="glyphicon glyphicon-chevron-left"></i>`,
        arrowRight: `<i class="glyphicon glyphicon-chevron-right"></i>`,
        floatLeft: 'pull-left',
        floatRight: 'pull-right',
        btnClasses: 'btn-default'
      }) :
      new DatePickerTemplateOptions({
        arrowLeft: '&lt',
        arrowRight: '&gt',
        floatLeft: 'float-left',
        floatRight: 'float-right',
        btnClasses: 'btn-secondary'
      });
  }
}
