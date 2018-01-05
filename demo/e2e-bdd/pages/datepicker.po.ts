import { $, ElementFinder } from 'protractor';

import { BasePo } from '../shared/pages/basePage.po';

export class DatepickerPo extends BasePo {
  templateUrl = 'datepicker';
  contentTitle: ElementFinder = $('.content-header');
  pageContent: ElementFinder = $('.content-box');
}
