import { BaseComponent } from './base.component';

export class DropdownsPo extends BaseComponent {
  pageUrl = '/dropdowns';
  pageTitle = 'Dropdowns';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

  dropdownMenu = '.dropdown-menu';
  dropdownToggler = '.dropdown-toggle';
  showIndicator = 'show';

  exampleDemosArr = {
    basic: 'demo-dropdown-basic',
    triggerByTag: 'demo-dropdown-anchor-trigger',
    splitButton: 'demo-dropdown-split',
    disabledMenu: 'demo-dropdown-disabled'
  };
}
