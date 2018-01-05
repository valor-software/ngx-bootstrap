import { $, ElementFinder } from 'protractor';

import { BasePo } from '../shared/pages/basePage.po';

export class CarouselPo extends BasePo {
  templateUrl = 'carousel';
  contentTitle: ElementFinder = $('.content-header');
  pageContent: ElementFinder = $('.content-box');
}
