import { BaseComponent } from './base.component';

export class AccordionPo extends BaseComponent {
  pageUrl = '/accordion';
  pageTitle = 'Accordion';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';

  buttonEnableDisable = 'Enable / Disable first panel';
  buttonPanelToggler = 'Toggle last panel';
  buttonAddItem = 'Add';

  exampleDemosArr = {
    basic: 'demo-accordion-basic',
    disabled: 'demo-accordion-disabled',
    dynamic: 'demo-accordion-dynamic',
    oneAtATime: 'demo-accordion-one-time',
    styling: 'demo-accordion-styling',
    config: 'demo-accordion-config'
  };

  getAccordionPanel(locator: string, panelNum: number) {
    return cy.get(locator).find('accordion-group').eq(panelNum);
  }
}
