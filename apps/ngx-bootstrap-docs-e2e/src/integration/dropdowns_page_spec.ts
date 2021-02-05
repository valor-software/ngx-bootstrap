import { DropdownsPo } from '../support/dropdowns.po';

describe('Dropdowns demo page testing suite', () => {
  const dropdowns = new DropdownsPo();

  beforeEach(() => {
    dropdowns.navigateTo();
    dropdowns.scrollToMenu('Basic');
  });

  describe('Basic', () => {
    const basic = dropdowns.exampleDemosArr.basic;

    it(`example contains "Button dropdown" which not expanded by default`, () => {
      dropdowns.isBtnTxtEqual(basic, ' Button dropdown ');
      dropdowns.isDropdownExpanded(basic, 'button', false);
    });

    it(`when user clicks on "Button dropdown", then dropdown opened and there are 4 items, 1 of them is separated
                   when user clicks on any item, then dropdown closes`, () => {
      dropdowns.clickOnBtn(basic);
      dropdowns.isDropdownExpanded(basic, 'button', true);
      dropdowns.isDropdownItemsLengthEqual(basic, 4);
      dropdowns.isSeparatorExist(basic, true);
      dropdowns.clickOnDropdownItem(basic);
      dropdowns.isDropdownExpanded(basic, 'button', false);
    });
  });
});
