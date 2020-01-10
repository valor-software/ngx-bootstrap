import { TabsPo } from '../support/tabs.po';

describe('Tabs demo page spec', () => {
  const tabs = new TabsPo();

  beforeEach(() => tabs.navigateTo());

  describe('Manual selection', () => {
    const manualSelection = tabs.exampleDemosArr.manualSelection;

    beforeEach(() => tabs.scrollToMenu('Manual selection'));

    it('example contains 4 tabs, 2 buttons "Select 2d tab", "Select 3d tab", 1st opened with "Static content"', () => {
      tabs.isTabTitleTxtContain(manualSelection, 'Static');
      tabs.isTabContentContain(manualSelection, 'Static content');
      tabs.isAppropriateTabActive(manualSelection, 0);
      tabs.isTabsLengthEqual(manualSelection, 4);
      tabs.isButtonExist(manualSelection, 'Select second tab', 0);
      tabs.isButtonExist(manualSelection, 'Select third tab', 1);
    });

    it('when user clicks on "Select 2d tab/Select 3d tab", then this tab chosen with appropriate content', () => {
      tabs.clickOnBtn(manualSelection, 0);
      tabs.isAppropriateTabActive(manualSelection, 1);
      tabs.isTabContentContain(manualSelection, 'Static content');

      tabs.clickOnBtn(manualSelection, 1);
      tabs.isAppropriateTabActive(manualSelection, 2);
      tabs.isTabContentContain(manualSelection, 'Static content');
    });

    it('when user clicks on the latest tab, then this tab chosen with appropriate content inside', () => {
      tabs.clickOnTab(manualSelection, 3);
      tabs.isAppropriateTabActive(manualSelection, 3);
      tabs.isTabContentContain(manualSelection, 'Static content');
    });
  });

  describe('Disabled tabs', () => {
    const disabledTabs = tabs.exampleDemosArr.disabled;

    beforeEach(() => tabs.scrollToMenu('Disabled tabs'));

    it('example contains 4 tabs and button "Enable/Disable third tab", the 1st tab opened with content', () => {
      tabs.isTabsLengthEqual(disabledTabs, 4);
      tabs.isButtonExist(disabledTabs, ' Enable / Disable third tab ');
      tabs.isAppropriateTabActive(disabledTabs, 0);
      tabs.isTabTitleTxtContain(disabledTabs, 'Static');
      tabs.isTabContentContain(disabledTabs, 'Static content');
    });

    it('when user clicks on "Enable/Disable third tab", then 3d - not clickable, after click - nothing happens', () => {
      tabs.clickOnBtn(disabledTabs);
      tabs.isTabDisabled(disabledTabs, 2, true);
      tabs.isAppropriateTabActive(disabledTabs, 0);
    });

    it('when user clicks "Enable/Disable third tab" again, then 3d-clickable, when click-opened with content', () => {
      tabs.dblClickOnBtn(disabledTabs);
      tabs.isTabDisabled(disabledTabs, 2, false);
      tabs.clickOnTab(disabledTabs, 2);
      tabs.isAppropriateTabActive(disabledTabs, 2);
      tabs.isTabContentContain(disabledTabs, 'Static content');
    });
  });

  describe('Dynamic tabs', () => {
    const dynamicTabs = tabs.exampleDemosArr.dynamic;

    beforeEach(() => tabs.scrollToMenu('Dynamic tabs'));

    it('example contains 4 tabs, 2 buttons "Add new tab", "Remove all tabs", the 1st tab opened with content', () => {
      tabs.isTabsLengthEqual(dynamicTabs, 4);
      tabs.isButtonExist(dynamicTabs, ' Add new tab ', 0);
      tabs.isButtonExist(dynamicTabs, ' Remove all tabs ', 1);
      tabs.isAppropriateTabActive(dynamicTabs, 0);
      tabs.isTabTitleTxtContain(dynamicTabs, 'Static title', 0);
      tabs.isTabContentContain(dynamicTabs, 'Static content', 0);
    });

    it('when user clicks on any other tabs, then that tab chosen with appropriate content inside', () => {
      tabs.clickOnTab(dynamicTabs, 2);
      tabs.isAppropriateTabActive(dynamicTabs, 2);
      tabs.isTabTitleTxtContain(dynamicTabs, 'Dynamic Title', 2);
      tabs.isTabContentContain(dynamicTabs, 'Dynamic content', 2);
    });

    it('when user clicks "Add new tab", amount of tabs increased, tab appeared with index, content, close icon', () => {
      tabs.clickOnBtn(dynamicTabs, 0);
      tabs.isTabsLengthEqual(dynamicTabs, 5);
      tabs.isTabTitleTxtContain(dynamicTabs, 'Dynamic Title', 4);
      tabs.isTabContentContain(dynamicTabs, 'Dynamic content', 4);
      tabs.isRemoveIconExist(dynamicTabs, 4);
    });

    it('when user clicks "Add new tab" again, amount of tabs increased, tab appeared with index, content, icon', () => {
      tabs.clickOnBtn(dynamicTabs, 0);
      tabs.clickOnBtn(dynamicTabs, 0);
      tabs.isTabsLengthEqual(dynamicTabs, 6);
      tabs.isTabTitleTxtContain(dynamicTabs, 'Dynamic Title 5', 5);
      tabs.isTabContentContain(dynamicTabs, 'Dynamic content 5', 5);
      tabs.isRemoveIconExist(dynamicTabs, 5);
    });

    it('when user clicks on close icon near tab, then this tab removed', () => {
      tabs.isTabsLengthEqual(dynamicTabs, 4);
      tabs.clickOnRemoveTabIcon(dynamicTabs, 3);
      tabs.isTabsLengthEqual(dynamicTabs, 3);
    });

    it('when user clicks on "Remove all tabs", then all dynamic tabs removed with whole content', () => {
      tabs.clickOnBtn(dynamicTabs, 1);
      tabs.isTabsLengthEqual(dynamicTabs, 1);
    });

    it('when user clicks "Remove all tabs", then all dynamic tabs removed, static visible', () => {
      tabs.clickOnBtn(dynamicTabs, 1);
      tabs.isTabsLengthEqual(dynamicTabs, 1);
      tabs.isTabTitleTxtContain(dynamicTabs, 'Static title');
      tabs.isTabContentContain(dynamicTabs, 'Static content');
    });

    it('when user clicks "Add new tab" again, amount of tabs increased, tab appeared with index, content, icon', () => {
      tabs.clickOnBtn(dynamicTabs, 1);
      tabs.clickOnBtn(dynamicTabs, 0);
      tabs.isTabsLengthEqual(dynamicTabs, 2);
      tabs.isTabTitleTxtContain(dynamicTabs, 'Dynamic Title 1', 1);
      tabs.isTabContentContain(dynamicTabs, 'Dynamic content 1', 1);
      tabs.isRemoveIconExist(dynamicTabs, 1);
    });
  });

  describe('Pills', () => {
    const pills = tabs.exampleDemosArr.pills;

    beforeEach(() => tabs.scrollToMenu('Pills'));

    it('example contains 2 tabs, type=pills, the 1st pill chosen with content inside: "Pills content 1"', () => {
      tabs.isTabsLengthEqual(pills, 2);
      tabs.isAppropriateTabActive(pills, 0);
      tabs.isTabTitleTxtContain(pills, 'Pills 1', 0);
      tabs.isTabTitleTxtContain(pills, 'Pills 2', 1);
      tabs.isTabContentContain(pills, 'Pills content 1', 0);
      tabs.isTabContentContain(pills, 'Pills content 2', 1);
      tabs.isTabsetHaveType(pills, 'pills');
    });

    it('when user clicks on the second pill, it become chosen and there is content inside: "Pills content 2"', () => {
      tabs.clickOnTab(pills, 1);
      tabs.isAppropriateTabActive(pills, 1);
      tabs.isTabsetHaveType(pills, 'pills');
    });
  });

  describe('Vertical Pills', () => {
    const verticalPills = tabs.exampleDemosArr.verticalPills;

    beforeEach(() => tabs.scrollToMenu('Vertical Pills'));

    it('example contains 2 vertical pills, first pill chosen and there is content inside: "Vertical content 1"', () => {
      tabs.isTabsLengthEqual(verticalPills, 2);
      tabs.isAppropriateTabActive(verticalPills, 0);
      tabs.isTabTitleTxtContain(verticalPills, 'Vertical 1', 0);
      tabs.isTabTitleTxtContain(verticalPills, 'Vertical 2', 1);
      tabs.isTabContentContain(verticalPills, 'Vertical content 1', 0);
      tabs.isTabContentContain(verticalPills, 'Vertical content 2', 1);
      tabs.isTabsetHaveType(verticalPills, 'pills');
    });

    it('when user clicks 2d pill, it become chosen with content, template src contain vertical="true"', () => {
      tabs.clickOnTab(verticalPills, 1);
      tabs.isAppropriateTabActive(verticalPills, 1);
      tabs.isTabsetHaveType(verticalPills, 'pills');
      tabs.isTemplateSrcContain('Vertical Pills', '[vertical]="true"');
    });
  });

  describe('Justified', () => {
    const justified = tabs.exampleDemosArr.justified;

    beforeEach(() => tabs.scrollToMenu('Justified'));

    it('example contains 3 tabs, justified. each have the same width/height, 1st tab chosen with content', () => {
      tabs.isTabsLengthEqual(justified, 3);
      tabs.isAppropriateTabActive(justified, 0);
      tabs.isTabTitleTxtContain(justified, 'Justified', 0);
      tabs.isTabTitleTxtContain(justified, 'SJ', 1);
      tabs.isTabTitleTxtContain(justified, 'Long Justified', 2);
      tabs.isTabContentContain(justified, 'Justified content', 0);
      tabs.isTabContentContain(justified, 'Short Labeled', 1);
      tabs.isTabContentContain(justified, 'Long Labeled', 2);
      tabs.isTabsJustified(justified);
    });

    it('when user clicks second tab, it become chosen and there is content: "Short Labeled Justified content"', () => {
      tabs.clickOnTab(justified, 1);
      tabs.isAppropriateTabActive(justified, 1);
      tabs.isTabContentContain(justified, 'Short Labeled Justified content', 1);
    });

    it('when user clicks third tab, it become chosen, there is content:"Long Labeled Justified content"', () => {
      tabs.clickOnTab(justified, 2);
      tabs.isAppropriateTabActive(justified, 2);
      tabs.isTabContentContain(justified, 'Long Labeled Justified content', 2);
    });
  });

  describe('Custom class', () => {
    const customClass = tabs.exampleDemosArr.customClass;
    const customStyles = {
      active: {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(73, 80, 87)'
      },
      inactive: {
        backgroundColor: 'rgb(80, 255, 80)',
        color: 'rgb(0, 123, 255)'
      }
    };

    beforeEach(() => tabs.scrollToMenu('Justified'));

    it('example contains 3 tabs, aligned to right and with specific styles, 1st tab chosen with content inside', () => {
      tabs.isTabsLengthEqual(customClass, 3);
      tabs.isAppropriateTabActive(customClass, 0);
      tabs.isTabTitleTxtContain(customClass, 'Static title', 0);
      tabs.isTabTitleTxtContain(customClass, 'Dynamic Title 1', 1);
      tabs.isTabTitleTxtContain(customClass, 'Dynamic Title 2', 2);
      tabs.isTabContentContain(customClass, 'Static content', 0);
      tabs.isTabContentContain(customClass, 'Dynamic content 1', 1);
      tabs.isTabContentContain(customClass, 'Dynamic content 2', 2);
      tabs.isTabHaveCustomCSS(customClass, 0, 'background-color', customStyles.active.backgroundColor);
      tabs.isTabHaveCustomCSS(customClass, 0, 'color', customStyles.active.color);
      tabs.isTabHaveCustomCSS(customClass, 1, 'background-color', customStyles.inactive.backgroundColor);
      tabs.isTabHaveCustomCSS(customClass, 1, 'color', customStyles.inactive.color);
      tabs.isTabHaveCustomCSS(customClass, 2, 'background-color', customStyles.inactive.backgroundColor);
      tabs.isTabHaveCustomCSS(customClass, 2, 'color', customStyles.inactive.color);
    });

    it('when user clicks on the 2d tab, it become chosen with content inside: "Dynamic content 1"', () => {
      tabs.clickOnTab(customClass, 1);
      tabs.isAppropriateTabActive(customClass, 1);
      tabs.isTabContentContain(customClass, 'Dynamic content 1', 1);
      tabs.isTabHaveCustomCSS(customClass, 0, 'background-color', customStyles.inactive.backgroundColor);
      tabs.isTabHaveCustomCSS(customClass, 1, 'background-color', customStyles.active.backgroundColor);
    });

    it('when user clicks on the 2d tab, it become chosen with content inside: "Dynamic content 1"', () => {
      tabs.clickOnTab(customClass, 1);
      tabs.isAppropriateTabActive(customClass, 1);
      tabs.isTabContentContain(customClass, 'Dynamic content 1', 1);
      tabs.isTabHaveCustomCSS(customClass, 0, 'background-color', customStyles.inactive.backgroundColor);
      tabs.isTabHaveCustomCSS(customClass, 1, 'background-color', customStyles.active.backgroundColor);
    });

    it('when user clicks on the third tab, it become chosen and there is content inside: "Dynamic content 2"', () => {
      tabs.clickOnTab(customClass, 2);
      tabs.isAppropriateTabActive(customClass, 2);
      tabs.isTabContentContain(customClass, 'Dynamic content 2', 2);
      tabs.isTabHaveCustomCSS(customClass, 0, 'background-color', customStyles.inactive.backgroundColor);
      tabs.isTabHaveCustomCSS(customClass, 2, 'background-color', customStyles.active.backgroundColor);
    });
  });

  describe('Select event', () => {
    const selectEvent = tabs.exampleDemosArr.selectEvent;

    beforeEach(() => tabs.scrollToMenu('Select event'));

    it('example contains 2 tabs, the first tab chosen and there is a long content inside and "Title"', () => {
      tabs.isTabsLengthEqual(selectEvent, 2);
      tabs.isAppropriateTabActive(selectEvent, 0);
      tabs.isTabTitleTxtContain(selectEvent, 'First tab', 0);
      tabs.isTabTitleTxtContain(selectEvent, 'Second tab', 1);
      tabs.isTabContentContain(selectEvent, 'Title', 0);
      tabs.isTabContentContain(selectEvent, 'Title 2', 1);
    });

    it('when user clicks on the 2d tab, it chosen with long content inside, shown "Event select is fired...', () => {
      tabs.clickOnTab(selectEvent, 1);
      tabs.isAppropriateTabActive(selectEvent, 1);
      tabs.isTabContentContain(selectEvent, 'Title 2', 1);
      tabs.isPreviewExist(selectEvent, 'Event select is fired. The heading of the selected tab is: Second tab');
    });

    it('when user clicks on the 1t tab, it chosen with long content inside, shown "Event select is fired...', () => {
      tabs.clickOnTab(selectEvent, 1);
      tabs.clickOnTab(selectEvent, 0);
      tabs.isAppropriateTabActive(selectEvent, 0);
      tabs.isTabContentContain(selectEvent, 'Title 2', 1);
      tabs.isPreviewExist(selectEvent, 'Event select is fired. The heading of the selected tab is: First tab');
    });
  });

  describe('Configuring defaults', () => {
    const configDefaults = tabs.exampleDemosArr.config;

    beforeEach(() => tabs.scrollToMenu('Configuring defaults'));

    it('example contains 2 pills, 1st pill chosen and there is content inside "Config content 1"', () => {
      tabs.isTabsLengthEqual(configDefaults, 2);
      tabs.isAppropriateTabActive(configDefaults, 0);
      tabs.isTabsetHaveClass(configDefaults, '.nav-pills');
      tabs.isTabTitleTxtContain(configDefaults, 'Config 1', 0);
      tabs.isTabContentContain(configDefaults, 'Config content 1', 0);
    });

    it('when user clicks on the 2d pill, it become chosen with content "Config content 2", cmp with pills type', () => {
      tabs.clickOnTab(configDefaults, 1);
      tabs.isAppropriateTabActive(configDefaults, 1);
      tabs.isTabTitleTxtContain(configDefaults, 'Config 2', 1);
      tabs.isTabContentContain(configDefaults, 'Config content 2', 1);
      tabs.isCompSrcContain('Configuring defaults', `type: 'pills'`);
    });
  });

  describe('Custom template', () => {
    const customTemplate = tabs.exampleDemosArr.customTemplate;
    const staticStyles = {
      active: {
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(73, 80, 87)'
      },
      inactive: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: 'rgb(0, 123, 255)'
      }
    };

    beforeEach(() => tabs.scrollToMenu('Custom template'));

    it('example contains 3 tabs, the first tab with default styles chosen and there is content inside "Tab 1"', () => {
      tabs.isTabsLengthEqual(customTemplate, 3);
      tabs.isAppropriateTabActive(customTemplate, 0);
      tabs.isTabHaveCustomCSS(customTemplate, 0, 'color', staticStyles.active.color);
      tabs.isTabHaveCustomCSS(customTemplate, 0, 'background-color', staticStyles.active.backgroundColor);
      tabs.isTabTitleTxtContain(customTemplate, 'Static', 0);
      tabs.isTabContentContain(customTemplate, 'Tab 1', 0);
    });

    it('when user clicks on the 2nd tab, it chosen with content "Ive got an HTML...", tab with custom style', () => {
      tabs.clickOnTab(customTemplate, 1);
      tabs.isAppropriateTabActive(customTemplate, 1);
      tabs.isTabHaveCustomCSS(customTemplate, 1, 'color', staticStyles.active.color);
      tabs.isTabHaveCustomCSS(customTemplate, 1, 'background-color', staticStyles.active.backgroundColor);
      tabs.isTabHaveCustomCSS(customTemplate, 0, 'color', staticStyles.inactive.color);
      tabs.isTabHaveCustomCSS(customTemplate, 0, 'background-color', staticStyles.inactive.backgroundColor);
      tabs.isTabTitleTxtContain(customTemplate, 'Heading', 1);
      tabs.isTabContentContain(customTemplate, 'I\'ve got an HTML heading. Pretty cool!', 1);
    });

    it('when user clicks 3d tab, it become chosen with "Tab with html tags in heading", template has tags i, b', () => {
      tabs.clickOnTab(customTemplate, 2);
      tabs.isAppropriateTabActive(customTemplate, 2);
      tabs.isTabHaveCustomCSS(customTemplate, 2, 'color', staticStyles.active.color);
      tabs.isTabHaveCustomCSS(customTemplate, 2, 'background-color', staticStyles.active.backgroundColor);
      tabs.isTabHaveCustomCSS(customTemplate, 0, 'color', staticStyles.inactive.color);
      tabs.isTabHaveCustomCSS(customTemplate, 0, 'background-color', staticStyles.inactive.backgroundColor);
      tabs.isTabTitleTxtContain(customTemplate, 'Tab 3', 2);
      tabs.isTabContentContain(customTemplate, 'Tab with html tags in heading', 2);
      tabs.isTemplateSrcContain('Custom template', '<i><b>');
    });
  });


  describe('Accessibility', () => {
    const accessibility = tabs.exampleDemosArr.accessibility;

    it('contains info about role="tablist"/"tab"/"tabpanel", aria-controls, aria-selected, aria-labelledby', () => {
      cy.viewport(1440, 900);
      tabs.clickOnDemoMenu('Accessibility');
      tabs.isDemoContainsTxt(accessibility, 'role="tablist"', 'role="tablist"');
      tabs.isDemoContainsTxt(accessibility, 'role="tabpanel"', 'aria-controls');
      tabs.isDemoContainsTxt(accessibility, 'aria-selected', 'aria-labelledby');
    });
  });
});
