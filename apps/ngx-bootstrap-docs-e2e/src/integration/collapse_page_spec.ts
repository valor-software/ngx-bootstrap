import { CollapsePo } from '../support/collapse.po';

describe('Collapse demo page testing suite', () => {
  const collapse = new CollapsePo();

  beforeEach(() => collapse.navigateTo());

  describe('Basic', () => {
    const basic = collapse.exampleDemosArr.basic;

    it('contains toggler and content, that can be collapsed', { scrollBehavior: 'center' }, () => {
      const toglerText = 'Toggle collapse';
      collapse.isCollapseExpanded(basic, 'true');

      collapse.clickByText(basic, toglerText);
      collapse.isCollapseExpanded(basic, 'false');
    });
  });
});
