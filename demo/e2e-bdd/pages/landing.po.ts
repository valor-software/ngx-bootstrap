import { $, ElementFinder } from 'protractor';

import { BasePo } from '../shared/pages/basePage.po';

export class LandingPo extends BasePo {
  templateUrl = '';
  githubRepoUrl = 'https://github.com/valor-software/ngx-bootstrap';
  getStartedBtn: ElementFinder = $('.btn-primary');
  githubBtn: ElementFinder = $('.btn-outline-secondary');
}
