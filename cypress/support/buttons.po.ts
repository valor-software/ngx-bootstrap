import { BaseComponent } from './base.component';

export class ButtonsPo extends BaseComponent {
  pageUrl = '/buttons';
  pageTitle = 'Buttons';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/buttons';

  exampleTitlesArr = [
    'Single button',
    'Checkbox',
    'Checkbox with Reactive Forms',
    'Radio & Uncheckable Radio',
    'Radio with Reactive Forms',
    'Disabled Buttons'
  ];

  exampleDemosArr = [
    'demo-buttons-basic',
    'demo-buttons-checkbox',
    'demo-buttons-checkbox-reactiveforms',
    'demo-buttons-radio',
    'demo-buttons-radio-reactiveforms',
    'demo-buttons-disabled'
  ];
}
