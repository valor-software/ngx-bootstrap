import { AccordionPo } from '../support/accordion.po';

describe('Accordion page test suite', () => {
  const accordion = new AccordionPo();

  beforeEach(() => accordion.navigateTo());

  describe('Basic accordion', () => {
    const basicDemo = accordion.exampleDemosArr.basic;

    it('panels open content at first click', () => {
      accordion.getAccordionPanel(basicDemo, 0).as('firstPanel')
        .click();

      cy.get('@firstPanel')
        .should('have.class', accordion.openClass);

      accordion.getAccordionPanel(basicDemo, 3).as('fourthPanel')
        .click();

      cy.get('@fourthPanel')
        .should('have.class', accordion.openClass);
    });

    it('after double click panels are closed', () => {
      accordion.getAccordionPanel(basicDemo, 0).as('firstPanel')
        .dblclick();
      accordion.getAccordionPanel(basicDemo, 1).as('secondPanel')
        .dblclick();

      cy.get('@firstPanel')
        .should('not.to.have.class', accordion.openClass);
      cy.get('@secondPanel')
        .should('not.to.have.class', accordion.openClass);
    });
  });

  describe('Group opening event', () => {
    const groupOpenEvent = accordion.exampleDemosArr.openEvent;
    const openLog = 'Accordion has been opened';
    const closeLog = 'Accordion has been closed';

    it('click on panel with event listener throws event log in console', () => {
      cy.window().then(win => {
        const consoleSpy = cy.spy(win.console, 'log');
        accordion.getAccordionPanel(groupOpenEvent, 1).as('secondPanel').click();
        cy.wrap(consoleSpy)
          .should('have.been.called.with', openLog);

        cy.get('@secondPanel').click();
        cy.wrap(consoleSpy)
          .should('have.been.called.with', closeLog);
      });
    });
  });

  describe('Custom HTML', () => {
    const customHTML = accordion.exampleDemosArr.customHtml;
    const htmlElemSel = '.badge';

    it('first accordion panel-heading contains custom html', () => {
      accordion.getAccordionPanel(customHTML, 0).find(accordion.accordionHeading)
        .children(htmlElemSel).should('to.be.visible');
    });

    it('second accordion panel-body contains custom html', () => {
      accordion.getAccordionPanel(customHTML, 1).as('secondPanel').click();
      cy.get('@secondPanel').find('.panel-body')
        .children(htmlElemSel).should('to.be.visible');
    });
  });

  describe('Disabled accordion', () => {
    const disabledDemo = accordion.exampleDemosArr.disabled;
    const buttonEnableDisable = 'Enable / Disable first panel';

    it('first panel can be disabled or enabled', () => {
      accordion.clickByText(disabledDemo, buttonEnableDisable);

      accordion.getAccordionPanel(disabledDemo, 0).as('firstPanel').find(accordion.disabledPanelText)
        .should('to.be.exist');

      accordion.clickByText(disabledDemo, buttonEnableDisable);

      cy.get('@firstPanel').find(accordion.disabledPanelText)
        .should('not.to.be.exist');
    });
  });

  describe('Initially opened', () => {
    const openedByDefault = accordion.exampleDemosArr.initiallyOpened;

    it('second accordion panel is opened by default', () => {
      accordion.getAccordionPanel(openedByDefault, 1).should('to.have.class', accordion.openClass);
    });
  });

  describe('Dynamic accordion', () => {
    const dynamicDemo = accordion.exampleDemosArr.dynamicAccGroup;
    const buttonAddGroup = 'Add Group Item';

    it('new accordion group can be added by click on button', () => {
      cy.get(`${ dynamicDemo } accordion-group`).as('arrPanels')
        .should('have.length', 2);
      accordion.clickByText(dynamicDemo, buttonAddGroup);
      cy.get('@arrPanels')
        .should('have.length', 3);
    });
  });

  describe('Dynamic body content', () => {
    const dynamicBody = accordion.exampleDemosArr.dynamicBody;
    const buttonAddItem = 'Add';

    it('items in first collapse-panel can be added dynamic', () => {
      accordion.getAccordionPanel(dynamicBody, 0).as('dynamicItemsPanel').click();

      cy.get('@dynamicItemsPanel').find('.panel-body div')
        .should('have.length', 3);

      accordion.clickByText('@dynamicItemsPanel', buttonAddItem);

      cy.get('@dynamicItemsPanel').find('.panel-body div')
        .should('have.length', 4);
    });
  });

  describe('Manual toggle', () => {
    const manualToggle = accordion.exampleDemosArr.manualToggle;
    const buttonPanelToggler = 'Toggle last panel';

    it('last panel can be controlled by toggler button', () => {
      accordion.clickByText(manualToggle, buttonPanelToggler);

      accordion.getAccordionPanel(manualToggle, 2).as('dynamicPanel')
        .should('not.have.class', accordion.openClass);

      accordion.clickByText(manualToggle, buttonPanelToggler);

      cy.get('@dynamicPanel')
        .should('have.class', accordion.openClass);
    });
  });

  describe('Open only one at a time', () => {
    const onePanelDemo = accordion.exampleDemosArr.oneAtATime;

    it('closeOthers property sets as true - only one panel can be opened at a time', () => {
      cy.get(onePanelDemo).find('input').check();

      accordion.getAccordionPanel(onePanelDemo, 0).as('firstPanel').click()
        .should('have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 1).as('secondPanel')
        .should('not.have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 2).as('thirdPanel')
        .should('not.have.class', accordion.openClass);

      cy.get('@thirdPanel').click();

      cy.get('@thirdPanel')
        .should('have.class', accordion.openClass);
      cy.get('@firstPanel')
        .should('not.have.class', accordion.openClass);
      cy.get('@secondPanel')
        .should('not.have.class', accordion.openClass);
    });

    it('closeOthers property sets as false - not only one panel can be opened at a time', () => {
      cy.get(onePanelDemo).find('input').uncheck();

      accordion.getAccordionPanel(onePanelDemo, 0).as('firstPanel').click()
        .should('have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 1).as('secondPanel')
        .should('not.have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 2).as('thirdPanel')
        .should('not.have.class', accordion.openClass);

      cy.get('@thirdPanel').click();
      cy.get('@thirdPanel')
        .should('have.class', accordion.openClass);
      cy.get('@firstPanel')
        .should('have.class', accordion.openClass);
      cy.get('@secondPanel')
        .should('not.have.class', accordion.openClass);
    });
  });

  describe('Styling accordion', () => {
    const stylingDemo = accordion.exampleDemosArr.styling;

    it('first and third panel contains customClass style', () => {
      const stylesPanel = [
        'rgb(91, 192, 222)', // light blue (malibu)
        'rgb(255, 255, 255)' // white
      ];
      const stylePanelBody = 'rgb(51, 122, 167)'; // dark blue (lochmara)

      accordion.getAccordionPanel(stylingDemo, 0).find(accordion.panelCard).as('firstPanel')
        .should('to.have.css', 'background-color', stylesPanel[0])
        .and('to.have.css', 'color', stylesPanel[1]);
      cy.get('@firstPanel').find(accordion.panelBody)
        .should('to.have.css', 'background-color', stylePanelBody);

      accordion.getAccordionPanel(stylingDemo, 2).find(accordion.panelCard).as('thirdPanel')
        .should('to.have.css', 'background-color', stylesPanel[0])
        .and('to.have.css', 'color', stylesPanel[1]);
      cy.get('@thirdPanel').find(accordion.panelBody)
        .should('to.have.css', 'background-color', stylePanelBody);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = accordion.exampleDemosArr.config;

    it('example opens only one panel at a time', () => {
      accordion.getAccordionPanel(configDemo, 0).as('firstPanel').click()
        .should('have.class', accordion.openClass);
      accordion.getAccordionPanel(configDemo, 1).as('secondPanel')
        .should('not.have.class', accordion.openClass);
      accordion.getAccordionPanel(configDemo, 2).as('thirdPanel')
        .should('not.have.class', accordion.openClass);

      cy.get('@secondPanel').click()
        .should('have.class', accordion.openClass);
      cy.get('@firstPanel')
        .should('not.have.class', accordion.openClass);
      cy.get('@thirdPanel')
        .should('not.have.class', accordion.openClass);
    });
  });
});
