import { browser, element, by, $ } from 'protractor';

export class Ng2BootstrapPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return $('getting-started h1:nth-child(1)').getText();
  }
}
