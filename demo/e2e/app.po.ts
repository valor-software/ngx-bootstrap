import { browser, $ } from 'protractor';
import Promise = webdriver.promise.Promise;
import * as webdriver from "selenium-webdriver";

export class Ng2BootstrapPage {
  public navigateTo(): any {
    return browser.get('/');
  }

  public getParagraphText(): Promise<string> {
    return $('.content-header>h1').getText();
  }
}
