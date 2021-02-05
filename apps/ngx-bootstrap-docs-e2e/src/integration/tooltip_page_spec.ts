import { TooltipPo } from '../support/tooltip.po';

describe('Tooltip demo page testing suite', () => {
  const tooltip = new TooltipPo();

  beforeEach(() => tooltip.navigateTo());

  describe('Basic tooltip', () => {
    const basic = tooltip.exampleDemosArr.basic;

    it('when user on hover on "Simple demo" button, then tooltip-container shown', () => {
      tooltip.focusOnBtn(basic);
      tooltip.isTooltipAppears(basic);
      tooltip.isTooltipVisible(basic);
    });

    it('when user moves the mouse cursor away of tooltip-button, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(basic);
      tooltip.focusToAnotherPlacement('Basic');
      tooltip.isTooltipDismiss(basic);
    });
  });
});
