import { LandingPo } from '../support/landing.po';

describe('Landing Page test suite', () => {
  const landing = new LandingPo();

  beforeEach(() => landing.navigateTo());

  describe('Content', () => {

    it('header displays ngx-bootstrap logo and info buttons', () => {
      cy.get(landing.logoAtHeader)
        .should('be.visible');
      cy.get(landing.infoButtons)
        .should('be.visible');
    });

    it('main content displays ngx-bootstrap logo, slogan, description, version and advantages block', () => {
      cy.get(landing.logoAtContent)
        .should('be.visible');
      cy.get(landing.sloganBs)
        .should('be.visible');
      cy.get(landing.descriptionBs)
        .should('be.visible');
      cy.get(landing.versionBs)
        .should('be.visible');
      cy.get(landing.advantagesBs)
        .should('be.visible');
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
        cy.get(`footer [href="${ link }"]`).should('to.be.exist'));
    });
  });

  describe('Navigation buttons', () => {
    it('Get started button redirects to Getting Started page', () => {
      const buttonText = 'Get started';
      const searchedUrl = '/documentation';

      landing.clickByText(landing.navBtn, buttonText);

      cy.url()
        .should('include', searchedUrl);
    });

    it('Documentation button is enabled and contains link to documentation', () => {
      const buttonText = 'Documentation';
      const searchedUrl = '/documentation';

      cy.get(landing.navBtn).contains(buttonText)
        .should('be.enabled');

      landing.clickByText(landing.navBtn, buttonText);

      cy.url()
        .should('include', searchedUrl);
    });

    it('Info buttons in header are enabled and contains links to slack, github and stackoverflow', () => {
      const linksArr = [
        landing.stackoverflowUrl,
        landing.githubUrl,
        landing.slackUrl
      ];

      linksArr.forEach(link =>
        cy.get(`${ landing.infoButtons } [href="${ link }"]`)
          .should('be.enabled'));
    });
  });
});
