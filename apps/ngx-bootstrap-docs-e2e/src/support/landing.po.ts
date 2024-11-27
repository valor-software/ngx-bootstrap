import { BaseComponent } from './base.component';

export class LandingPo extends BaseComponent {
  pageUrl = '/ngx-bootstrap/';
  documentationUrl = '/ngx-bootstrap/documentation/';

  mainClass = '.main';
  logoAtHeader = '[data-cypress="logoAtHeader"]';
  headerSelector = '#header';
  stackOverBtn = 'a[href*= "stackoverflow"]';
  gitHbBtn = '[data-cypress="infoButtons"] a[href*= "github"]';
  slackNgxBtn = '[data-cypress="infoButtons"] a[href*= "slack"]';
  infoButtons = '[data-cypress="infoButtons"]';
  sloganBs = '[data-cypress="sloganBs"]';
  advantagesBs = '[data-cypress="advantagesBs"]';
  navBtn = '.btn';
  mobileMenu = '.mobile-menu';
  mobileMenuBtn = '#mobile-main-menu';
  mobileMenuOpened = 'isOpenMenu';

  stackoverflowUrl = 'https://stackoverflow.com/questions/tagged/ngx-bootstrap';
  githubUrl = 'https://github.com/valor-software/ngx-bootstrap';
  slackUrl = 'https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWVjZGU2MjI4MTVhMGVlMTc2OWRiMzA0NzBhNDU5YzQ0MDM3MWI5NzJjZTUzNzIxZmNjYmFlMjU2MzE0YmY0NWY';

  contributorsUrl = 'https://github.com/valor-software/ngx-bootstrap/graphs/contributors';
  mitLicenseUrl = 'https://github.com/valor-software/ngx-bootstrap/blob/development/LICENSE';
  crCommonsUrl = 'https://creativecommons.org/licenses/by/3.0/';
  originalBsUrl = 'https://getbootstrap.com/';

  isNavigateBtnExist(btnName: string) {
    cy.get(this.navBtn).contains(btnName)
      .should('exist');
  }

  clickOnMobileMenuBtn() {
    cy.get(this.mobileMenuBtn).click();
  }

  isSearchResultCorrect(searchResult: string) {
    cy.get('[data-cypress="search-result"]').eq(0)
      .should('have.descendants', 'li').find('a').invoke('text')
      .should('contain', searchResult);
  }

  isMobileMenuActive() {
    cy.get('body').should('have.class', this.mobileMenuOpened);
  }

  isMobileMenuHasDescendants(descen1Selector: string, descen2Selector: string) {
    cy.get(this.mobileMenu).should('be.visible')
      .and('have.descendants', descen1Selector)
      .and('have.descendants', descen2Selector);
  }

  visitNGXBootstrapWithBsVersion(bsVersion: number) {
    cy.visit(`${this.documentationUrl}?_bsVersion=bs${bsVersion}`);
  }

  isBootstrapVersion(version: number) {
    cy.get('.selected').invoke('text').should('contain', version);
  }
}
