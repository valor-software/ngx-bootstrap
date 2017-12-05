import { $, ElementFinder } from 'protractor';

import { BasePo } from '../shared/pages/basePage.po';

export class DropdownsPo extends BasePo {
  templateUrl = 'dropdowns';
  contentTitle: ElementFinder = $('.content-header');
  pageContent: ElementFinder = $('.content-box');
}
