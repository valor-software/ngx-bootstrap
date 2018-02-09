import { BaseComponent } from './base.component';

export class AlertsPo extends BaseComponent {
  pageUrl = '/alerts';
  pageTitle = 'Alerts';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/alert';

  linkClass = '.alert-link';
  buttonToggler = 'Toggle dismissible';
  buttonReset = 'Reset';
  buttonChangeText = 'Change text';

  dynamicAlertText = [
    'You successfully read this important alert message.',
    'Now this text is different from what it was before. Go ahead and click the button one more time',
    'Well done! Click reset button'
  ];

  exampleDemosArr = {
    basic: 'demo-alert-basic',
    link: 'demo-alert-link',
    content: 'demo-alert-content',
    dismissing: 'demo-alert-dismiss',
    dynamicHtml: 'demo-alert-dynamic-html',
    dynamicContent: 'demo-alert-content-html',
    dismissTimeout: 'demo-alert-timeout',
    globalStyling: 'demo-alert-styling-global',
    localStyling: 'demo-alert-styling-local',
    config: 'demo-alert-config'
  };
}
