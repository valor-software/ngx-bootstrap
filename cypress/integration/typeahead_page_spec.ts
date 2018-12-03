import { TypeaheadPo } from '../support/typeahead.po';

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Reactive forms', () => {
    const reactiveForm = typeahead.exampleDemosArr.reactiveForms;

    it('reactive forms typeahead appears after focus at input', () => {
      cy.get(reactiveForm).as('reactiveForm').find(typeahead.tagInput).focus();
      cy.get('@reactiveForm')
        .should('to.have.descendants', typeahead.containerTypeahead);
    });
  });
});
