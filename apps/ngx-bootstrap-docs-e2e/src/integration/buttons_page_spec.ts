import { ButtonsPo } from '../support/buttons.po';

describe('Buttons page testing suite', () => {
  const buttons = new ButtonsPo();

  beforeEach(() => buttons.navigateTo());

  describe('Basic', () => {
    const basicBtn = buttons.exampleDemosArr.basic;

    it('example contains only enabled button with text on it', () => {
      buttons.isButtonEnabled(basicBtn, 'Single Button');
      buttons.clickOnBtn(basicBtn);
      buttons.isBtnTxtEqual(basicBtn, ' Single Button\n');
    });
  });
});
