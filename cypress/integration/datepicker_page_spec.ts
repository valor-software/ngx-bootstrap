import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();
  const datepickerDemos = datepicker.exampleDemosArr;
  const datepickerTitles = datepicker.exampleTitlesArr;

  beforeEach(() => datepicker.navigateTo());

  it('datepicker page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to datepicker component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', datepicker.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', datepicker.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', datepicker.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic date- and daterangepicker can be opened by click on toggler', () => {
    const buttonDatepicker = 'Date Picker';
    const buttonDateRangePicker = 'Date Range Picker';

    datepicker.clickByText(datepickerDemos[0], buttonDatepicker);
    cy.get('bs-datepicker-container')
      .should('to.be.visible');

    datepicker.clickByText(datepickerDemos[0], buttonDateRangePicker);
    cy.get('bs-daterangepicker-container')
      .should('to.be.visible');
  });

  it('datepicker with custom date format can be opened by click on output', () => {
    cy.get(datepickerDemos[1]).find('input').click();

    cy.get('bs-datepicker-container')
      .should('to.be.visible');
  });

  it('chosen date can be displayed in reactive form', () => {
    cy.get(datepickerDemos[7]).find('input[placeholder="Datepicker"]').click();
    cy.get('bs-datepicker-container').find('td[role="gridcell"]').as('datepickerDays');
    datepicker.clickByText('@datepickerDays', '15');

    cy.get(datepickerDemos[7]).find('.code-preview')
      .should('to.contain', '"date": "2018-02-15');
  });
});
