import { test as base } from '@playwright/test';
import { ButtonsPo } from '../support/buttons.po';

const test = base.extend<{ buttonsPo: ButtonsPo }>({
  buttonsPo: async ({ page }, use) => {
    const buttonsPo = new ButtonsPo(page);
    await use(buttonsPo);
  },
});

test.describe('Buttons page testing suite', () => {
  let tabName: string;
  let tabSelector: string;

  test.beforeEach(async ({ buttonsPo }) => {
    tabName = 'Overview';
    tabSelector = `tab[heading="${tabName}"]`;
    await buttonsPo.navigateTo();
  });

  test.describe('Basic', () => {
    let basicBtn: string;

    test.beforeEach(async ({ buttonsPo }) => {
      basicBtn = tabSelector + buttonsPo.exampleDemosArr.basic;
    });

    test('example contains only enabled button with text on it', async ({ buttonsPo }) => {
      await buttonsPo.expectBtnVisible(basicBtn, 'button', 'Single Button');
      await buttonsPo.expectBtnEnabled(basicBtn, 'Single Button');
      await buttonsPo.clickOnBtn(basicBtn);
      await buttonsPo.expectBtnTxtEqual(basicBtn, ' Single Button\n');
    });
  });
});
