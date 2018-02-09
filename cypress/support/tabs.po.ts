import { BaseComponent } from './base.component';

export class TabsPo extends BaseComponent {
  pageUrl = '/tabs';
  pageTitle = 'Tabs';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';
  exampleDemosArr = {
    staticTabs: 'demo-tabs-basic',
    manualSelect: 'demo-tabs-manual',
    dynamicTabs: 'demo-tabs-dynamic',
    pills: 'demo-tabs-pills',
    verticalPills: 'demo-tabs-vertical-pills',
    justified: 'demo-tabs-justified',
    styling: 'demo-tabs-styling',
    config: 'demo-tabs-config'
  };
}
