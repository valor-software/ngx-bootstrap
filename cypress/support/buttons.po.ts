import { BaseComponent } from './base.component';

export class ButtonsPo extends BaseComponent {
  pageUrl = '/buttons';
  pageTitle = 'Buttons';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/buttons';

  exampleDemosArr = {
    basic: 'demo-buttons-basic',
    checkbox: 'demo-buttons-checkbox',
    checkboxWithForms: 'demo-buttons-checkbox-reactiveforms',
    radioBtn: 'demo-buttons-radio',
    radioBtnWithForms: 'demo-buttons-radio-reactiveforms',
    disabled: 'demo-buttons-disabled'
  };
}
