import { TabsPo } from '../support/tabs.po';

describe('Tabs demo page spec', () => {
  const tabs = new TabsPo();

  beforeEach(() => tabs.navigateTo());

  describe('Basic', () => {
    const basic = tabs.exampleDemosArr.basic;

    beforeEach(() => tabs.scrollToMenu('Basic'));

    it('example contains tabs component with 3 tabs, 1st tab opened and there is content: "Basic content"', () => {
      tabs.isTabTitleTxtContain(basic, 'Basic');
      tabs.isTabContentContain(basic, 'Basic content');
      tabs.isAppropriateTabActive(basic, 0);
      tabs.isTabsLengthEqual(basic, 3);
    });

    it('when user clicks on the 2d tab, it chosen with appropriate content, and same behaviour with 3, 1', () => {
      tabs.clickOnTab(basic, 1);
      tabs.isAppropriateTabActive(basic, 1);
      tabs.clickOnTab(basic, 2);
      tabs.isAppropriateTabActive(basic, 2);
      tabs.clickOnTab(basic, 0);
      tabs.isAppropriateTabActive(basic, 0);
      tabs.isTabContentContain(basic, 'Basic content');
    });
  });
});
