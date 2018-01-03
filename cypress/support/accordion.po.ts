import { BaseComponent } from './base.component';

export class AccordionPo extends BaseComponent {

  pageUrl = 'accordion';

  locators = {
    BASIC: "demo-accordion-basic",
    DYNAMIC: "demo-accordion-dynamic",
    DISABLED: "demo-accordion-disabled"
  };

  getFirstPanel = (locator: string) => cy.get(locator).find('accordion-group.panel').first();

  clickButton = (locator: string) => cy.get(locator).find('.btn-primary').click()
}
