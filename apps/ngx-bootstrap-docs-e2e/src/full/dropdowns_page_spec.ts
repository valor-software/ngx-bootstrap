import { DropdownsPo } from '../support/dropdowns.po';

describe('Dropdowns demo page testing suite', () => {
  const dropdowns = new DropdownsPo();

  beforeEach(() => dropdowns.navigateTo());

  describe('Trigger by tag <a>', () => {
    const triggerTag = dropdowns.exampleDemosArr.triggerByTag;

    it(`example contains clickable link as a dropdown, when user clicks on it, then dropdown opened with 3 items,
    when user clicks on any item, then dropdown closes`, () => {
      dropdowns.isDropdownExpanded(triggerTag, 'a', false);
      dropdowns.clickByText(triggerTag, 'Click me for a dropdown');
      dropdowns.isDropdownExpanded(triggerTag, 'a', true);
      dropdowns.isDropdownItemsLengthEqual(triggerTag, 3);
      dropdowns.clickByText(triggerTag, 'but wait');
      dropdowns.isDropdownExpanded(triggerTag, 'a', false);
    });
  });

  describe('Split button dropdowns', () => {
    const splitBtn = dropdowns.exampleDemosArr.splitButton;

    it(`example contains dropdown, which consist of 2 buttons: with text and with caret, not expanded
    when user clicks on text, nothing happens`, () => {
      dropdowns.isBtnTxtEqual(splitBtn, 'Action', 0);
      dropdowns.isBtnTxtEqual(splitBtn, 'Split button!', 1);
      dropdowns.isDropdownExpanded(splitBtn, 'button', false);
      dropdowns.clickOnBtn(splitBtn, 0);
      dropdowns.isDropdownExpanded(splitBtn, 'button', false);
    });

    it(`when user clicks on caret, then dropdown opened and there are 4 items, 1 of them is separated
    when user clicks on any item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(splitBtn, 1);
      dropdowns.isDropdownExpanded(splitBtn, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(splitBtn, 4);
      dropdowns.isSeparatorExist(splitBtn, true);
      dropdowns.clickOnDropdownItem(splitBtn);
      dropdowns.isDropdownExpanded(splitBtn, 'button', false);
    });
  });

  describe('Manual triggering', () => {
    const manualTrigger = dropdowns.exampleDemosArr.manualTrigger;

    it('example contains 4 clickable buttons: "Button dropdown", "Toggle", "Show", "Hide"', () => {
      dropdowns.isBtnTxtEqual(manualTrigger, ' Button dropdown ', 0);
      dropdowns.isBtnTxtEqual(manualTrigger, 'Toggle', 1);
      dropdowns.isBtnTxtEqual(manualTrigger, 'Show', 2);
      dropdowns.isBtnTxtEqual(manualTrigger, 'Hide', 3);
      dropdowns.isDropdownExpanded(manualTrigger, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened and there are 3 items
    when user clicks on "Button dropdown" again, then dropdown closes`, () => {
      dropdowns.clickOnBtn(manualTrigger);
      dropdowns.isDropdownExpanded(manualTrigger, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(manualTrigger, 3);
      dropdowns.clickOnBtn(manualTrigger);
      dropdowns.isDropdownExpanded(manualTrigger, 'button', false);
    });

    it(`when user clicks on "Toggle", then dropdown opened and there are 3 items
    when user clicks on "Toggle" again, then dropdown closes`, () => {
      dropdowns.clickByText(manualTrigger, 'Toggle');
      dropdowns.isDropdownExpanded(manualTrigger, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(manualTrigger, 3);
      dropdowns.clickByText(manualTrigger, 'Toggle');
      dropdowns.isDropdownExpanded(manualTrigger, 'button', false);
    });

    it(`when user clicks on "Show", then dropdown opened and there are 3 items
    when user clicks on "Show" again, nothing happens`, () => {
      dropdowns.clickByText(manualTrigger, 'Show');
      dropdowns.isDropdownExpanded(manualTrigger, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(manualTrigger, 3);
      dropdowns.clickByText(manualTrigger, 'Show');
      dropdowns.isDropdownExpanded(manualTrigger, 'button', true);
    });

    it(`when user clicks on "Show" and then on any item, nothing happens
    when user clicks on "Hide", then dropdown closes`, () => {
      dropdowns.clickByText(manualTrigger, 'Show');
      dropdowns.isDropdownExpanded(manualTrigger, 'button', true);
      dropdowns.clickOnDropdownItem(manualTrigger);
      dropdowns.isDropdownExpanded(manualTrigger, 'button', true);
      dropdowns.clickByText(manualTrigger, 'Hide');
      dropdowns.isDropdownExpanded(manualTrigger, 'button', false);
    });
  });

  describe('Trigger by isOpen property', () => {
    const triggerByIsOpen = dropdowns.exampleDemosArr.triggerByIsOpen;

    it(`example contains 2 clickable buttons "Button dropdown" and "Toggle"`, () => {
      dropdowns.isBtnTxtEqual(triggerByIsOpen, ' Button dropdown ', 0);
      dropdowns.isBtnTxtEqual(triggerByIsOpen, 'Toggle', 1);
      dropdowns.isDropdownExpanded(triggerByIsOpen, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened and there are 3 items, when user clicks on any item,
    nothing happens, after clicks on "Toggle" - dropdown closed`, () => {
      dropdowns.clickByText(triggerByIsOpen, 'Button dropdown');
      dropdowns.isDropdownExpanded(triggerByIsOpen, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(triggerByIsOpen, 3);
      dropdowns.clickOnDropdownItem(triggerByIsOpen);
      dropdowns.isDropdownExpanded(triggerByIsOpen, 'button', true);
      dropdowns.clickByText(triggerByIsOpen, 'Toggle');
      dropdowns.isDropdownExpanded(triggerByIsOpen, 'button', false);
    });

    it(`when user clicks on "Toggle" again, then dropdown opened and there are 3 items
    when user clicks on "Toggle" again, then dropdown closed again`, () => {
      dropdowns.clickByText(triggerByIsOpen, 'Toggle');
      dropdowns.isDropdownExpanded(triggerByIsOpen, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(triggerByIsOpen, 3);
      dropdowns.clickByText(triggerByIsOpen, 'Toggle');
      dropdowns.isDropdownExpanded(triggerByIsOpen, 'button', false);
    });
  });

  describe('Disabled menu', () => {
    const disabledMenu = dropdowns.exampleDemosArr.disabledMenu;

    it(`example contains 2 clickable buttons "Button dropdown" and "Enable/Disable"`, () => {
      dropdowns.isBtnTxtEqual(disabledMenu, ' Button dropdown ', 0);
      dropdowns.isBtnTxtEqual(disabledMenu, ' Enable/Disable\n', 1);
      dropdowns.isDropdownExpanded(disabledMenu, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened and there are 4 items, 1 of them is separated
    when user clicks on any item, dropdown closes`, () => {
      dropdowns.clickByText(disabledMenu, 'Button dropdown');
      dropdowns.isDropdownExpanded(disabledMenu, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(disabledMenu, 4);
      dropdowns.isSeparatorExist(disabledMenu, true);
      dropdowns.clickOnDropdownItem(disabledMenu);
      dropdowns.isDropdownExpanded(disabledMenu, 'button', false);
    });

    it(`when user clicks on "Enable/Disable", then "Button dropdown" disabled and user can't click on it
    when user clicks on "Enable/Disable" again, then "Button dropdown" active again`, () => {
      dropdowns.clickByText(disabledMenu, 'Enable/Disable');
      dropdowns.isDropdownDisabled(disabledMenu, true);
      dropdowns.clickByText(disabledMenu, 'Enable/Disable');
      dropdowns.isDropdownDisabled(disabledMenu, false);
    });

    it(`when user clicks on "Button dropdown" again, then dropdown opened and there are 4 items
    when user clicks on any item, dropdown closes`, () => {
      dropdowns.clickByText(disabledMenu, 'Enable/Disable');
      dropdowns.clickByText(disabledMenu, 'Enable/Disable');
      dropdowns.isDropdownDisabled(disabledMenu, false);
      dropdowns.clickByText(disabledMenu, 'Button dropdown');
      dropdowns.isDropdownExpanded(disabledMenu, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(disabledMenu, 4);
      dropdowns.clickOnDropdownItem(disabledMenu);
      dropdowns.isDropdownExpanded(disabledMenu, 'button', false);
    });
  });

  describe('Mark item as disabled', () => {
    const disabledItem = dropdowns.exampleDemosArr.disabledItem;

    it(`example contains clickable button "Button dropdown"`, () => {
      dropdowns.isBtnTxtEqual(disabledItem, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(disabledItem, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened and there are 3 items, first is disabled,
    and other is enabled when user clicks on the first item, nothing happens`, () => {
      dropdowns.clickOnBtn(disabledItem, 0);
      dropdowns.isDropdownExpanded(disabledItem, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(disabledItem, 3);
      dropdowns.isDropdownItemDisabled(disabledItem, 0, true);
      dropdowns.isDropdownItemDisabled(disabledItem, 1, false);
      dropdowns.isDropdownItemDisabled(disabledItem, 2, false);
      dropdowns.clickOnDropdownItem(disabledItem, 0);
// TODO need improve logic, after click on disabled item, dropdown should stay opened
      dropdowns.isDropdownExpanded(disabledItem, 'button', false);
    });

    it(`when user clicks on the second item, then dropdown closes
    when user clicks on "Button dropdown" again, then dropdown opened in the same state`, () => {
      dropdowns.clickOnBtn(disabledItem, 0);
      dropdowns.clickOnDropdownItem(disabledItem, 1);
      dropdowns.isDropdownExpanded(disabledItem, 'button', false);
      dropdowns.clickOnBtn(disabledItem, 0);
      dropdowns.isDropdownExpanded(disabledItem, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(disabledItem, 3);
      dropdowns.isDropdownItemDisabled(disabledItem, 0, true);
      dropdowns.isDropdownItemDisabled(disabledItem, 1, false);
      dropdowns.isDropdownItemDisabled(disabledItem, 2, false);
    });

    it(`when user clicks on the third item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(disabledItem, 0);
      dropdowns.clickOnDropdownItem(disabledItem, 2);
      dropdowns.isDropdownExpanded(disabledItem, 'button', false);
    });
  });

  describe('Menu alignment', () => {
    const menuAlignment = dropdowns.exampleDemosArr.alignment;

    it(`example contains clickable button with long text "This dropdown's menu is right-aligned"`, () => {
      dropdowns.isBtnTxtEqual(menuAlignment, ' This dropdown\'s menu is right-aligned ', 0);
      dropdowns.isDropdownExpanded(menuAlignment, 'button', false);
    });

    it(`when user clicks on this button, then dropdown opened and there are 4 items, one of them is separated
    opened dropdown should be aligned to the right, when user clicks on any - dropdown closes`, () => {
      dropdowns.clickOnBtn(menuAlignment, 0);
      dropdowns.isDropdownExpanded(menuAlignment, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(menuAlignment, 4);
      dropdowns.isSeparatorExist(menuAlignment, true);
      dropdowns.isDropdownContentAligned(menuAlignment, 'right');
      dropdowns.clickOnDropdownItem(menuAlignment, 1);
      dropdowns.isDropdownExpanded(menuAlignment, 'button', false);
    });
  });

  describe('Inside click', () => {
    const insideClick = dropdowns.exampleDemosArr.insideClick;

    it(`example contains clickable button "Button dropdown", be default dropdown is closed`, () => {
      dropdowns.isBtnTxtEqual(insideClick, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(insideClick, 'button', false);
    });

    it(`when user clicks on it, then dropdown opened and there are 4 items with 1 separator
    when user clicks on any item, then nothing happens, dropdown still opened
    when user clicks on button again, dropdown closed`, () => {
      dropdowns.clickOnBtn(insideClick, 0);
      dropdowns.isDropdownExpanded(insideClick, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(insideClick, 4);
      dropdowns.isSeparatorExist(insideClick, true);
      dropdowns.clickOnDropdownItem(insideClick, 2);
      dropdowns.isDropdownExpanded(insideClick, 'button', true);
      dropdowns.clickOnBtn(insideClick, 0);
      dropdowns.isDropdownExpanded(insideClick, 'button', false);
    });
  });

  describe('Nested dropdowns (experimental)', () => {
    const nestedDropdown = dropdowns.exampleDemosArr.nestedDropdown;
    const appendedToBodyDropdown = 'bs-dropdown-container';

    it(`example contains user see clickable button "dropdown has nested submenu"`, () => {
      dropdowns.isButtonExist(nestedDropdown, ' This dropdown has nested submenu ', 0);
      dropdowns.isDropdownExpanded(nestedDropdown, 'button', false);
    });

    it(`when user clicks on this button, then dropdown opened and there are 5 items, one of them is separated`, () => {
      dropdowns.clickOnBtn(nestedDropdown, 0);
      dropdowns.isDropdownExpanded(nestedDropdown, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(appendedToBodyDropdown, 5);
      dropdowns.isSeparatorExist(appendedToBodyDropdown, true);
    });

    it(`when user move mouse to the first item with caret, then nested dropdown opened with 3 items inside
    when user move mouse to 2d item with caret, then nested dropdown opened with 3 items inside`, () => {
      dropdowns.clickOnBtn(nestedDropdown, 0);
      dropdowns.mouseOver(`${appendedToBodyDropdown} .dropdown-toggle`);
      dropdowns.isDropdownExpanded(appendedToBodyDropdown, '.show', true, 1);
      dropdowns.isDropdownItemsLengthEqual(appendedToBodyDropdown, 3, 1, true);
      dropdowns.mouseOver(`${appendedToBodyDropdown} .dropdown-toggle`, 1);
      dropdowns.isDropdownExpanded(appendedToBodyDropdown, '.show', true, 2);
      dropdowns.isDropdownItemsLengthEqual(appendedToBodyDropdown, 3, 2, true);
    });

    it(`when user clicks on any item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(nestedDropdown, 0);
      dropdowns.clickOnDropdownItem(appendedToBodyDropdown, 4);
      dropdowns.isDropdownExpanded(nestedDropdown, 'button', true);
      dropdowns.clickOnBtn(nestedDropdown, 0);
      dropdowns.isDropdownExpanded(nestedDropdown, 'button', false);
    });
  });

  describe('Append to body', () => {
    const appendToBody = dropdowns.exampleDemosArr.appendToBody;
    const appendedToBodyDropdown = 'bs-dropdown-container';

    it(`example contains clickable button "Dropdown on Body"
    template src should be implemented with dropdown container="body"`, () => {
      dropdowns.isButtonExist(appendToBody, ' Dropdown on Body ', 0);
      dropdowns.isDropdownExpanded(appendToBody, 'button', false);
      dropdowns.isTemplateSrcContain('Append to body', 'container="body"');
    });

    it(`when user clicks on this button, then dropdown opened and there are 4 items, one of them is separated
    when user clicks on any item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(appendToBody, 0);
      dropdowns.isDropdownExpanded(appendToBody, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(appendedToBodyDropdown, 4);
      dropdowns.isSeparatorExist(appendedToBodyDropdown, true);
      dropdowns.clickOnDropdownItem(appendedToBodyDropdown, 3);
      dropdowns.isDropdownExpanded(appendToBody, 'button', false);
    });
  });

  describe('Dropup variation', () => {
    const dropup = dropdowns.exampleDemosArr.dropup;

    it(`example contains clickable button "Dropup"
    component src should be implemented with isDropup = true param`, () => {
      dropdowns.isButtonExist(dropup, ' Dropup ', 0);
      dropdowns.isDropdownExpanded(dropup, 'button', false);
      dropdowns.isComponentSrcContain('Dropup variation', 'isDropup = true');
    });

    it(`when user clicks on this button, then dropdown opened to top and there are 4 items, one of them is separated
    when user clicks on any item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(dropup, 0);
      dropdowns.isDropdownExpanded(dropup, 'button', true);
      dropdowns.isDropdownContentAligned(dropup, 'top');
      dropdowns.isDropdownItemsLengthEqual(dropup, 4);
      dropdowns.isSeparatorExist(dropup, true);
      dropdowns.clickOnDropdownItem(dropup, 2);
      dropdowns.isDropdownExpanded(dropup, 'button', false);
    });
  });

  describe('Menu dividers', () => {
    const menuDividers = dropdowns.exampleDemosArr.menuDividers;

    it(`example contains clickable button "Button dropdown"
    template src should be implemented with divider class`, () => {
      dropdowns.isButtonExist(menuDividers, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(menuDividers, 'button', false);
      dropdowns.isTemplateSrcContain('Menu dividers', 'class="divider dropdown-divider"');
    });

    it(`when user clicks on this button, then dropdown opened to top and there are 4 items, one of them is separated
    when user clicks on any item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(menuDividers, 0);
      dropdowns.isDropdownExpanded(menuDividers, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(menuDividers, 4);
      dropdowns.isSeparatorExist(menuDividers, true);
      dropdowns.clickOnDropdownItem(menuDividers, 2);
      dropdowns.isDropdownExpanded(menuDividers, 'button', false);
    });
  });

  describe('Custom html', () => {
    const customHtml = dropdowns.exampleDemosArr.customHtml;

    it(`example contains clickable button "Button dropdown"`, () => {
      dropdowns.isButtonExist(customHtml, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(customHtml, 'button', false);
    });

    it(`when user clicks on this button, then dropdown opened and there are 3 items
    latest item in dropdown should have specific class`, () => {
      dropdowns.clickOnBtn(customHtml, 0);
      dropdowns.isDropdownExpanded(customHtml, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(customHtml, 3);
      dropdowns.isItemHave(customHtml, 2, '.badge');
    });
  });

  describe('Configuring defaults', () => {
    const configDefaults = dropdowns.exampleDemosArr.configDefaults;

    it(`example contains clickable button "Button dropdown", component src should be written
    with BsDropdownConfig as a provider and autoClose: false as a value object`, () => {
      dropdowns.isButtonExist(configDefaults, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(configDefaults, 'button', false);
      dropdowns.isComponentSrcContain('Configuring defaults', 'BsDropdownConfig');
      dropdowns.isComponentSrcContain('Configuring defaults', 'autoClose: false');
    });

    it(`when user clicks on "Button dropdown", then dropdown opened and there are 3 items
    after click on any item, nothing happens, after click on btn again, dropdown closes`, () => {
      dropdowns.clickOnBtn(configDefaults, 0);
      dropdowns.isDropdownExpanded(configDefaults, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(configDefaults, 3);
      dropdowns.clickOnDropdownItem(configDefaults, 1);
      dropdowns.isDropdownExpanded(configDefaults, 'button', true);
      dropdowns.clickOnBtn(configDefaults, 0);
      dropdowns.isDropdownExpanded(configDefaults, 'button', false);
    });
  });

  describe('Visibility Events', () => {
    const visibilityEvents = dropdowns.exampleDemosArr.visibilityEvents;

    it(`example contains clickable button "Button dropdown"`, () => {
      dropdowns.isButtonExist(visibilityEvents, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(visibilityEvents, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened, there are 3 items,
    card "Event onShown is fired" should be shown,
    after clicks on any item, dropdown closed and card "Event onHidden is fired" is shown`, () => {
      dropdowns.clickOnBtn(visibilityEvents, 0);
      dropdowns.isDropdownExpanded(visibilityEvents, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(visibilityEvents, 3);
      dropdowns.isPreviewExist(visibilityEvents, 'Event onShown is fired', 0);
      dropdowns.clickOnDropdownItem(visibilityEvents, 2);
      dropdowns.isPreviewExist(visibilityEvents, 'Event onHidden is fired', 1);
    });

    it(`when user clicks on "Button dropdown" again, dropdown opened, card "Event onHidden is fired" is hidden`, () => {
      dropdowns.clickOnBtn(visibilityEvents, 0);
      dropdowns.clickOnDropdownItem(visibilityEvents, 2);
      dropdowns.clickOnBtn(visibilityEvents, 0);
      dropdowns.isPreviewExist(visibilityEvents, 'Event onShown is fired', 0);
      dropdowns.isDropdownExpanded(visibilityEvents, 'button', true);
      dropdowns.clickOnBtn(visibilityEvents, 0);
      dropdowns.isPreviewExist(visibilityEvents, 'Event onHidden is fired', 1);
    });
  });

  describe('State change event', () => {
    const stateChangeEvent = dropdowns.exampleDemosArr.stateChangeEvent;

    it(`example contains clickable button "Button dropdown"`, () => {
      dropdowns.isButtonExist(stateChangeEvent, ' Button dropdown ', 0);
      dropdowns.isDropdownExpanded(stateChangeEvent, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened with 3 items, "The dropdown is opened" shown
    when user clicks on any item, then dropdown closed, "The dropdown is closed" is shown`, () => {
      dropdowns.clickOnBtn(stateChangeEvent, 0);
      dropdowns.isDropdownExpanded(stateChangeEvent, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(stateChangeEvent, 3);
      dropdowns.isPreviewExist(stateChangeEvent, 'The dropdown is opened', 0);
      dropdowns.clickOnDropdownItem(stateChangeEvent, 2);
      dropdowns.isDropdownExpanded(stateChangeEvent, 'button', false);
      dropdowns.isPreviewExist(stateChangeEvent, 'The dropdown is closed', 0);
    });

    it(`when user clicks on btn again, then dropdown opened, card "The dropdown is opened" is shown
    when user clicks on btn again, then dropdown closed, card "The dropdown is closed" is shown`, () => {
      dropdowns.clickOnBtn(stateChangeEvent, 0);
      dropdowns.clickOnDropdownItem(stateChangeEvent, 2);
      dropdowns.clickOnBtn(stateChangeEvent, 0);
      dropdowns.isDropdownExpanded(stateChangeEvent, 'button', true);
      dropdowns.isPreviewExist(stateChangeEvent, 'The dropdown is opened', 0);
      dropdowns.clickOnBtn(stateChangeEvent, 0);
      dropdowns.isDropdownExpanded(stateChangeEvent, 'button', false);
      dropdowns.isPreviewExist(stateChangeEvent, 'The dropdown is closed', 0);
    });
  });

  describe('Auto close', () => {
    const autoClose = dropdowns.exampleDemosArr.autoClose;

    it(`example contains 2 clickable buttons "Button dropdown"`, () => {
      dropdowns.isButtonExist(autoClose, ' Button dropdown ', 0);
      dropdowns.isButtonExist(autoClose, ' Button dropdown ', 1);
      dropdowns.isDropdownExpanded(autoClose, 'button', false, 0);
      dropdowns.isDropdownExpanded(autoClose, 'button', false, 1);
    });

    it(`when user clicks on the first "Button dropdown", then dropdown opened and there are 3 items inside
    when user press "ESC", then this dropdown closes`, () => {
      dropdowns.clickOnBtn(autoClose, 0);
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 0);
      dropdowns.isDropdownItemsLengthEqual(autoClose, 3);
      dropdowns.pressEsc();
      dropdowns.isDropdownExpanded(autoClose, 'button', false, 0);
    });

    it(`when user clicks on the first "Button dropdown", then dropdown opened and there are 3 items inside
    when user clicks outside dropdown, then this dropdown closes`, () => {
      dropdowns.clickOnBtn(autoClose, 0);
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 0);
      dropdowns.isDropdownItemsLengthEqual(autoClose, 3);
      dropdowns.clickOutside(`${autoClose} button`);
      dropdowns.isDropdownExpanded(autoClose, 'button', false, 0);
    });

    it(`when user clicks on the second "Button dropdown", then dropdown opened and there are 3 items inside
    when user press "ESC", nothing happens`, () => {
      dropdowns.clickOnBtn(autoClose, 1);
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 1);
      dropdowns.isDropdownItemsLengthEqual(autoClose, 3);
      dropdowns.pressEsc();
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 1);
    });

    it(`when user clicks on the second "Button dropdown", then dropdown opened and there are 3 items inside
    when user clicks outside dropdown, nothing happens`, () => {
      dropdowns.clickOnBtn(autoClose, 1);
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 1);
      dropdowns.isDropdownItemsLengthEqual(autoClose, 3);
      dropdowns.clickOutside(`${autoClose} button`);
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 1);
    });

    it(`when user clicks on the second "Button dropdown" again, then dropdown closed`, () => {
      dropdowns.clickOnBtn(autoClose, 1);
      dropdowns.isDropdownExpanded(autoClose, 'button', true, 1);
      dropdowns.clickOnBtn(autoClose, 1);
      dropdowns.isDropdownExpanded(autoClose, 'button', false, 1);
    });
  });

  describe('Accessibility', () => {
    const accessibility = dropdowns.exampleDemosArr.accessibility;

    it(`example contains info about role="menu" widget and role and aria- attributes`, () => {
      cy.viewport(1440, 900);
      dropdowns.clickOnDemoMenu('Accessibility');
      dropdowns.isDemoContainsTxt(accessibility, 'role="menu"', 'aria- attributes');
    });
  });
});
