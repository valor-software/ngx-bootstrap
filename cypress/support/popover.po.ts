import { BaseComponent } from './base.component';

export class PopoverPo extends BaseComponent {
  pageUrl = '/popover';
  pageTitle = 'Popover';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';

  exampleTitlesArr = [
    'Basic',
    'Four directions',
    'Dismiss on next click',
    'Dynamic Content',
    'Dynamic Html',
    'Append to body',
    'Configuring defaults',
    'Outside click',
    'Custom triggers',
    'Manual triggering',
    'Component level styling',
    'Custom class'
  ];

  exampleDemosArr = [
    'demo-popover-basic',
    'demo-popover-four-directions',
    'demo-popover-dismiss',
    'demo-popover-dynamic',
    'demo-popover-dynamic-html',
    'demo-popover-container',
    'demo-popover-config',
    'demo-popover-outside-click',
    'demo-popover-triggers-custom',
    'demo-popover-triggers-manual',
    'demo-popover-styling-local',
    'demo-popover-class'
  ];
}
