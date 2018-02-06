import { BaseComponent } from './base.component';

export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  exampleTitlesArr = [
    'Basic',
    'Custom date format',
    'Themes',
    'Locales',
    'Min-max',
    'Disabled (scratch, WIP)',
    'Forms',
    'Reactive forms'
  ];

  exampleDemosArr = [
    'demo-date-picker-popup',
    'demo-date-picker-custom-format',
    'demo-datepicker-color-theming',
    'demo-datepicker-change-locale',
    'demo-datepicker-min-max',
    'demo-datepicker-disabled',
    'demo-datepicker-forms',
    'demo-datepicker-reactive-forms'
  ];
}
