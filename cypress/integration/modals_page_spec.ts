import { ModalsPo } from '../support/modals.po';

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Template modal', () => {
      const templateModal = modals.exampleDemosArr.serviceTemplate;
      const buttonText = 'Create template modal';

      it('template service modal can be opened by click on button and closed by backdrop-click', () => {
        modals.clickByText(templateModal, buttonText);
        cy.get(modals.modalContent).last()
          .should('to.be.visible');

        cy.get(modals.backServiceMod).as('modalAndBackdrop').click();
        cy.get('@modalAndBackdrop')
          .should('not.to.be.visible');
      });
    });

    describe('Component modal', () => {
      const componentModal = modals.exampleDemosArr.serviceComponent;
      const buttonText = 'Create modal with component';
      const modalCloseBtn = 'Close';

      it('component service modal can be opened by click on button and closed by clicking Close button', () => {
        modals.clickByText(componentModal, buttonText);
        cy.get(modals.modalContent)
          .should('to.be.visible');

        modals.clickByText(modals.modalContent, modalCloseBtn);
        cy.get(modals.backServiceMod)
          .should('not.to.be.visible');
      });
    });
  });

  describe('Directive examples', () => {
    describe('Static modal', () => {
      const staticModal = modals.exampleDemosArr.directiveStatic;
      const buttonText = 'Static modal';

      it('directive static modal can be closed by clicking Close button', () => {
        modals.clickByText(staticModal, buttonText);
        cy.get(`${ staticModal } ${ modals.modalContent }`).as('staticMod')
          .should('to.be.visible');

        cy.get(`${ staticModal } ${ modals.modalHeader } ${ modals.btnCloseInHeader }`).click();
        cy.get(`${ staticModal } ${ modals.backDirectiveMod }`)
          .should('not.to.be.visible');
      });
    });

    describe('Child modal', () => {
      const childModals = modals.exampleDemosArr.directiveChild;
      const buttonText = 'Open child modal';

      it('directive child modal can be closed by backdrop click', () => {
        modals.clickByText(childModals, buttonText);
        cy.get(`${ childModals } ${ modals.modalContent }`)
          .should('to.be.visible');

        cy.get(`${ childModals } ${ modals.backDirectiveMod }`).as('childModBack').click();
        cy.get('@childModBack')
          .should('not.to.be.visible');
      });
    });
  });
});
