import { BaseComponent } from './base.component';

export class DropdownsPo extends BaseComponent {
  pageUrl = '/dropdowns';
  pageTitle = 'Dropdowns';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

  exampleDemosArr = {
    singleButton: 'demo-dropdown-basic',
    triggerByTag: 'demo-dropdown-basic-link',
    splitButton: 'demo-dropdown-split',
    manualTriggers: 'demo-dropdown-triggers-manual',
    disabledMenu: 'demo-dropdown-disabled',
    menuAlign: 'demo-dropdown-alignment',
    nestedDropdowns: 'demo-nested-dropdowns',
    appendToBody: 'demo-dropdown-container',
    dropup: 'demo-dropup',
    config: 'demo-dropdown-config'
  };
}
