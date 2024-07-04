import { test as base } from '@playwright/test';
import { ButtonsPo } from '../support/buttons.po';

const test = base.extend<{ buttonsPo: ButtonsPo }>({
  buttonsPo: async ({ page }, use) => {
    const buttonsPo = new ButtonsPo(page);
    await use(buttonsPo);
  },
});

test.describe('Buttons page testing suite', () => {
  let tabSelector: string;
  let btnGroupSelector: string;

  test.beforeEach(async ({ buttonsPo }) => {
    tabSelector = buttonsPo.getTabSelector('Overview');
    btnGroupSelector = buttonsPo.buttonGroupSelector;
    await buttonsPo.navigateTo();
  });

  test.describe('Buttons Checkbox example', () => {
    let checkboxDemo: string;

    test.beforeEach(async ({ buttonsPo }) => {
      checkboxDemo = tabSelector + buttonsPo.exampleDemosArr.checkbox;
    });

    test('example contains 3 btns and output window. As default - picked Middle btn', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxDemo, btnGroupSelector, 'Left');
      await buttonsPo.expectBtnVisible(checkboxDemo, btnGroupSelector, 'Middle');
      await buttonsPo.expectBtnVisible(checkboxDemo, btnGroupSelector, 'Right');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 1, true);
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 0, false);
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 2, false);
    });

    test('when user clicks on the Left btn it became active and after user clicks again - inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxDemo, btnGroupSelector, 'Left');
      await buttonsPo.clickByText(checkboxDemo, 'Left');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 0, true);
      await buttonsPo.clickByText(checkboxDemo, 'Left');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 0, false);
    });

    test('when user clicks on the Middle btn it became inactive and after user clicks again - active', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxDemo, btnGroupSelector, 'Middle');
      await buttonsPo.clickByText(checkboxDemo, 'Middle');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 1, false);
      await buttonsPo.clickByText(checkboxDemo, 'Middle');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 1, true);
    });

    test('when user clicks on the Right btn it became active and after user clicks again - inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxDemo, btnGroupSelector, 'Right');
      await buttonsPo.clickByText(checkboxDemo, 'Right');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 2, true);
      await buttonsPo.clickByText(checkboxDemo, 'Right');
      await buttonsPo.expectBtnOutputSelected(checkboxDemo, 2, false);
    });
  });

  test.describe('Buttons Custom checkbox value example', () => {
    let customCheckboxVal: string;

    test.beforeEach(async ({ buttonsPo }) => {
      customCheckboxVal = tabSelector + buttonsPo.exampleDemosArr.customCheckboxVal;
    });

    test('example contains 1 clickable btn with text: "Single Toggle" and "1" in the custom checkbox value field', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(customCheckboxVal, 'button', 'Single Toggle');
      await buttonsPo.expectPreviewExist(customCheckboxVal, '1');
    });

    test('when user clicks on it, btn become inactive and custom checkbox value should be "0"', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnEnabled(customCheckboxVal, 'Single Toggle');
      await buttonsPo.expectPreviewExist(customCheckboxVal, '1');
      await buttonsPo.clickOnBtn(customCheckboxVal);
      await buttonsPo.expectPreviewExist(customCheckboxVal, '0');
    });
  });

  test.describe('Buttons Checkbox with Reactive Forms example', () => {
    let checkboxWithForm: string;

    test.beforeEach(async ({ buttonsPo }) => {
      checkboxWithForm = tabSelector + buttonsPo.exampleDemosArr.checkboxWithForms;
    });

    test('example contains button-group, contain of 3 parts(labels)', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxWithForm, btnGroupSelector, 'Left');
      await buttonsPo.expectBtnVisible(checkboxWithForm, btnGroupSelector, 'Right');
      await buttonsPo.expectBtnVisible(checkboxWithForm, btnGroupSelector, 'Middle');
    });

    test('when user clicks on the Left btn it became active and after user clicks again - inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxWithForm, btnGroupSelector, 'Left');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 0, false);
      await buttonsPo.clickByText(checkboxWithForm, 'Left');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 0, true);
      await buttonsPo.clickByText(checkboxWithForm, 'Left');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 0, false);
    });

    test('when user clicks on the Middle btn it becomes inactive and after user clicks again - active', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxWithForm, btnGroupSelector, 'Middle');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 1, true);
      await buttonsPo.clickByText(checkboxWithForm, 'Middle');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 1, false);
      await buttonsPo.clickByText(checkboxWithForm, 'Middle');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 1, true);
    });

    test('when user clicks on the Right btn it became active and after user clicks again - inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(checkboxWithForm, btnGroupSelector, 'Right');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 2, false);
      await buttonsPo.clickByText(checkboxWithForm, 'Right');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 2, true);
      await buttonsPo.clickByText(checkboxWithForm, 'Right');
      await buttonsPo.expectBtnOutputSelected(checkboxWithForm, 2, false);
    });
  });

  test.describe('Radio with radio group example', () => {
    let radioCheck: string;
    let btnRadioGroup: string;

    test.beforeEach(async ({ buttonsPo }) => {
      radioCheck = tabSelector + buttonsPo.exampleDemosArr.radioBtnWithRadioGroup;
      btnRadioGroup = buttonsPo.btnRadioGroup;
    });

    test('example contains two radio btns groups and output windows. Middle btn is active and other btns - inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Left');
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Middle');
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Disabled');
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Right');
      await buttonsPo.expectBtnVisible(radioCheck, 'button', 'Enable/Disable');
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Left', 1);
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Middle', 1);
      await buttonsPo.expectBtnVisible(radioCheck, btnRadioGroup, 'Right', 1);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Left', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Middle', 'active');
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Disabled', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Right', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Left', 'active', false, 1);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Middle', 'active', true, 1);
      await buttonsPo.expectBtnEnabled(radioCheck, 'Disabled', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Right', 'active', false, 1);
      await buttonsPo.expectPreviewExist(radioCheck, 'Middle', 0);
      await buttonsPo.expectPreviewExist(radioCheck, 'Middle', 1);
    });

    test('when user clicks on Left btn, it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioCheck, 'Left');
      await buttonsPo.expectBtnHaveClass(radioCheck , btnRadioGroup, 'Left', 'active');
      await buttonsPo.expectPreviewExist(radioCheck, 'Left');
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Middle', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Disabled', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Right', 'active', false);
    });

    test('when user clicks on Right btn, it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioCheck, 'Right');
      await buttonsPo.expectBtnHaveClass(radioCheck , btnRadioGroup, 'Right', 'active');
      await buttonsPo.expectPreviewExist(radioCheck, 'Right');
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Left', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Middle', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnRadioGroup, 'Disabled', 'active', false);
    });

    test(`when user clicks on Enable/Disable btn, all btns except the active one become disabled
                  and after the second click on Enable/Disable btn all btns become enabled`, async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioCheck, 'Enable/Disable');
      await buttonsPo.expectBtnHaveClass(radioCheck , btnRadioGroup, 'Middle', 'active');
      await buttonsPo.expectPreviewExist(radioCheck, 'Middle');
      await buttonsPo.expectBtnEnabled(radioCheck, 'Left', false);
      await buttonsPo.expectBtnEnabled(radioCheck, 'Middle');
      await buttonsPo.expectBtnEnabled(radioCheck, 'Disabled', false);
      await buttonsPo.expectBtnEnabled(radioCheck, 'Right', false);
      await buttonsPo.clickByText(radioCheck, 'Enable/Disable');
      await buttonsPo.expectBtnHaveClass(radioCheck , btnRadioGroup, 'Middle', 'active');
      await buttonsPo.expectPreviewExist(radioCheck, 'Middle');
      await buttonsPo.expectBtnEnabled(radioCheck, 'Left');
      await buttonsPo.expectBtnEnabled(radioCheck, 'Middle');
      await buttonsPo.expectBtnEnabled(radioCheck, 'Disabled');
      await buttonsPo.expectBtnEnabled(radioCheck, 'Right');
    });

    test('all btns in model group disabled are disabled including the active one', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnEnabled(radioCheck, 'Left', false, 1);
      await buttonsPo.expectBtnEnabled(radioCheck, 'Middle', false, 3);
      await buttonsPo.expectBtnEnabled(radioCheck, 'Right', false, 1);
      await buttonsPo.expectBtnHaveClass(radioCheck , btnRadioGroup, 'Middle', 'active', true, 1);
      await buttonsPo.expectPreviewExist(radioCheck, 'Middle', 1);
    });
  });

  test.describe('Radio with explicit group example', () => {
    let radioCheck: string;

    test.beforeEach(async ({ buttonsPo }) => {
      radioCheck = tabSelector + buttonsPo.exampleDemosArr.radioBtnWithExplicitGroup;
    });

    test('example contains three radio btns groups and output window. Middle btn is active and other btns - inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(radioCheck, btnGroupSelector, 'Left');
      await buttonsPo.expectBtnVisible(radioCheck, btnGroupSelector, 'Middle');
      await buttonsPo.expectBtnVisible(radioCheck, btnGroupSelector, 'Right');
      await buttonsPo.expectPreviewExist(radioCheck, 'Middle');
    });

    test('when user clicks on Left btn, it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioCheck, 'Left');
      await buttonsPo.expectBtnHaveClass(radioCheck , btnGroupSelector, 'Left', 'active');
      await buttonsPo.expectPreviewExist(radioCheck, 'Left');
      await buttonsPo.expectBtnHaveClass(radioCheck, btnGroupSelector, 'Middle', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnGroupSelector, 'Right', 'active', false);
    });

    test('when user clicks on Right btn, it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioCheck, 'Right');
      await buttonsPo.expectBtnHaveClass(radioCheck , btnGroupSelector, 'Right', 'active');
      await buttonsPo.expectPreviewExist(radioCheck, 'Right');
      await buttonsPo.expectBtnHaveClass(radioCheck, btnGroupSelector, 'Left', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioCheck, btnGroupSelector, 'Middle', 'active', false);
    });
  });

  test.describe('Uncheckable radio example', () => {
    let radioUncheck: string;

    test.beforeEach(async ({ buttonsPo }) => {
      radioUncheck = tabSelector + buttonsPo.exampleDemosArr.radioUnckeckable;
    });

    test('as default Middle btn is active and other btns are inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectPreviewExist(radioUncheck, 'Middle');
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Middle', 'active');
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Left', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Right', 'active', false);
    });

    test('when user clicks on Left btn it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioUncheck, 'Left');
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Left', 'active');
      await buttonsPo.expectPreviewExist(radioUncheck, 'Left');
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Middle', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Right', 'active', false);
    });

    test('when user clicks on Right btn, it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioUncheck, 'Right');
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Right', 'active');
      await buttonsPo.expectPreviewExist(radioUncheck, 'Right');
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Middle', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioUncheck, btnGroupSelector, 'Left', 'active', false);
    });
  });

  test.describe('Buttons Radio with Reactive Forms example', () => {
    let radioWithForm: string;

    test.beforeEach(async ({ buttonsPo }) => {
      radioWithForm = tabSelector + buttonsPo.exampleDemosArr.radioBtnWithForms;
    });

    test('example contains button-group, which contain of 3 radio btns and Enable/Disable btn);', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(radioWithForm, btnGroupSelector, 'A');
      await buttonsPo.expectBtnVisible(radioWithForm, btnGroupSelector, 'B');
      await buttonsPo.expectBtnVisible(radioWithForm, btnGroupSelector, 'C');
      await buttonsPo.expectBtnVisible(radioWithForm, 'button', 'Enable/Disable');
    });

    test('as default "C" btn is active and other btns are inactive', async ({ buttonsPo }) => {
      await buttonsPo.expectPreviewExist(radioWithForm, '"radio": "C"');
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'C', 'active');
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'A', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'B', 'active', false);
    });

    test('when user click on "A" btn it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioWithForm, 'A');
      await buttonsPo.expectPreviewExist(radioWithForm, '"radio": "A"');
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'A', 'active');
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'B', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'C', 'active', false);
    });

    test('when user click on "B" btn it becomes active and other btns become inactive', async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioWithForm, 'B');
      await buttonsPo.expectPreviewExist(radioWithForm, '"radio": "B"');
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'B', 'active');
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'A', 'active', false);
      await buttonsPo.expectBtnHaveClass(radioWithForm, btnGroupSelector, 'C', 'active', false);
    });

    test(`when user clicks on Enable/Disable btn, all btns one become disabled and after the second click on Enable/Disable btn
                  all btns become enabled`, async ({ buttonsPo }) => {
      await buttonsPo.clickByText(radioWithForm, 'Enable/Disable');
      await buttonsPo.expectBtnHaveClass(radioWithForm , btnGroupSelector, 'C', 'active');
      await buttonsPo.expectPreviewExist(radioWithForm, '"radio": "C"');
      await buttonsPo.expectBtnEnabled(radioWithForm, 'A', false);
      await buttonsPo.expectBtnEnabled(radioWithForm, 'B', false);
      await buttonsPo.expectBtnEnabled(radioWithForm, 'C', false);
      await buttonsPo.clickByText(radioWithForm, 'Enable/Disable');
      await buttonsPo.expectBtnHaveClass(radioWithForm , btnGroupSelector, 'C', 'active');
      await buttonsPo.expectPreviewExist(radioWithForm, '"radio": "C"');
      await buttonsPo.expectBtnEnabled(radioWithForm, 'A');
      await buttonsPo.expectBtnEnabled(radioWithForm, 'B');
      await buttonsPo.expectBtnEnabled(radioWithForm, 'C');
    });
  });

  test.describe('Buttons Disabled example', () => {
    let disabledDemo: string;

    test.beforeEach(async ({ buttonsPo }) => {
      disabledDemo = buttonsPo.exampleDemosArr.disabled;
    });

    test('disabled buttons example contains 2 buttons: "Button", "Enable/Disable"', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(disabledDemo, 'button', 'Button');
      await buttonsPo.expectBtnVisible(disabledDemo, 'button','Enable/Disable');
    });

    test('when user clicks on "Enable/Disable", "Button" becomes disabled', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnEnabled(disabledDemo, 'Button');
      await buttonsPo.clickByText(disabledDemo, 'Enable/Disable');
      await buttonsPo.expectBtnEnabled(disabledDemo, 'Button', false);
    });

    test('when user clicks on "Enable/Disable" second time, "Button" becomes enabled and clickable', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnEnabled(disabledDemo, 'Button');
      await buttonsPo.clickByText(disabledDemo, 'Enable/Disable');
      await buttonsPo.expectBtnEnabled(disabledDemo, 'Button', false);
      await buttonsPo.clickByText(disabledDemo, 'Enable/Disable');
      await buttonsPo.expectBtnEnabled(disabledDemo, 'Button');
      await buttonsPo.clickByText(disabledDemo, 'Button');
    });
  });
});
