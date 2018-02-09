import { BaseComponent } from './base.component';

export class PopoverPo extends BaseComponent {
  pageUrl = '/popover';
  pageTitle = 'Popover';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';

  exampleDemosArr = {
    basic: 'demo-popover-basic',
    fourDirections: 'demo-popover-four-directions',
    dismiss: 'demo-popover-dismiss',
    dynamicContent: 'demo-popover-dynamic',
    dynamicHtml: 'demo-popover-dynamic-html',
    appendToBody: 'demo-popover-container',
    config: 'demo-popover-config',
    outsideClick: 'demo-popover-outside-click',
    customTriggers: 'demo-popover-triggers-custom',
    manualTriggers: 'demo-popover-triggers-manual',
    componentStyling: 'demo-popover-styling-local',
    customClass: 'demo-popover-class'
  };
}
