import { test as base } from '@playwright/test';
import { DatepickerPwPo } from '../support/datepicker.pw.po';

const test = base.extend<{ datepickerPo: DatepickerPwPo }>({
  datepickerPo: async ({ page }, use) => {
    const datepickerPo = new DatepickerPwPo(page);
    await use(datepickerPo);
  },
});
test.describe('Datepicker page testing suite', () => {
  let tabSelector: string;

  test.beforeEach(async ({ datepickerPo }) => {
    tabSelector = datepickerPo.getTabSelector('Overview');
    await datepickerPo.navigateTo();
  });

  test.describe('Unlinked calendar', () => {
    let unlinkedCalendars: string;

    test.beforeEach(async ({ datepickerPo }) => {
      unlinkedCalendars = tabSelector + datepickerPo.exampleDemosArr.unlinkedCalendars;
      await datepickerPo.scrollToMenu('Unlinked calendars');
    });

    test('click should open two calendars', async ({ datepickerPo }) => {
      await datepickerPo.clickOnDaterangepickerInput(unlinkedCalendars, 0);
      await datepickerPo.waitForElementToBeVisible('bs-daterangepicker-container');
      await datepickerPo.expectItemVisible('.bs-datepicker-body', 0);
      await datepickerPo.expectItemVisible('.bs-datepicker-body', 1);
    });

    test('when user goes to previous in the left calendar, right one stays the same', async ({ datepickerPo }) => {
      await datepickerPo.clickOnDaterangepickerInput(unlinkedCalendars, 0);
      await datepickerPo.waitForElementToBeVisible('bs-daterangepicker-container');
      await datepickerPo.expectTextInViewInTheHeader(0, 0, 'October');
      await datepickerPo.expectTextInViewInTheHeader(0, 1, '1979');
      await datepickerPo.expectTextInViewInTheHeader(1, 0, 'April');
      await datepickerPo.expectTextInViewInTheHeader(1, 1, '1985');
      await datepickerPo.clickOnNavigation(0, '<');
      await datepickerPo.expectTextInViewInTheHeader(0, 0, 'September');
      await datepickerPo.expectTextInViewInTheHeader(0, 1, '1979');
      await datepickerPo.expectTextInViewInTheHeader(1, 0, 'April');
      await datepickerPo.expectTextInViewInTheHeader(1, 1, '1985');
    });

    test('when user changes mode to month on the calendar, right one stays the same', async ({ datepickerPo }) => {
      await datepickerPo.clickOnDaterangepickerInput(unlinkedCalendars, 0);
      await datepickerPo.waitForElementToBeVisible('bs-daterangepicker-container');
      await datepickerPo.expectTextInViewInTheHeader(0, 0, 'October');
      await datepickerPo.expectTextInViewInTheHeader(0, 1, '1979');
      await datepickerPo.expectTextInViewInTheHeader(1, 0, 'April');
      await datepickerPo.expectTextInViewInTheHeader(1, 1, '1985');
      await datepickerPo.clickOnNavigation(0, 'month');
      await datepickerPo.expectTextInViewInTheHeader(0, 0, '1979');
      await datepickerPo.expectTextInViewInTheBody(0, 'October', true);
      await datepickerPo.expectTextInViewInTheBody(0, 'September', true);
      await datepickerPo.expectTextInViewInTheHeader(1, 0, 'April');
      await datepickerPo.expectTextInViewInTheHeader(1, 1, '1985');
      await datepickerPo.expectTextInViewInTheBody(1, 'October', false);
      await datepickerPo.expectTextInViewInTheBody(1, 'September', false);
    });
  });

});
