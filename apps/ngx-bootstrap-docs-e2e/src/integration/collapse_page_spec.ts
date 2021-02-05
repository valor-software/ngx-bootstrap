import { CollapsePo } from '../support/collapse.po';

describe('Collapse demo page testing suite', () => {
  const collapse = new CollapsePo();

  beforeEach(() => collapse.navigateTo());

  describe('Basic', () => {
    const basic = collapse.exampleDemosArr.basic;

    it('contains togler and content, that can be collapsed', () => {
      const toglerText = 'Toggle collapse';
      collapse.isCollapseExpanded(basic, 'true');

      collapse.clickByText(basic, toglerText);
      collapse.isCollapseExpanded(basic, 'false');
    });
  });
});
