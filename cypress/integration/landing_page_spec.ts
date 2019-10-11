import { LandingPo } from '../support/landing.po';

describe('Landing Page test suite', () => {
  const landing = new LandingPo();

  beforeEach(() => landing.navigateTo());

  describe('Content', () => {

    it(`content displays: ngx-bootstrap logo and info buttons to the: stackoverflow, gitHub and slack, slogan,
     description, version and advantages block`, () => {
      landing.isElementVisible(landing.headerSelector, landing.logoAtHeader);
      landing.isElementVisible(landing.headerSelector, landing.infoButtons);
      landing.isElementVisible(landing.headerSelector, landing.stackOverBtn);
      landing.isElementVisible(landing.headerSelector, landing.gitHbBtn);
      landing.isElementVisible(landing.headerSelector, landing.slackNgxBtn);
      landing.isElementVisible(landing.mainClass, landing.logoAtContent);
      landing.isElementVisible(landing.mainClass, landing.sloganBs);
      landing.isElementVisible(landing.mainClass, landing.descriptionBs);
      landing.isElementVisible(landing.mainClass, landing.versionBs);
      landing.isElementVisible(landing.mainClass, landing.advantagesBs);
    });

    it('footer contains links to ng-team, contributors, MIT license, Creative Commons, original Bootstrap', () => {
      const footerLinks = [
        landing.teamUrl,
        landing.contributorsUrl,
        landing.mitLicenseUrl,
        landing.crCommonsUrl,
        landing.originalBsUrl
      ];

      footerLinks.forEach(link =>
        landing.isElemHasCorrectUrl('footer', link));
    });
  });

  describe('Navigation buttons', () => {
    it('Get started button redirects to Getting Started page', () => {
      const buttonText = 'Get started';
      const searchedUrl = '/documentation';

      landing.clickByText(landing.navBtn, buttonText);
      landing.isUrlExist(searchedUrl);
    });

    it('Documentation button is enabled and contains link to documentation', () => {
      const buttonText = 'Documentation';
      const searchedUrl = '/documentation';

      landing.isNavigateBtnExist(buttonText, 1);
      landing.clickByText(landing.navBtn, buttonText);
      landing.isUrlExist(searchedUrl);
    });

    it('Info buttons in header are enabled and contains links to slack, github and stackoverflow', () => {
      const linksArr = [
        landing.stackoverflowUrl,
        landing.githubUrl,
        landing.slackUrl
      ];

      linksArr.forEach(link =>
        landing.isElemHasCorrectUrl(landing.infoButtons, link)
      );
    });
  });

  describe('Documentation page', () => {
    beforeEach(() => cy.visit(landing.documentationUrl));

    const textToSend = 'drop';
    const searchResult = 'Dropdowns';
    const bootstrapVer = '.bootstrap-version';
    const demosList = '.sidebar-content';

    it('Search on the Documentation page works correctly', () => {
      landing.clearInputAndSendKeys('.sidebar-search', textToSend);
      landing.isSearchResultCorrect(searchResult);
    });

    it('Main-menu in mobile view', () => {
      cy.viewport(375, 667);
      landing.clickOnMobileMenuBtn();
      landing.isMobileMenuActive();
      landing.isMobileMenuHasDescendants(bootstrapVer, demosList);
    });
  });

  describe('Load Bootstrap version', () => {
    it('the 3rd version is ', () => {
      const bsVersion = 3;
      landing.visitNGXBootstrapWithBsVersion(bsVersion);
      landing.isBootstrapVersion(bsVersion);
    });

    it('the 4th version is ', () => {
      const bsVersion = 4;
      landing.visitNGXBootstrapWithBsVersion(bsVersion);
      landing.isBootstrapVersion(bsVersion);
    });
  });
});

