import { ButtonsPo } from '../support/buttons.po';

describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();
  const buttonGroupSelector = buttons.buttonGroupSelector;

  beforeEach(() => buttons.navigateTo());

  describe('Buttons Checkbox example', () => {
    const checkboxDemo = buttons.exampleDemosArr.checkbox;

    it('example contains 3 btns and output window. as default - picked Middle btn', () => {
      buttons.isButtonVisible(checkboxDemo, 'Left', buttons.buttonGroupSelector);
      buttons.isButtonVisible(checkboxDemo, 'Middle', buttons.buttonGroupSelector);
      buttons.isButtonVisible(checkboxDemo, 'Right', buttons.buttonGroupSelector);
      buttons.isBtnOutputSelected(checkboxDemo, 1, true);
      buttons.isBtnOutputSelected(checkboxDemo, 0, false);
      buttons.isBtnOutputSelected(checkboxDemo, 2, false);
    });

    it('when user clicks on the Left button it became active and after user clicks again - inactive', () => {
      buttons.isButtonVisible(checkboxDemo, 'Left', buttons.buttonGroupSelector);
      buttons.clickByText(checkboxDemo, 'Left');
      buttons.isBtnOutputSelected(checkboxDemo, 0, true);
      buttons.clickByText(checkboxDemo, 'Left');
      buttons.isBtnOutputSelected(checkboxDemo, 0, false);
    });

    it('when user clicks on the Middle button it became inactive and after user clicks again - active', () => {
      buttons.isButtonVisible(checkboxDemo, 'Middle', buttons.buttonGroupSelector);
      buttons.clickByText(checkboxDemo, 'Middle');
      buttons.isBtnOutputSelected(checkboxDemo, 1, false);
      buttons.clickByText(checkboxDemo, 'Middle');
      buttons.isBtnOutputSelected(checkboxDemo, 1, true);
    });

    it('when user clicks on the Right button it became active and after user clicks again - inactive', () => {
      buttons.isButtonVisible(checkboxDemo, 'Right', buttons.buttonGroupSelector);
      buttons.clickByText(checkboxDemo, 'Right');
      buttons.isBtnOutputSelected(checkboxDemo, 2, true);
      buttons.clickByText(checkboxDemo, 'Right');
      buttons.isBtnOutputSelected(checkboxDemo, 2, false);
    });
  });

  describe('Buttons Custom checkbox value example', () => {
    const customCheckboxVal = buttons.exampleDemosArr.customCheckboxVal;

    it('example contains 1 clickable btn with text: "Single Toggle" and "1" in the custom checkbox value field', () => {
      buttons.isButtonVisible(customCheckboxVal, 'Single Toggle', 'button');
      buttons.isPreviewExist(customCheckboxVal, '1');
    });

    it('when user clicks on it, btn become inactive and custom checkbox value should be "0"', () => {
      buttons.isButtonEnabled(customCheckboxVal, 'Single Toggle');
      buttons.isPreviewExist(customCheckboxVal, '1');
      buttons.clickOnBtn(customCheckboxVal);
      buttons.isPreviewExist(customCheckboxVal, '0');
    });
  });

  describe('Buttons Checkbox with Reactive Forms example', () => {
    const checkboxWithForm = buttons.exampleDemosArr.checkboxWithForms;

    it('example contains button-group, contain of 3 parts(labels)', () => {
      buttons.isButtonVisible(checkboxWithForm, 'Left', buttonGroupSelector);
      buttons.isButtonVisible(checkboxWithForm, 'Right', buttonGroupSelector);
      buttons.isButtonVisible(checkboxWithForm, 'Middle', buttonGroupSelector);
    });

    it('when user clicks on the Left button it became active and after user clicks again - inactive', () => {
      buttons.isButtonVisible(checkboxWithForm, 'Left', buttons.buttonGroupSelector);
      buttons.isBtnOutputSelected(checkboxWithForm, 0, false);
      buttons.clickByText(checkboxWithForm, 'Left');
      buttons.isBtnOutputSelected(checkboxWithForm, 0, true);
      buttons.clickByText(checkboxWithForm, 'Left');
      buttons.isBtnOutputSelected(checkboxWithForm, 0, false);
    });

    it('when user clicks on the Middle button it becomes inactive and after user clicks again - active', () => {
      buttons.isButtonVisible(checkboxWithForm, 'Middle', buttons.buttonGroupSelector);
      buttons.isBtnOutputSelected(checkboxWithForm, 1, true);
      buttons.clickByText(checkboxWithForm, 'Middle');
      buttons.isBtnOutputSelected(checkboxWithForm, 1, false);
      buttons.clickByText(checkboxWithForm, 'Middle');
      buttons.isBtnOutputSelected(checkboxWithForm, 1, true);

    });

    it('when user clicks on the Right button it became active and after user clicks again - inactive', () => {
      buttons.isButtonVisible(checkboxWithForm, 'Right', buttons.buttonGroupSelector);
      buttons.isBtnOutputSelected(checkboxWithForm, 2, false);
      buttons.clickByText(checkboxWithForm, 'Right');
      buttons.isBtnOutputSelected(checkboxWithForm, 2, true);
      buttons.clickByText(checkboxWithForm, 'Right');
      buttons.isBtnOutputSelected(checkboxWithForm, 2, false);
    });
  });

  describe('Radio buttons', () => {
    const radioCheck = buttons.exampleDemosArr.radioBtnWithGroup;
    const btnRadioGroup = buttons.btnRadioGroup;

    it('example contains btns, Radio btns and output window. Middle btn is active and other btns - inactive', () => {
      buttons.isButtonVisible(radioCheck, 'Left', buttonGroupSelector);
      buttons.isButtonVisible(radioCheck, 'Middle', buttonGroupSelector);
      buttons.isButtonVisible(radioCheck, 'Right', buttonGroupSelector);
      buttons.isButtonVisible(radioCheck, 'Left', btnRadioGroup);
      buttons.isButtonVisible(radioCheck, 'Middle', btnRadioGroup);
      buttons.isButtonVisible(radioCheck, 'Right', btnRadioGroup);
      buttons.isButtonHaveNoClass(radioCheck, 'Left', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioCheck, 'Left', 'active', btnRadioGroup);
      buttons.isButtonClassActive(radioCheck , 'Middle', 'active', buttonGroupSelector);
      buttons.isButtonClassActive(radioCheck, 'Middle', 'active', btnRadioGroup);
      buttons.isButtonHaveNoClass(radioCheck, 'Right', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioCheck, 'Right', 'active', btnRadioGroup);
      buttons.isPreviewExist(radioCheck, 'Middle');
    });

    it('when user clicks on Left btn, it become active and other btns become inactive', () => {
      buttons.clickByText(radioCheck, 'Left');
      buttons.isButtonClassActive(radioCheck , 'Left', 'active', buttonGroupSelector);
      buttons.isButtonClassActive(radioCheck, 'Left', 'active', btnRadioGroup);
      buttons.isPreviewExist(radioCheck, 'Left');
      buttons.isButtonHaveNoClass(radioCheck, 'Middle', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioCheck, 'Right', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioCheck, 'Middle', 'active', btnRadioGroup);
      buttons.isButtonHaveNoClass(radioCheck, 'Right', 'active', btnRadioGroup);
    });

    it('when user clicks on Right btn, it become active and other btns become inactive', () => {
      buttons.clickByText(radioCheck, 'Right');
      buttons.isButtonClassActive(radioCheck , 'Right', 'active', buttonGroupSelector);
      buttons.isButtonClassActive(radioCheck, 'Right', 'active', btnRadioGroup);
      buttons.isPreviewExist(radioCheck, 'Right');
      buttons.isButtonHaveNoClass(radioCheck, 'Middle', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioCheck, 'Left', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioCheck, 'Middle', 'active', btnRadioGroup);
      buttons.isButtonHaveNoClass(radioCheck, 'Left', 'active', btnRadioGroup);
    });
  });

  describe('Uncheckable radio', () => {
    const radioUncheck = buttons.exampleDemosArr.radioUnckeckable;

    it('as default Middle btn is active and other btns are inactive', () => {
      buttons.isPreviewExist(radioUncheck, 'Middle');
      buttons.isButtonClassActive(radioUncheck , 'Middle', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioUncheck, 'Left', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioUncheck, 'Right', 'active', buttonGroupSelector);
    });

    it('when user clicks on Left btn, it become active and other btns become inactive', () => {
      buttons.clickByText(radioUncheck, 'Left');
      buttons.isButtonClassActive(radioUncheck , 'Left', 'active', buttonGroupSelector);
      buttons.isPreviewExist(radioUncheck, 'Left');
      buttons.isButtonHaveNoClass(radioUncheck, 'Middle', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioUncheck, 'Right', 'active', buttonGroupSelector);
    });

    it('when user clicks on Right btn, it become active and other btns become inactive', () => {
      buttons.clickByText(radioUncheck, 'Right');
      buttons.isButtonClassActive(radioUncheck , 'Right', 'active', buttonGroupSelector);
      buttons.isPreviewExist(radioUncheck, 'Right');
      buttons.isButtonHaveNoClass(radioUncheck, 'Middle', 'active', buttonGroupSelector);
      buttons.isButtonHaveNoClass(radioUncheck, 'Left', 'active', buttonGroupSelector);
    });
  });

  describe('Buttons Radio with Reactive Forms example', () => {
    const radioWithForm = buttons.exampleDemosArr.radioBtnWithForms;

    it('example contains button-group, which contain of 3 parts(labels)', () => {
      buttons.isButtonVisible(radioWithForm, 'A', buttonGroupSelector);
      buttons.isButtonVisible(radioWithForm, 'B', buttonGroupSelector);
      buttons.isButtonVisible(radioWithForm, 'C', buttonGroupSelector);
    });

    it('when user open Radio with Reactive Forms demo. "C" btn has class "active"', () => {
      buttons.isPreviewExist(radioWithForm, '"radio": "C"');
      buttons.isButtonClassActive(radioWithForm, 'C', 'active', buttonGroupSelector);
    });

    it('when user click on "A" btn, it has class "active"', () => {
      buttons.clickByText(radioWithForm, 'A');
      buttons.isPreviewExist(radioWithForm, '"radio": "A"');
      buttons.isButtonClassActive(radioWithForm, 'A', 'active', buttonGroupSelector);
    });

    it('when user click on "B" btn, it becomes class "active"', () => {
      buttons.clickByText(radioWithForm, 'B');
      buttons.isPreviewExist(radioWithForm, '"radio": "B"');
      buttons.isButtonClassActive(radioWithForm, 'B', 'active', buttonGroupSelector);
    });
  });

  describe('Buttons Disabled example', () => {
    const disabledDemo = buttons.exampleDemosArr.disabled;

    it('disabled buttons example contains 2 buttons: "Button", "Enable/Disable"', () => {
      cy.viewport(1440, 900);
      buttons.isButtonVisible(disabledDemo, 'Button', 'button');
      buttons.isButtonVisible(disabledDemo, 'Enable/Disable', 'button');
    });

    it('when user clicks on "Enable/Disable", "Button" become disabled', () => {
      cy.viewport(1440, 900);
      buttons.clickOnDemoMenu('Disabled Buttons');
      buttons.isButtonEnabled(disabledDemo, 'Button');
      buttons.clickOnBtn(disabledDemo, 1);
      buttons.isButtonEnabled(disabledDemo, 'Button', false);
    });

    it('when user clicks on "Enable/Disable" second time, "Button" become enabled and clickable', () => {
      cy.viewport(1440, 900);
      buttons.clickOnDemoMenu('Disabled Buttons');
      buttons.isButtonEnabled(disabledDemo, 'Button');
      buttons.clickOnBtn(disabledDemo, 1);
      buttons.clickOnBtn(disabledDemo, 1);
      buttons.isButtonEnabled(disabledDemo, 'Button');
      buttons.clickOnBtn(disabledDemo, 0);
    });
  });
});
