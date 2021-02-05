import { DatepickerPo } from '../support/datepicker.po';
import { DropdownsPo } from '../support/dropdowns.po';
import { ModalsPo } from '../support/modals.po';
import { TabsPo } from '../support/tabs.po';
import { TypeaheadPo } from '../support/typeahead.po';

describe('Snapshot testing', () => {
  const componentsArray = [
    new DatepickerPo(),
    new DropdownsPo(),
    new ModalsPo(),
    new TypeaheadPo(),
    new TabsPo()
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
            showLogs: true,
            testName: `${page.pageUrl} - ${subtitle}`,
            browser: [{
              name: 'chrome',
              browserVersion: 'latest',
              width: 360,
              height: 640
            }, {
              name: 'firefox',
              browserVersion: 'latest',
              width: 360,
              height: 640
            },
              {
              name: 'firefox',
              browserVersion: 'latest',
              width: 1366,
              height: 768
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
