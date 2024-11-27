import { expect } from '@playwright/test';
import { BasePo } from './base.po';

export class ButtonsPo extends BasePo {
  override pageUrl = '/ngx-bootstrap/components/buttons';
  pageTitle = 'Buttons';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/buttons';

  buttonNames = [
    'Left',
    'Middle',
    'Right'
  ];

  output = '.card-header';
  buttonGroupSelector = '.btn-group';
  btnRadioGroup = '[btnradiogroup]';

  exampleDemosArr = {
    basic: ' demo-buttons-basic',
    checkbox: ' demo-buttons-checkbox',
    customCheckboxVal: ' demo-custom-checkbox-value',
    checkboxWithForms: ' demo-buttons-checkbox-reactiveforms',
    radioBtnWithRadioGroup: ' demo-buttons-radio-with-group',
    radioBtnWithExplicitGroup: ' demo-buttons-radio',
    radioUnckeckable: ' demo-buttons-radio-uncheckable',
    radioBtnWithForms: ' demo-buttons-radio-reactiveforms',
    disabled: ' demo-buttons-disabled'
  };

  async expectBtnVisible(baseSelector: string, btnSelector: string, btnName: string, btnNumber?: number) {
    await expect(await this.page
      .locator(baseSelector + ` ${btnSelector}`)
      .getByText(btnName)
      .nth(btnNumber ? btnNumber : 0)
    ).toBeVisible();
  }

  async expectBtnEnabled(baseSelector: string, btnName: string, enabled = true, btnNumber?: number) {
    const isDisabled = await this.page
      .locator(baseSelector)
      .getByText(btnName, { exact: true })
      .nth(btnNumber ? btnNumber : 0)
      .getAttribute('disabled');
    const isEnabled = enabled ? isDisabled === null : isDisabled !== null;
    await expect(isEnabled).toBeTruthy();
  }

  async expectBtnHaveClass(baseSelector: string, btnSelector: string, btnName: string, expectedClass: string, isHaveClass = true, btnNumber?: number) {
    const btnClass = await this.page
      .locator(baseSelector + ` ${btnSelector}`)
      .getByText(btnName)
      .nth(btnNumber ? btnNumber : 0)
      .getAttribute('class');
    const isClassContain = btnClass.includes(expectedClass);
    const checkBtnClass = isHaveClass ? isClassContain : !isClassContain;
    await expect(checkBtnClass).toBeTruthy();
  }

  async expectBtnOutputSelected(baseSelector: string, btnNumber: number, selected: boolean) {
    await expect(await this.page
      .locator(baseSelector + ` ${this.output}`)
    ).toContainText(`"${this.buttonNames[btnNumber].toLowerCase()}": ${selected}`);
  }
}
