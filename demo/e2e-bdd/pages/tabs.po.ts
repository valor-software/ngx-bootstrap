import { $, ElementFinder } from 'protractor';

import { BasePo } from '../shared/pages/basePage.po';

export class TabsPo extends BasePo {
  templateUrl = 'tabs';
  contentTitle: ElementFinder = $('.content-header');
  pageContent: ElementFinder = $('.content-box');
}
