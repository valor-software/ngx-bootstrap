import { AccordionPo } from '../support/accordion.po';
import { AlertsPo } from '../support/alerts.po';
import { ButtonsPo } from '../support/buttons.po';
import { CarouselPo } from '../support/carousel.po';
import { CollapsePo } from '../support/collapse.po';
import { DatepickerPo } from '../support/datepicker.po';
import { DropdownsPo } from '../support/dropdowns.po';
import { ModalsPo } from '../support/modals.po';
import { PaginationPo } from '../support/pagination.po';
import { PopoverPo } from '../support/popover.po';
import { RatingPo } from '../support/rating.po';
import { SortablePo } from '../support/sortable.po';
import { TabsPo } from '../support/tabs.po';
import { TimepickerPo } from '../support/timepicker.po';
import { TooltipPo } from '../support/tooltip.po';
import { TypeaheadPo } from '../support/typeahead.po';

describe('Component content displaying test suite', () => {
  const componentsArray = [
    new AccordionPo(),
    new AlertsPo(),
    new ButtonsPo(),
    new CarouselPo(),
    new CollapsePo(),
    new DatepickerPo(),
    new DropdownsPo(),
    new ModalsPo(),
    new PaginationPo(),
    new PopoverPo(),
    new RatingPo(),
    new SortablePo(),
    new TabsPo(),
    new TimepickerPo(),
    new TooltipPo(),
    new TypeaheadPo()
  ];

  it('each page loads and displays it\'s title with link in it and usage example', () => {
    componentsArray.forEach(page => {
      page.navigateTo();

      cy.get(page.titleSel)
        .should('be.visible')
        .and('to.contain', page.pageTitle);

      cy.get(page.titleLinkSel)
        .should('be.enabled')
        .and('have.attr', 'href', page.ghLinkToComponent);

      cy.get(page.usageExSel)
        .should('be.visible')
        .and('to.contain', page.titleDefaultExample);

      cy.get(page.usageExCodeSel)
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });
});
