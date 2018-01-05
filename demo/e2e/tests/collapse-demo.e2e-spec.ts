import { $, browser } from 'protractor';
import { leftPanelTests } from './leftPanelTests.po';

const buttonToggle = $('.btn');
const sameContent = $('.well');

async function sameContentIsDisplayed(): Promise<boolean> {
  return await sameContent.isDisplayed();
}

describe('Collapse page test on bootstrap 3', () => {
  beforeAll(() => {
    browser.get('#/collapse');
    leftPanelTests.checkLeftPanelMini();
    leftPanelTests.checkLeftPanelMaxi();
  });

  it('Default states', async () => {
    const sameContentText = await sameContent.getText();

    expect(sameContentIsDisplayed).toBeTruthy();
    expect(sameContentText).toBe('Some content');
  });

  it('Toggle collapse is ON/OFF', () => {
    buttonToggle.click();
    expect(sameContentIsDisplayed).toBeFalsy();

    buttonToggle.click();
    expect(sameContentIsDisplayed).toBeTruthy();
  });
});
