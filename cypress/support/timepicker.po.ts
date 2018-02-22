import { BaseComponent } from './base.component';

export class TimepickerPo extends BaseComponent {
  pageUrl = '/timepicker';
  pageTitle = 'Timepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker';

  btnAmPm = '.btn-default';

  exampleDemosArr = {
    meridian: 'demo-timepicker-meridian'
  };
}
