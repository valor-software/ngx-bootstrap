import { BaseComponent } from './base.component';

export class AccordionPo extends BaseComponent {
  pageUrl = '/accordion';
  pageTitle = 'Accordion';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  buttonEnableDisable = 'Enable / Disable first panel';
  buttonPanelToggler = 'Toggle last panel';
  buttonAddItem = 'Add';
  accordionDemosArr = [
    'demo-accordion-basic',
    'demo-accordion-disabled',
    'demo-accordion-dynamic',
    'demo-accordion-dynamic-body',
    'demo-accordion-manual-toggle',
    'demo-accordion-one-time',
    'demo-accordion-styling',
    'demo-accordion-config'
  ];

  getAccordionPanel(locator: string, panelNum: number) {
    return cy.get(locator).find('accordion-group').eq(panelNum);
  }
}
