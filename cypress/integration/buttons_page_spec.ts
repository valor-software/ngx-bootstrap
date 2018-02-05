import { ButtonsPo } from '../support/buttons.po';

// need to refactor tests for making them faster
describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();
  const buttonTitles = buttons.exampleTitlesArr;
  const buttonDemos = buttons.exampleDemosArr;

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

  it('single button example contains header, that can be changed by click on button', () => {
    const defaultVal = '1';
    const afterClickVal = '0';

    cy.get(buttonDemos[0]).as('singleButton').children('.card-header').as('header')
      .should('to.contain', defaultVal);

    cy.get('@singleButton').children('button').click();
    cy.get('@header')
      .should('to.contain', afterClickVal);
  });


  it('checkbox example contains checkboxes, that can be checked or unchecked', () => {
    // let btnTextTempl: string;
    // setting all checkboxes to unchecked
    // cy.get(buttonDemos[1]).as('checkboxes').find('.btn').as('btnBlock').eq(1).click();

    buttons.clickByText(buttonDemos[1], 'Middle');
    cy.get(buttonDemos[1]).children('.card-header').should('to.contain', `"middle": false`);

    // cy.get(buttonDemos[1]).find('.btn').as('checkbox').each(($btn, i) => {
    //   cy.get('@checkbox').eq(i).invoke('text').then(btnText => {
    //     btnTextTempl = btnText.toString().toLowerCase();
    //
    //     cy.get('@checkbox').eq(i).click();
    //     cy.get('@checkboxes').children('.card-header')
    //       .should('to.contain', `"${ btnTextTempl }": true`);
    //
    //     cy.get('@checkbox').eq(i).click();
    //     cy.get('@checkboxes').children('.card-header')
    //       .should('to.contain', `"${ btnTextTempl }": false`);
    //   });
    // });
  });

  it('checkbox example contains checkboxes, that can be checked or unchecked and reactive form', () => {
    let btnTextTempl: string;
    // setting all checkboxes to unchecked
    cy.get(buttonDemos[2]).as('checkboxesForm').find('.btn').eq(1).click();

    cy.get(buttonDemos[2]).find('.btn').as('checkbox').each(($btn, i) => {
      cy.get('@checkbox').eq(i).invoke('text').then(btnText => {
        btnTextTempl = btnText.toString().toLowerCase();

        cy.get('@checkbox').eq(i).click();
        cy.get('@checkboxesForm').children('.card-header')
          .should('to.contain', `"${ btnTextTempl }": true`);

        cy.get('@checkbox').eq(i).click();
        cy.get('@checkboxesForm').children('.card-header')
          .should('to.contain', `"${ btnTextTempl }": false`);
      });
    });
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

  it('each demo examples are not mixed up with each other and contains code examples', () => {
    cy.get('examples').find('h3').as('exampleTitles').each(($title, i) => {
      expect($title).to.contain(buttonTitles[i]);

      cy.get('@exampleTitles').contains(buttonTitles[i]).parent().as('currentBlock');

      cy.get('@currentBlock').find(buttonDemos[i])
        .should('to.exist');
      cy.get('@currentBlock').find('.section').eq(1)
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });
});
