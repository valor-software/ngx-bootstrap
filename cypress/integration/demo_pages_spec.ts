import { AccordionPo } from '../support/accordion.po';
import { AlertsPo } from '../support/alerts.po';
import { ButtonsPo } from '../support/buttons.po';
import { CarouselPo } from '../support/carousel.po';
import { CollapsePo } from '../support/collapse.po';
import { DatepickerPo } from '../support/datepicker.po';
import { DropdownsPo } from '../support/dropdowns.po';
import { LandingPo } from '../support/landing.po';
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

describe('Alerts page test suite', () => {
  const alerts = new AlertsPo();

  beforeEach(() => alerts.navigateTo());

  describe('Basic', () => {
    const basicDemo = alerts.exampleDemosArr.basic;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-warning',
      'alert-danger'
    ];

    it('success, info, warning and danger types of alerts are displayed', () => {
      alertTypes.forEach(type => cy.get(`${ basicDemo } .${ type }`)
        .should('be.visible'));
    });
  });

  describe('Link color', () => {
    const linkDemo = alerts.exampleDemosArr.link;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-warning',
      'alert-danger'
    ];

    it('links can be provided by class alert-link', () => {
      alertTypes.forEach(type => cy.get(`${ linkDemo } .${ type }`).find(alerts.linkClass)
        .should('have.attr', 'href', '#'));
    });
  });

  describe('Additional content', () => {
    const contentDemo = alerts.exampleDemosArr.content;

    it('alert with additional content contains html elements', () => {
      cy.get(contentDemo).find(alerts.alertClass)
        .should('to.have.descendants', 'h4')
        .and('to.have.descendants', 'p')
        .and('to.have.descendants', alerts.heading);
    });
  });

  describe('Dismissing', () => {
    const dismissingDemo = alerts.exampleDemosArr.dismissing;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];
    const buttonToggler = 'Toggle dismissible';
    const buttonReset = 'Reset';

    it('alerts can stop being dismissible', () => {
      cy.get(dismissingDemo).find(alerts.alertClass).last().as('dismissAlert')
        .should('to.have.descendants', alerts.dismissOption);

      alerts.clickByText(dismissingDemo, buttonToggler);
      cy.get('@dismissAlert')
        .should('not.to.have.descendants', alerts.dismissOption);

      alerts.clickByText(dismissingDemo, buttonToggler);
      cy.get('@dismissAlert')
        .should('to.have.descendants', alerts.dismissOption);
    });

    it('alerts can all be closed and then resetting to default state', () => {
      alertTypes.forEach(type => {
        cy.get(`${ dismissingDemo } .${ type } ${alerts.dismissOption}`).click();
        cy.get(`${ dismissingDemo } .${ type }`)
          .should('not.to.exist');
      });

      alerts.clickByText(dismissingDemo, buttonReset);
      alertTypes.forEach(type => cy.get(`${ dismissingDemo } .${ type }`)
        .should('to.exist'));
    });
  });

  describe('Dynamic html', () => {
    const dynamicHtml = alerts.exampleDemosArr.dynamicHtml;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];

    it('each alert contains style and content from component', () => {
      alertTypes.forEach(type => cy.get(`${ dynamicHtml} .${ type }`)
        .should('be.visible')
        .and('to.have.descendants', alerts.textWrapper));
    });
  });

  describe('Dynamic content', () => {
    const dynamicContent = alerts.exampleDemosArr.dynamicContent;
    const dynamicAlertText = [
      'You successfully read this important alert message.',
      'Now this text is different from what it was before. Go ahead and click the button one more time',
      'Well done! Click reset button'
    ];

    it('alert\'s content can be changed dynamicly', () => {
      dynamicAlertText.forEach(text => {
        cy.get(dynamicContent).find(alerts.alertClass)
          .should('to.contain', text);
        cy.get(dynamicContent).find('button').click();
      });
    });
  });

  describe('Dismiss on timeout', () => {
    const dismisTimeout = alerts.exampleDemosArr.dismissTimeout;
    const timeoutLength = 5000;

    it('After timeout in 5 seconds, default alert disappears', () => {
      cy.get(`${ dismisTimeout } ${ alerts.alertClass }`).as('defaultAlert')
        .should('to.be.visible');
      cy.wait(timeoutLength);
      cy.get('@defaultAlert').should('not.to.exist');
    });
  });

  describe('Global styling', () => {
    const globalStyle = alerts.exampleDemosArr.globalStyling;
    const stylesColors = [
      'rgb(123, 31, 162)', // violet
      'rgb(74, 20, 140)', // indigo
      'rgb(255, 255, 255)' // white
    ];

    it('alert is displayed with added style', () => {
      cy.get(globalStyle).find(alerts.alertClass)
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Component level styling', () => {
    const componentStyle = alerts.exampleDemosArr.localStyling;
    const stylesColors = [
      'rgb(0, 150, 136)', // dark cyan
      'rgb(0, 105, 92)', // mosque
      'rgb(255, 255, 255)' // white
    ];

    it('alert is displayed with added style', () => {
      cy.get(componentStyle).find(alerts.alertClass)
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = alerts.exampleDemosArr.config;
    const alertTypes = [
      'alert-success',
      'alert-info'
    ];

    it('each alert contains added config', () => {
      alertTypes.forEach(type => cy.get(`${ configDemo } .${ type }`)
        .should('be.visible'));
    });
  });
});

describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();
  const buttonNames = [
    'Left',
    'Middle',
    'Right'
  ];

  beforeEach(() => buttons.navigateTo());

  describe('Basic', () => {
    const basicBtn = buttons.exampleDemosArr.basic;
    const btnText = 'Single Button';

    it('example contains only enabled button with text on it', () => {
      cy.get(` ${ basicBtn } ${ buttons.buttonSel }`)
        .should('to.be.enabled')
        .and('to.contain', btnText);
    });
  });

  describe('Checkbox', () => {
    const checkboxDemo = buttons.exampleDemosArr.checkbox;

    it('checkboxes can be checked or unchecked', () => {
      cy.get(`${ checkboxDemo } ${ buttons.output }`).as('output')
        .should('to.contain', `"${ buttonNames[1].toLowerCase() }": true`);
      buttons.clickByText(checkboxDemo, buttonNames[1]);

      buttonNames.forEach(button => {
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": false`);

        buttons.clickByText(checkboxDemo, button);
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": true`);
      });
    });
  });

  describe('Custom checkbox value', () => {
    const customCheckboxVal = buttons.exampleDemosArr.customCheckboxVal;

    it('examples contains output, which can be changed by click on output', () => {
      const defaultVal = '1';
      const afterClickVal = '0';

      cy.get(` ${ customCheckboxVal } ${ buttons.output }`).as('header')
        .should('to.contain', defaultVal);

      cy.get(` ${ customCheckboxVal } ${ buttons.buttonSel }`).click();
      cy.get('@header')
        .should('to.contain', afterClickVal);
    });
  });

  describe('Checkbox with Reactive Form', () => {
    const checkboxWithForm = buttons.exampleDemosArr.checkboxWithForms;

    it('checkboxes can be checked or unchecked and its\' states are displayed at reactive form', () => {
      cy.get(` ${ checkboxWithForm } ${ buttons.output }`).as('output')
        .should('to.contain', `"${ buttonNames[1].toLowerCase() }": true`);
      buttons.clickByText(checkboxWithForm, buttonNames[1]);

      buttonNames.forEach(button => {
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": false`);

        buttons.clickByText(checkboxWithForm, button);
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": true`);
      });
    });
  });

  describe('Radio buttons', () => {
    const radioCheck = buttons.exampleDemosArr.radioBtn;

    it('checked radio button created with ngModel is displayed in output', () => {
      // for now we need creating this alias due to same selectors' names and classes
      cy.get(radioCheck).eq(0).as('radio').find('.btn-group').first().as('radioNgModel');

      buttonNames.forEach(name => {
        buttons.clickByText('@radioNgModel', name);

        cy.get(`${ '@radio' }${ buttons.output }`)
          .should('to.contain', name);
      });
    });

    it('checked radio buttons created with btnRadioGroup is displayed in output', () => {
      // for now we need creating this alias due to same selectors' names
      cy.get(radioCheck).eq(0).as('radio').find(`${ buttons.btnRadioGroupSel }`).as('checkBtnRadioGroup');

      buttonNames.forEach(name => {
        buttons.clickByText('@checkBtnRadioGroup', name);

        cy.get(`${ '@radio' }${ buttons.output }`)
          .should('to.contain', name);
      });
    });
  });

  describe('Uncheckable radio', () => {
    const radioUncheck = buttons.exampleDemosArr.radioBtn;

    it('uncheckable radio buttons can be checked or unchecked', () => {
      // for now we need creating this alias due to same selectors' names
      cy.get(radioUncheck).eq(1).as('radioUncheck').find(`${ buttons.btnRadioGroupSel }`).as('uncheckBtnRadio');

      buttonNames.forEach(name => {
        buttons.clickByText('@uncheckBtnRadio', name);

        cy.get(`${ '@radioUncheck' }${ buttons.output }`)
          .should('to.contain', name);

        buttons.clickByText('@uncheckBtnRadio', name);

        cy.get(`${ '@radioUncheck' }${ buttons.output }`)
          .should('to.be', null);
      });
    });
  });

  describe('Radio with Reactive Forms', () => {
    const radioWithForm = buttons.exampleDemosArr.radioBtnWithForms;

    it('radio example should dynamicly update reactive form', () => {
      const btns = ['A', 'B', 'C'];

      btns.forEach(radio => {
        buttons.clickByText(radioWithForm, radio);

        cy.get(`${ radioWithForm } ${ buttons.output }`)
          .should('to.contain', radio);
      });
    });
  });

  describe('Disabled Buttons', () => {
    const disabled = buttons.exampleDemosArr.disabled;
    const togglerBtn = 'Enable/Disable';
    const btnForAction = 'Button';

    it('disabled buttons examples contains button, that can be disabled', () => {
      cy.get(disabled).contains(btnForAction).as('btnForDisabling')
        .should('to.be.enabled');
      buttons.clickByText(disabled, togglerBtn);

      cy.get('@btnForDisabling')
        .should('not.to.be.enabled');
    });
  });
});

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();

  beforeEach(() => carousel.navigateTo());

  describe('Basic', () => {
    const basic = carousel.exampleDemosArr.basic;

    it('example contains slides, indicators, left and right controls', () => {
      cy.get(`${ basic } ${ carousel.carouselClass }`)
        .should('to.have.descendants', carousel.indicatorClass)
        .and('to.have.descendants', carousel.itemClass)
        .and('to.have.descendants', carousel.leftControl)
        .and('to.have.descendants', carousel.rightControl);
    });
  });
});

describe('Collapse demo page test suite', () => {
  const collapse = new CollapsePo();

  beforeEach(() => collapse.navigateTo());

  describe('Basic', () => {
    const basic = collapse.exampleDemosArr.basic;

    it('contains togler and content, that can be collapsed', () => {
      const toglerText = 'Toggle collapse';

      cy.get(`${ basic } ${ collapse.collapseClass }`)
        .should('to.have.class', collapse.showIndicator);

      collapse.clickByText(basic, toglerText);
      cy.get(`${ basic } ${ collapse.collapseClass }`)
        .should('not.to.have.class', collapse.showIndicator);
    });
  });
});

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(() => datepicker.navigateTo());

  describe('Basic', () => {
    const basic = datepicker.exampleDemosArr.basic;

    it('basic date- and daterangepicker can be opened by click on input', () => {
      cy.get(`${ basic } ${ datepicker.datepickerInput }`).click();
      cy.get(datepicker.datepickerLastOpened)
        .should('to.be.visible');

      cy.get(`${ basic } ${ datepicker.daterangepickerInput }`).click();
      cy.get(datepicker.daterangepickerLastOpened)
        .should('to.be.visible');
    });
  });

  describe('Custom date format', () => {
    const customFormat = datepicker.exampleDemosArr.customFormat;

    it('by default, today\'s date is displayed at first output in format YYYY-MM-DD', () => {
      const expectedDate = Cypress.moment().format('YYYY-MM-DD');

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).first()
        .should('have.value', `${ expectedDate }`);
    });

    it('by default, today\'s date is displayed at second output in format MM/DD/YYYY', () => {
      const expectedDate = Cypress.moment().format('MM/DD/YYYY');

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).eq(1)
        .should('have.value', `${ expectedDate }`);
    });
  });

  describe('Reactive forms', () => {
    const reactiveForms = datepicker.exampleDemosArr.reactiveForms;

    it('chosen in datepicker date can be displayed in reactive form', () => {
      const expectedDate = Cypress.moment().format('YYYY-MM-DD');
      const day = Cypress.moment().format('D');

      cy.get(`${ reactiveForms } ${ datepicker.datepickerInput }`).click();
      datepicker.clickOnDayInCurrMonth(`${ datepicker.datepickerLastOpened }`, day);

      cy.get(`${ reactiveForms } ${ datepicker.formOutput }`)
        .should('to.contain', `"date": "${ expectedDate }`);
    });
  });
});

describe('Dropdowns demo page test suite', () => {
  const dropdowns = new DropdownsPo();

  beforeEach(() => dropdowns.navigateTo());

  describe('Basic', () => {
    const basicDrop = dropdowns.exampleDemosArr.basic;
    const togglerText = 'Button dropdown';

    it('single button dropdown is shown after click on toggler', () => {
      dropdowns.clickByText(basicDrop, togglerText);
      cy.get(`${ basicDrop } ${ dropdowns.dropdownMenu }`).as('basicDropMenu')
        .should('to.have.class', dropdowns.showIndicator);

      dropdowns.clickByText(basicDrop, togglerText);
      cy.get('@basicDropMenu')
        .should('not.to.have.class', dropdowns.showIndicator);
    });
  });

  describe('Trigger by tag \<\a\>', () => {
    const triggerTag = dropdowns.exampleDemosArr.triggerByTag;
    const linkTag = 'a';

    it('dropdowns can be triggered by tag a', () => {
      cy.get(`${ triggerTag } span`).as('triggerTag')
        .should('not.to.have.descendants', '.dropdown-menu');

      cy.get('@triggerTag').find(linkTag).as('link').click();
      cy.get('@triggerTag').find(dropdowns.dropdownMenu).as('linkDropMenu')
        .should('to.have.class', dropdowns.showIndicator);

      cy.get('@link').click();
      cy.get('@linkDropMenu')
        .should('not.to.have.class', dropdowns.showIndicator);
    });
  });

  describe('Split button dropdowns', () => {
    const splitBtn = dropdowns.exampleDemosArr.splitButton;
    const buttonText = 'Action';

    it('dropdown could have split toggler button', () => {
      dropdowns.clickByText(splitBtn, buttonText);
      cy.get(`${ splitBtn } ${ dropdowns.dropdownMenu }`)
        .should('not.to.have.class', dropdowns.showIndicator);

      cy.get(`${ splitBtn } ${ dropdowns.dropdownToggler }`).click();
      cy.get(`${ splitBtn } ${ dropdowns.dropdownMenu }`)
        .should('to.have.class', dropdowns.showIndicator);
    });
  });

  describe('Disabled menu', () => {
    const disabled = dropdowns.exampleDemosArr.disabledMenu;
    const btnEnableDisable = 'Enable/Disable';

    it('dropdown button can be disabled', () => {
      dropdowns.clickByText(disabled, btnEnableDisable);
      cy.get(`${ disabled } ${ dropdowns.dropdownToggler }`)
        .should('not.to.be.enabled');
    });
  });
});

describe('Landing Page test suite', () => {
  const landing = new LandingPo();

  beforeEach(() => landing.navigateTo());

  describe('Content', () => {

    it('header displays ngx-bootstrap logo and info buttons', () => {
      cy.get(landing.logoAtHeader)
        .should('be.visible');
      cy.get(landing.infoButtons)
        .should('be.visible');
    });

    it('main content displays ngx-bootstrap logo, slogan, description, version and advantages block', () => {
      cy.get(landing.logoAtContent)
        .should('be.visible');
      cy.get(landing.sloganBs)
        .should('be.visible');
      cy.get(landing.descriptionBs)
        .should('be.visible');
      cy.get(landing.versionBs)
        .should('be.visible');
      cy.get(landing.advantagesBs)
        .should('be.visible');
    });

    it('footer contains links to ng-team, contributors, MIT license, Creative Commons, original Bootstrap', () => {
      const footerLinks = [
        landing.teamUrl,
        landing.contributorsUrl,
        landing.mitLicenseUrl,
        landing.crCommonsUrl,
        landing.originalBsUrl
      ];

      footerLinks.forEach(link =>
        cy.get(`footer [href="${ link }"]`).should('to.be.exist'));
    });
  });

  describe('Navigation buttons', () => {
    it('Get started button redirects to Getting Started page', () => {
      const buttonText = 'Get started';
      const searchedUrl = '/getting-started';

      landing.clickByText(landing.navBtn, buttonText);

      cy.url()
        .should('include', searchedUrl);
    });

    it('Github button is enabled and contains link to ngx-bootstrap repo', () => {
      const buttonText = 'Github';

      cy.get(landing.navBtn).contains(buttonText)
        .should('be.enabled')
        .and('have.attr', 'href', landing.githubUrl);
    });

    it('Info buttons in header are enabled and contains links to slack, github and stackoverflow', () => {
      const linksArr = [
        landing.stackoverflowUrl,
        landing.githubUrl,
        landing.slackUrl
      ];

      linksArr.forEach(link =>
        cy.get(`${ landing.infoButtons } [href="${ link }"]`)
          .should('be.enabled'));
    });
  });
});

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Template modal', () => {
      const templateModal = modals.exampleDemosArr.serviceTemplate;
      const buttonText = 'Create template modal';

      it('template service modal can be opened by click on button and closed by backdrop-click', () => {
        modals.clickByText(templateModal, buttonText);
        cy.get(modals.modalContent)
          .should('to.be.visible');

        cy.get(modals.backServiceMod).as('modalAndBackdrop').click();
        cy.get('@modalAndBackdrop')
          .should('not.to.be.visible');
      });
    });

    describe('Component modal', () => {
      const componentModal = modals.exampleDemosArr.serviceComponent;
      const buttonText = 'Create modal with component';
      const modalCloseBtn = 'Close';

      it('component service modal can be opened by click on button and closed by clicking Close button', () => {
        modals.clickByText(componentModal, buttonText);
        cy.get(modals.modalContent)
          .should('to.be.visible');

        modals.clickByText(modals.modalContent, modalCloseBtn);
        cy.get(modals.backServiceMod)
          .should('not.to.be.visible');
      });
    });
  });

  describe('Directive examples', () => {
    describe('Static modal', () => {
      const staticModal = modals.exampleDemosArr.directiveStatic;
      const buttonText = 'Static modal';

      it('directive static modal can be closed by clicking Close button', () => {
        modals.clickByText(staticModal, buttonText);
        cy.get(`${ staticModal } ${ modals.modalContent }`).as('staticMod')
          .should('to.be.visible');

        cy.get(`${ staticModal } ${ modals.modalHeader } ${ modals.btnCloseInHeader }`).click();
        cy.get(`${ staticModal } ${ modals.backDirectiveMod }`)
          .should('not.to.be.visible');
      });
    });

    describe('Child modal', () => {
      const childModals = modals.exampleDemosArr.directiveChild;
      const buttonText = 'Open child modal';

      it('directive child modal can be closed by backdrop click', () => {
        modals.clickByText(childModals, buttonText);
        cy.get(`${ childModals } ${ modals.modalContent }`)
          .should('to.be.visible');

        cy.get(`${ childModals } ${ modals.backDirectiveMod }`).as('childModBack').click();
        cy.get('@childModBack')
          .should('not.to.be.visible');
      });
    });
  });
});

describe('Pagination demo page test suite', () => {
  const pagination = new PaginationPo();

  beforeEach(() => pagination.navigateTo());

  describe('Pager', () => {
    const pager = pagination.exampleDemosArr.pager;

    it('active page can be changed by clicking on Next or Previous button', () => {
      cy.get(`${ pager } ${ pagination.classActive }`)
        .should('to.contain', '4');

      pagination.clickByText(pager, pagination.btnPrev);
      cy.get(`${ pager } ${ pagination.classActive }`)
        .should('to.contain', '3');

      pagination.clickByText(pager, pagination.btnNext);
      cy.get(`${ pager } ${ pagination.classActive }`)
        .should('to.contain', '4');
    });
  });
});

describe('Popover demo page test suite', () => {
  const popover = new PopoverPo();

  beforeEach(() => popover.navigateTo());

  describe('Basic', () => {
    const basicPopover = popover.exampleDemosArr.basic;

    it('basic popover appears after clicking on trigger button', () => {
      const buttonText = 'Live demo';

      popover.clickByText(basicPopover, buttonText);
      cy.get(basicPopover).should('to.have.descendants', 'popover-container');
    });
  });
});

describe('Progressbar demo page test suite', () => {
  const progressbar = new ProgressbarPo();

  beforeEach(() => progressbar.navigateTo());

  describe('Configuring defaults', () => {
    const configured = progressbar.exampleDemosArr.config;

    it('preconfigured progressbar contains styles and value from config', () => {
      const configInTempl = {
        type: 'danger',
        valueNow: '136'
      };
      const configInComp = {
        animated: 'progress-bar-animated',
        striped: 'progress-bar-striped',
        maxVal: '150'
      };

      cy.get(`${ configured } ${ progressbar.tagProgressbar }`).as('progressbarConf')
        .should('to.have.attr', 'type', configInTempl.type)
        .and('to.have.attr', 'max', configInComp.maxVal);

      cy.get('@progressbarConf').find(progressbar.tagBar)
        .should('to.have.class', configInComp.animated)
        .and('to.have.class', configInComp.striped)
        .and('to.have.attr', 'aria-valuenow', configInTempl.valueNow);
    });
  });
});

describe('Rating demo page test suite', () => {
  const rating = new RatingPo();

  beforeEach(() => rating.navigateTo());

  describe('Basic rating', () => {
    const basic = rating.exampleDemosArr.basic;
    const confComponent = {
      maxVal: '10',
      currRate: '7',
      readonly: 'not.to.be.enabled'
    };
    const outputText = 'Rate: 7 ';

    it('basic rating example contains readonly rating with preconfigured values', () => {
      cy.get(`${ basic } ${rating.tagRating}`).as('rating')
        .should('to.be.visible')
        .and(confComponent.readonly);
      cy.get('@rating').find('span')
        .should('to.have.attr', 'aria-valuemax', confComponent.maxVal)
        .and('to.have.attr', 'aria-valuenow', confComponent.currRate);

      cy.get(`${ basic } ${ rating.outputClass }`)
        .should('to.have.text', outputText);
    });
  });
});

describe('Sortable demo page test suite', () => {
  const sortable = new SortablePo();

  beforeEach(() => sortable.navigateTo());

  describe('Basic', () => {
    const basic = sortable.exampleDemosArr.basic;

    it('sortable items are placed at two sortable-wrappers', () => {
      cy.get(`${ basic } ${ sortable.classWrapper }`).as('wrapper').eq(0)
        .should('to.have.descendants', sortable.classItem);
      cy.get('@wrapper').eq(1)
        .should('to.have.descendants', sortable.classItem);
    });
  });
});

describe('Tabs demo page spec', () => {
  const tabs = new TabsPo();

  beforeEach(() => tabs.navigateTo());

  describe('Configuring defaults', () => {
    const configDemo = tabs.exampleDemosArr.config;
    const configComp = {
      type: 'nav-pills'
    };

    it('configuring defaults example contains added config', () => {
      cy.get(`${ configDemo } ${ tabs.tabsWrap }`)
        .should('to.have.class', configComp.type);
    });
  });
});

describe('Timepicker demo page test suite', () => {
  const timepicker = new TimepickerPo();

  beforeEach(() => timepicker.navigateTo());

  describe('Meridian', () => {
    const meridian = timepicker.exampleDemosArr.meridian;
    const togglerText = '12H / 24H';


    it('first click on 12/24 toggler removes AM/PM button', () => {
      cy.get(`${ meridian } ${ timepicker.btnAmPm }`).as('am/pm')
        .should('to.exist');

      timepicker.clickByText(meridian, togglerText);
      cy.get('@am/pm')
        .should('not.to.exist');
    });
  });
});

describe('Tooltip demo page test suite', () => {
  const tooltip = new TooltipPo();

  beforeEach(() => tooltip.navigateTo());

  describe('Basic tooltip', () => {
    const basic = tooltip.exampleDemosArr.basic;

    it('basic tooltip appears after hovering on trigger button', () => {
      cy.get(basic).as('basicDemo').find(tooltip.togglerTooltip).focus();
      cy.get('@basicDemo')
        .should('to.have.descendants', tooltip.containerTooltip);
    });
  });
});

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Reactive forms', () => {
    const reactiveForm = typeahead.exampleDemosArr.reactiveForms;

    it('reactive forms typeahead appears after focus at input', () => {
      cy.get(reactiveForm).as('reactiveForm').find(typeahead.tagInput).focus();
      cy.get('@reactiveForm')
        .should('to.have.descendants', typeahead.containerTypeahead);
    });
  });
});
