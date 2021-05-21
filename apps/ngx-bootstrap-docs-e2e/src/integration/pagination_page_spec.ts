import { PaginationPo } from '../support/pagination.po';

describe('Pagination demo page testing suite', () => {
  const pagination = new PaginationPo();

  beforeEach(() => pagination.navigateTo());

  describe('Basic', () => {
    const basic = pagination.exampleDemosArr.basic;

    it('example contains: 1st page is active, previous button is disabled', () => {
      pagination.isActivePositionEqual(basic, '1');
      pagination.isPagerDisabled(basic, 'Next', false);
      pagination.isPagerDisabled(basic, 'Previous', true);
    });

    it('when user clicks on 3, then "Next" - disabled, "Previous" - enabled, 1st - inactive, 3rd - active', () => {
      pagination.clickOnPage(basic, '3');
      pagination.isPagerDisabled(basic, 'Next', true);
      pagination.isPagerDisabled(basic, 'Previous', false);
      pagination.isActivePositionEqual(basic, '3');
      pagination.isPageActive(basic, '1', false);
    });

    it('when user clicks on 2, previous and next buttons are enabled, 2d page is active, other - inactive', () => {
      pagination.clickOnPage(basic, '2');
      pagination.isPagerDisabled(basic, 'Next', false);
      pagination.isPagerDisabled(basic, 'Previous', false);
      pagination.isActivePositionEqual(basic, '2');
      pagination.isPageActive(basic, '1', false);
    });
  });
});
