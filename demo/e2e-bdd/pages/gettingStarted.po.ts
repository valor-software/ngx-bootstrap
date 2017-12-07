import { $, ElementFinder } from 'protractor';

import { BasePo } from '../shared/pages/basePage.po';

export class GettingStartedPo extends BasePo {
  templateUrl = 'getting-started';
  angularLogo: ElementFinder = $('[alt*="angular logo"]');
  contentTitle: ElementFinder = $('.content h1');
}
