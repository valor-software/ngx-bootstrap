import { BaseComponent } from './base.component';

export class TimepickerPo extends BaseComponent {
  pageUrl = '/timepicker';
  pageTitle = 'Timepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker';

  exampleDemosArr = {
    basic: 'demo-timepicker-basic',
    meridian: 'demo-timepicker-meridian',
    minMax: 'demo-timepicker-min-max',
    minSecToggler: 'demo-timepicker-seconds',
    disabled: 'demo-timepicker-disabled',
    customStep: 'demo-timepicker-custom',
    customValidation: 'demo-timepicker-custom-validation',
    dynamic: 'demo-timepicker-dynamic',
    mouseWheelKeys: 'demo-timepicker-mousewheel-arrowkeys',
    spinners: 'demo-timepicker-spinners',
    config: 'demo-timepicker-config'
  };
}
