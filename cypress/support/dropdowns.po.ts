import { BaseComponent } from './base.component';

export class DropdownsPo extends BaseComponent {
  pageUrl = '/dropdowns';
  pageTitle = 'Dropdowns';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

  exampleTitlesArr = [
    'Single button dropdowns',
    'Trigger by tag \<\a\>',
    'Split button dropdowns',
    'Manual triggers',
    'Disabled menu',
    'Menu alignment',
    'Nested dropdowns (experimental)',
    'Append to body',
    'Dropup variation',
    'Configuring defaults'
  ];

  exampleDemosArr = [
    'demo-dropdown-basic',
    'demo-dropdown-basic-link',
    'demo-dropdown-split',
    'demo-dropdown-triggers-manual',
    'demo-dropdown-disabled',
    'demo-dropdown-alignment',
    'demo-nested-dropdowns',
    'demo-dropdown-container',
    'demo-dropup',
    'demo-dropdown-config'
  ];
}
