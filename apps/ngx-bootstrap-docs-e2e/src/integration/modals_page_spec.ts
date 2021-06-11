import { ModalsPo } from '../support/modals.po';

describe('Modals demo page testing suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Template modal', () => {

    const templateDemo = modals.exampleDemosArr.serviceTemplate;
    const btnText = 'Create template modal';
    const btnX = '×';

    it('example contains the button "Create template modal"', () => {
      modals.scrollToMenu(' Template ');
      modals.isButtonExist(templateDemo, btnText);
    });

    it(`when user clicks on the button "Create modal with component" then modal is opened and
      backdrop is enabled`, () => {
      modals.clickByText(templateDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isBackdropExist(true);
    });

    xit('when user clicks on the cross button then the modal is closed', () => {
      modals.clickByText(templateDemo, btnText);
      modals.clickByText(modals.modalBtnX, btnX);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isModalEnabled(modals.modalContainer, false);
      modals.isBackdropExist(false);
    });

    it('when user clicks on backdrop then the modal is closed', () => {
      modals.clickByText(templateDemo, btnText);
      modals.clickOnBackdrop();
      modals.isModalVisible(modals.modalContainer, true);
      modals.isModalEnabled(modals.modalContainer, false);
    });

    xit('when user press on ESC btn then the modal is closed', () => {
      modals.clickByText(templateDemo, btnText);
      modals.pressEsc();
      modals.isModalEnabled(modals.modalContainer, false);
      modals.isBackdropExist(false);
    });

    it('when user starts to click on body then release click on backdrop then the modal is not closed', () => {
      modals.clickByText(templateDemo, btnText);
      modals.startClickOnModalReleaseOnBackdrop(modals.modalContainer);
      modals.isModalVisible(modals.modalContainerVisible, true);
    });
  });
});
