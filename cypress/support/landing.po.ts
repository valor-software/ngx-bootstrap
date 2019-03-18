import { BaseComponent } from './base.component';

export class LandingPo extends BaseComponent {
  pageUrl = '/';
  documentationUrl = '/documentation';

  mainClass = '.main';
  logoAtHeader = '.logo';
  logoAtContent = '.content-logo';
  headerSelector = '.header';
  stackOverBtn = 'a[href*= "stackoverflow"]';
  gitHbBtn = '.header-list a[href*= "github"]';
  slackNgxBtn = '.header-list a[href*= "slack"]';
  infoButtons = '.header-list';
  sloganBs = '.slogan';
  descriptionBs = '.descr';
  versionBs = '.version';
  advantagesBs = '.advantages';
  navBtn = '.btn';
  mobileMenu = '.mobile-menu';
  mobileMenuBtn = '#mobile-main-menu';
  mobileMenuOpened = 'isOpenMenu';

  stackoverflowUrl = 'https://stackoverflow.com/questions/tagged/ngx-bootstrap';
  githubUrl = 'https://github.com/valor-software/ngx-bootstrap';
  slackUrl = 'https://join.slack.com/t/ngx-home/shared_invite/enQtNTExMTY5MzcwMTM0LWQ5M2Y4OWM0OGJjNmZiOGYyNjFlZTdlOGI1YjcxYWQ2ODhiOTY4NzhiODgwMTIzNDczODIyNWNmM2RlYWRhNTg';

  teamUrl = 'https://github.com/valor-software';
  contributorsUrl = 'https://github.com/valor-software/ngx-bootstrap/graphs/contributors';
  mitLicenseUrl = 'https://github.com/valor-software/ngx-bootstrap/blob/development/LICENSE';
  crCommonsUrl = 'https://creativecommons.org/licenses/by/3.0/';
  originalBsUrl = 'https://getbootstrap.com/';

  isNavigateBtnExist(btnName: string, elementIndex: number) {
    cy.get(this.navBtn).contains(btnName)
      .should('be.enabled');
  }

  clickOnMobileMenuBtn() {
    cy.get(this.mobileMenuBtn).click();
  }

  isSearchResultCorrect(searchResult: string) {
    cy.get('.sidebar-list').eq(1)
      .should('have.descendants', 'li').invoke('text')
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
