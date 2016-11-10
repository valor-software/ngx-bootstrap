import { browser, $ } from 'protractor';
import Promise = webdriver.promise.Promise;

export class Ng2BootstrapPage {
  public navigateTo(): any {
    return browser.get('/');
  }

  public getParagraphText(): Promise<string> {
    return $('getting-started h1:nth-child(1)').getText();
  }
}
