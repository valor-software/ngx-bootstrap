// Todo: remove eslint-disable
/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-explicit-any */
import { BasePo } from './base.po';
import { expect } from '@playwright/test';

export class DatepickerPwPo extends BasePo {
  override pageUrl = '/ngx-bootstrap/components/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  daterangepickerInput = 'input[bsdaterangepicker]';
  datepickerNavView = 'bs-datepicker-navigation-view';
  datepickerContainer = 'bs-datepicker-container';
  datepickerInlineContainer = 'bs-datepicker-inline-container';
  daterangepickerContainer = 'bs-daterangepicker-container';
  datepickerBodyDaysView = 'bs-days-calendar-view';
  datepickerBodyMonthView = 'bs-month-calendar-view';
  datepickerBodyYearsView = 'bs-years-calendar-view';
  daterangepickerQuickSelectContainer = 'bs-custom-date-view';
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January'
  ];
  locales = [];

  exampleDemosArr = {
    unlinkedCalendars: ' datepicker-unlinked-calendar-views'
  };

  async clickOnDatepickerInput(baseSelector: string, datepickerIndex = 0) {
    const datepicker = this.page.locator(`${baseSelector} ${this.datepickerInput}`).nth(datepickerIndex);
    await datepicker.waitFor({state: 'visible',  timeout: 10000});
    await datepicker.click();
  }

  async clickOnDaterangepickerInput(baseSelector: string, dateRangeIndex = 0) {
    const datepicker = this.page.locator(`${baseSelector} ${this.daterangepickerInput}`).nth(dateRangeIndex);
    await datepicker.waitFor({state: 'visible',  timeout: 10000});
    await datepicker.click();
  }
  async waitForElementToBeVisible(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  }
  async expectItemVisible(selector: string, index: number) {
    await expect(await this.page.locator(selector).nth(index)).toBeVisible({visible: true, timeout: 10000});
  }

  async expectTextInViewInTheHeader(calendarIndex: number, currentIndex: number, text: string) {
    // this is needed so it won't return up with the inline range pickers that are also on the page
    const mainPopup = await this.page.locator('bs-daterangepicker-container');
    const header = await mainPopup.locator('.bs-datepicker-head').nth(calendarIndex);
    await expect(header).toBeVisible({visible: true, timeout: 10000});
    const current = await header.locator('.current').nth(currentIndex);
    await expect(current).toBeVisible({visible: true, timeout: 10000});
    const button = await current.locator('span');
    await expect(button).toBeVisible({visible: true, timeout: 10000});
    await expect(button).toHaveText(text);
  }

  async clickOnNavigation(dateRangeIndex = 0, navigationItem: '<' | '>' | 'month' | 'year' ) {
    const mainPopup = await this.page.locator('bs-daterangepicker-container');
    const datepicker = await mainPopup.locator(`.bs-datepicker-head`).nth(dateRangeIndex);
    switch (navigationItem) {
      case '<':
        await datepicker.locator('.previous').click();
        break;

      case '>':
        await datepicker.locator('.next').click();
        break;

      case 'month':
        await datepicker.locator('.current').nth(0).click();
        break;

      case 'year':
        await datepicker.locator('.current').nth(1).click();
        break;

      default:
        throw new Error('Unknown navigation item, correct: <, >, month, year');
    }
    await this.page.waitForTimeout(200); // waiting for the navigation to happen
  }
  async expectTextInViewInTheBody(calendarIndex: number, text: string, visible: boolean) {
    // this is needed so it won't return up with the inline range pickers that are also on the page
    const mainPopup = await this.page.locator('bs-daterangepicker-container');
    const body = await mainPopup.locator('.bs-datepicker-body').nth(calendarIndex);
    if (visible) {
      await expect(body.getByText(text).first()).toBeVisible();
    } else {
      await expect(body.getByText(text)).toHaveCount(0);
    }
  }

}
