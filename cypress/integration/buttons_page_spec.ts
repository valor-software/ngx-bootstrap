import { ButtonsPo } from '../support/buttons.po';

describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();
  const buttonDemos = buttons.exampleDemosArr;

  const buttonNames = ['Left', 'Middle', 'Right'];
  const buttonOutput = ['left', 'middle', 'right'];

  beforeEach(() => buttons.navigateTo());

  it('buttons page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to button component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', buttons.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', buttons.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', buttons.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic button example contains  only enabled single button', () => {
    cy.get(buttonDemos[0]).children('button')
      .should('to.be.enabled');
  });


  it('checkbox example contains checkboxes, that can be checked or unchecked', () => {
    buttons.clickByText(buttonDemos[1], buttonNames[0]);
    buttons.clickByText(buttonDemos[1], buttonNames[1]);

    cy.get(buttonDemos[1]).children('.card-header').as('output')
      .should('to.contain', `"${buttonOutput[0]}": true`);
    cy.get('@output')
      .should('to.contain', `"${buttonOutput[1]}": false`);
  });

  it('custom checkbox value can be displayed in output', () => {
    const defaultVal = '1';
    const afterClickVal = '0';

    cy.get(buttonDemos[6]).as('customCheckbox').children('.card-header').as('header')
      .should('to.contain', defaultVal);

    cy.get('@customCheckbox').children('button').click();
    cy.get('@header')
      .should('to.contain', afterClickVal);
  });

  it('checkbox example contains checkboxes, that can be checked or unchecked', () => {
    buttons.clickByText(buttonDemos[1], buttonNames[0]);
    buttons.clickByText(buttonDemos[1], buttonNames[1]);

    cy.get(buttonDemos[1]).children('.card-header').as('output')
      .should('to.contain', `"${buttonOutput[0]}": true`);
    cy.get('@output')
      .should('to.contain', `"${buttonOutput[1]}": false`);
  });

  it('checkbox example contains checkboxes, that can be checked or unchecked and reactive form', () => {
    buttons.clickByText(buttonDemos[2], buttonNames[1]);
    buttons.clickByText(buttonDemos[2], buttonNames[2]);

    cy.get(buttonDemos[2]).children('.card-header').as('output')
      .should('to.contain', `"${buttonOutput[1]}": false`);
    cy.get('@output')
      .should('to.contain', `"${buttonOutput[2]}": true`);

    buttons.clickByText(buttonDemos[2], buttonNames[1]);
    cy.get('@output')
      .should('to.contain', `"${buttonOutput[1]}": true`);
  });

  it('Radio and Uncheckable Radio example contains checkboxes and radioButtons', () => {
    cy.get(buttonDemos[3]).as('radioUncheckRadio').find('.btn-group').as('allRadios').eq(0).as('radioBtnNgModel');
    cy.get('@allRadios').eq(1).as('radioBtn');
    cy.get('@allRadios').eq(2).as('uncheckableRadio');

    cy.get('@radioBtnNgModel').find('.btn').eq(0).click();
    cy.get('@radioUncheckRadio').children('.card-header').as('formOutput').should('to.contain', 'Left');

    cy.get('@radioBtn').find('.btn').eq(1).click();
    cy.get('@formOutput').should('to.contain', 'Middle');

    cy.get('@uncheckableRadio').find('.btn').eq(2).click();
    cy.get('@formOutput').should('to.contain', 'Right');

    cy.get('@uncheckableRadio').find('.btn').eq(2).click();
    cy.get('@formOutput').should('to.contain', 'null');
  });

  it('radio example should dynamicly update reactive form', () => {
    const val = ['A', 'B', 'C'];

    cy.get(buttonDemos[4]).as('radioReactiveForms').find('label').as('radioBtn').each(($radioBtn, i) => {
      cy.get('@radioBtn').eq(i).click();

      cy.get('@radioReactiveForms').children('.card-header')
        .should('to.contain', `"radio": "${val[i]}"`);
    });
  });

  it('disabled buttons examples contains button, that can be disabled', () => {
    cy.get(buttonDemos[5]).as('disabledButton')
      .should('to.have.descendants', '.btn-primary')
      .and('to.have.descendants', '.btn-warning');

    buttons.clickByText(buttonDemos[5], 'Enable/Disable');

    cy.get('@disabledButton').contains('Button')
      .should('not.to.be.enabled');
  });
});
