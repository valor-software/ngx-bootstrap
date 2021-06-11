import { CollapsePo } from '../support/collapse.po';

describe('Collapse demo page testing suite', () => {
  const collapse = new CollapsePo();

  beforeEach(() => collapse.navigateTo());

  describe('Events', () => {
    const events = collapse.exampleDemosArr.events;

    it('example contains "Toggle collapse" button and div block with "Some content", "Event: expanded"', () => {
      collapse.isCollapseExpanded(events, 'true');
      collapse.isCollapseInfoEqual(events, 'Event: expanded');
    });

    it('when user clicks on "Toggle collapse", then "Some content" disappear and user see "Event: collapsed"', () => {
      const toglerText = 'Toggle collapse';
      collapse.clickByText(events, toglerText);
      collapse.isCollapseExpanded(events, 'false');
      collapse.isCollapseInfoEqual(events, 'Event: collapsed');

    });

    it('when user clicks on "Toggle collapse" again, then "Some content" and "Event: expanded" appear', () => {
      const toglerText = 'Toggle collapse';
      collapse.dblClickByText(events, toglerText);
      collapse.isCollapseExpanded(events, 'true');
      collapse.isCollapseInfoEqual(events, 'Event: expanded');
    });
  });

  describe('Manual toggle', () => {
    const manualToggle = collapse.exampleDemosArr.manualToggle;

    beforeEach(() => {
      collapse.scrollToMenu('Manual toggle');
    });

    it('example contains "Show content" and "Hide content" buttons, div block with "Some content"', () => {
      collapse.isBtnTxtEqual(manualToggle, 'Show content\n', 0);
      collapse.isBtnTxtEqual(manualToggle, 'Hide content\n', 1);
      collapse.isCollapseExpanded(manualToggle, 'true');

    });

    it('when user clicks on "Hide content", then collapse disappear, on "Show content" - "Some content" appear', () => {
      collapse.clickOnBtn(manualToggle, 1);
      collapse.isCollapseExpanded(manualToggle, 'false');

      collapse.clickOnBtn(manualToggle, 0);
      collapse.isCollapseExpanded(manualToggle, 'true');
    });
  });

  describe('Inline display', () => {
    const inlineDisplay = collapse.exampleDemosArr.inlineDisplay;

    beforeEach(() => {
      collapse.scrollToMenu('Inline display');
    });

    it('example contains "Inline-block" and "None" buttons', () => {
      collapse.isBtnTxtEqual(inlineDisplay, 'Inline-block\n', 0);
      collapse.isBtnTxtEqual(inlineDisplay, 'None\n', 1);
      collapse.isCollapseExpanded(inlineDisplay, 'false');

    });

    it('when user clicks on "Inline-block", then collapse appear with inline-block, on "None" - without inline', () => {
      collapse.clickOnBtn(inlineDisplay, 0);
      collapse.isCollapseExpanded(inlineDisplay, 'false');
      collapse.isCollapseWithInline(inlineDisplay, true);

      collapse.clickOnBtn(inlineDisplay, 1);
      collapse.isCollapseExpanded(inlineDisplay, 'false');
      collapse.isCollapseWithInline(inlineDisplay, false);
    });
  });

  describe('Accessibility', () => {
    it('example contains info about "aria-expanded", "aria-controls" attributes', () => {
      const accessibilityInfo = collapse.exampleDemosArr.accessibility;
      cy.viewport(1440, 900);
      collapse.clickOnDemoMenu('Accessibility');
      collapse.isDemoContainsTxt(accessibilityInfo, 'aria-expanded', 'aria-controls');
    });
  });
});
