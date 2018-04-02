import { BaseComponent } from './base.component';

export class AccordionPo extends BaseComponent {
  pageUrl = '/accordion';
  pageTitle = 'Accordion';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';

  openClass = 'panel-open';
  disabledPanelText = '.text-muted';
  panelCard = '.card';
  panelBody = '.panel-body';

  exampleDemosArr = {
    basic: 'demo-accordion-basic',
    disabled: 'demo-accordion-disabled',
    initiallyOpened: 'demo-accordion-opened',
    dynamicAccGroup: 'demo-accordion-dynamic',
    dynamicBody: 'demo-accordion-dynamic-body',
    manualToggle: 'demo-accordion-manual-toggle',
    oneAtATime: 'demo-accordion-one-time',
    styling: 'demo-accordion-styling',
    config: 'demo-accordion-config'
  };

  getAccordionPanel(locator: string, panelNum: number) {
    return cy.get(locator).find('accordion-group').eq(panelNum);
  }
}
