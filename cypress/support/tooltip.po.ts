import { BaseComponent } from './base.component';

export class TooltipPo extends BaseComponent {
  pageUrl = '/tooltip';
  pageTitle = 'Tooltip';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';
  exampleDemosArr = {
    basic: 'demo-tooltip-basic',
    fourDirections: 'demo-tooltip-four-directions',
    dismissOnClick: 'demo-tooltip-dismiss',
    dynamicContent: 'demo-tooltip-dynamic',
    dynamicHtml: 'demo-tooltip-dynamic-html',
    appendToBody: 'demo-tooltip-container',
    config: 'demo-tooltip-config',
    customTriggers: 'demo-tooltip-triggers-custom',
    manualTriggers: 'demo-tooltip-triggers-manual',
    componentStyling: 'demo-tooltip-styling-local',
    customClass: 'demo-tooltip-class',
    tooltipDelay: 'demo-tooltip-delay'
  };
}
