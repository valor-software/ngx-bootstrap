import { PopoverPo } from '../support/popover.po';

describe('Popover demo page testing suite', () => {

  const popover = new PopoverPo();

  beforeEach(() => popover.navigateTo());

  describe('Basic', () => {

    const basicPopover = popover.exampleDemosArr.basic;

    it('when user clicks on "Live demo", then popover-container shown', () => {
      popover.clickOnBtn(basicPopover);
      popover.isPopoverAppears(basicPopover);
      popover.isPopoverVisible(basicPopover);
    });

    it('when user clicks on "Live demo" again, then popover-container disappeared', () => {
      popover.clickOnBtn(basicPopover);
      popover.clickOnBtn(basicPopover);
      popover.isPopoverDismiss(basicPopover);
    });
  });
});
