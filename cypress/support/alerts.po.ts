import { BaseComponent } from './base.component';

export class AlertsPo extends BaseComponent {
  pageUrl = '/alerts';
  pageTitle = 'Alerts';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/alert';

  alertClass = '.alert';
  linkClass = '.alert-link';
  heading = '.alert-heading';
  dismissOption = '.close';
  textWrapper = 'span';

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
