import { BaseComponent } from './base.component';

export class CollapsePo extends BaseComponent {
  pageUrl = '/collapse';
  pageTitle = 'Collapse';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/collapse';

  collapseClass = '.collapse';
  showIndicator = 'in show';

  exampleDemosArr = {
    basic: 'collapse-demo'
  };
}
