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
import { ProgressbarPo } from '../support/progressbar.po';
import { RatingPo } from '../support/rating.po';
import { SortablePo } from '../support/sortable.po';
import { TabsPo } from '../support/tabs.po';
import { TimepickerPo } from '../support/timepicker.po';
import { TooltipPo } from '../support/tooltip.po';
import { TypeaheadPo } from '../support/typeahead.po';

describe('Snapshot test', () => {
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
    new ProgressbarPo(),
    new RatingPo(),
    new SortablePo(),
    new TabsPo(),
    new TimepickerPo(),
    new TooltipPo(),
    new TypeaheadPo()
  ];

  componentsArray.forEach(page => {
    it(`navigate to each Demo and check example: ${page.pageUrl}`, () => {
      page.navigateTo();
      cy.get('ng-sample-box').each(demo => {
        const subtitle = demo.parent().find('h3').text();

        cy.wrap(demo).find(`.bd-example`)
          .eyesOpen({
            appName: 'NGX-bootstrap',
            concurrency: 5,
            matchLevel: 'Strict',
            testName: `${page.pageUrl} - ${subtitle}`,
            browser: [{
              name: 'chrome',
              width: 360,
              height: 640
            }, {
              name: 'chrome',
              width: 1366,
              height: 768
            }, {
              name: 'chrome',
              width: 768,
              height: 1024
            }, {
              name: 'firefox',
              width: 360,
              height: 640
            }, {
              name: 'firefox',
              width: 1366,
              height: 768
            }, {
              name: 'firefox',
              width: 768,
              height: 1024
            }]
          })
          .eyesCheckWindow({
            sizeMode: 'selector',
            selector: `.bd-example`,
            tag: `${page.pageUrl}-${subtitle}`,
            sendDom: false,
          })
          .eyesClose();
      });
    });
  });
});
