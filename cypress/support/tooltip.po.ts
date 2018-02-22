import { BaseComponent } from './base.component';

export class TooltipPo extends BaseComponent {
  pageUrl = '/tooltip';
  pageTitle = 'Tooltip';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';

  togglerTooltip = 'button';
  containerTooltip = 'bs-tooltip-container';

  exampleDemosArr = {
    basic: 'demo-tooltip-basic'
  };
}
