import { ModalsPo } from '../support/modals.po';

describe('Modals demo page testing suite: Directive examples', () => {
  const modals = new ModalsPo();
  beforeEach(() => modals.navigateTo());

  describe('Static modal', () => {
    beforeEach(() => modals.scrollToMenu('Static modal'));

    const staticModalDemo = modals.exampleDemosArr.directiveStatic;
    const btnText = 'Static modal';
    const btnX = '×';

    it('example contains the button "Static modal"', () => {
      modals.isButtonExist(staticModalDemo, btnText);
    });

    it(`when user clicks on "Static modal" button then modal is opened. after click on backdrop the modal
       stays opened`, () => {
      modals.clickByText(staticModalDemo, btnText);
      modals.isModalVisible(modals.modalDialog, true);
      modals.clickOnBackdrop();
      modals.isModalVisible(modals.modalDialog, true);
    });

    it('when user clicks on the cross button then the modal is closed', () => {
      modals.clickByText(staticModalDemo, btnText);
      modals.isModalVisible(modals.modalDialog, true);
      modals.clickByText(modals.modalBtnX, btnX);
      modals.isModalEnabled(modals.modalDialog, false);
    });
  });

  describe('Optional sizes', () => {
    beforeEach(() => modals.scrollToMenu('Optional sizes'));

    const sizeDemo = modals.exampleDemosArr.directiveSizes;
    const btnLargeModal = 'Large modal';
    const btnSmallModal = 'Small modal';
    const width300px = '300px';
    const width800px = '800px';

    it('example contains the buttons "Large modal" and "Small modal"', () => {
      modals.isButtonExist(sizeDemo, btnLargeModal);
      modals.isButtonExist(sizeDemo, btnSmallModal, 2);
    });

    it('when user clicks on the "Large modal" button then large modal is opened', () => {
      modals.clickByText(sizeDemo, btnLargeModal);
      modals.isModalVisible(modals.modalDialog, true, 1);
      modals.isModalWindowWidthEqual(modals.modalDialog, width800px, 1);
    });

    it('when user clicks on the "Small modal" button then large modal is opened', () => {
      modals.clickOnBtn(sizeDemo, 2);
      modals.isModalVisible(modals.modalDialog, true, 2);
      modals.isModalWindowWidthEqual(modals.modalDialog, width300px, 2);
    });
  });

  describe('Child modal', () => {
    beforeEach(() => modals.scrollToMenu('Child modal'));

    const childModalDemo = modals.exampleDemosArr.directiveChild;
    const btnText = 'Open child modal';

    it('example contains the button "Open child modal"', () => {
      modals.isButtonExist(childModalDemo, btnText);
    });

    it('when user clicks on the "Open child modal" button then modal is opened from the parent component',
      () => {
        modals.clickByText(childModalDemo, btnText);
        modals.isModalVisible(modals.modalDialog, true, 3);
        modals.isChildElemExist(childModalDemo, modals.modalContent);
      });
  });

  describe('Nested modals', () => {
    beforeEach(() => modals.scrollToMenu('Nested modals'));

    const nestedModalsDemo = modals.exampleDemosArr.directiveNested;
    const btnText = 'Open parent modal';
    const btnOpen2nd = 'Open second modal';
    const btnOpen3rd = 'Open third modal';
    const firstModalTitle = 'First modal';
    const secondModalTitle = 'Second modal';
    const thirdModalTitle = 'Third modal';

    it('example contains the button "Open parent modal"', () => {
      modals.isButtonExist(nestedModalsDemo, btnText);
    });

    it(`when user clicks on "Open parent modal" button then modal is opened. it has title "First modal" and
    the button "Open second modal"`, () => {
      modals.clickByText(nestedModalsDemo, btnText);
      modals.isDirectModalVisible(nestedModalsDemo, true);
      modals.isItemTextContains(nestedModalsDemo, modals.modalTitle, firstModalTitle);
      modals.isButtonExist(modals.modalBody, btnOpen2nd);
    });

    it(`when user clicks on "Open second modal" button then the 2nd modal is opened. it has title "Second modal" and
    the button "Open third modal"`, () => {
      modals.clickByText(nestedModalsDemo, btnText);
      modals.clickByText(modals.modalBody, btnOpen2nd);
      modals.isItemTextContains(nestedModalsDemo, modals.modalTitle, secondModalTitle, 1);
      modals.isButtonExist(modals.modalBody, btnOpen3rd, 1);
    });

    it('when user clicks on "Open third modal" button then the 3rd modal is opened', () => {
      modals.clickByText(nestedModalsDemo, btnText);
      modals.clickByText(modals.modalBody, btnOpen2nd);
      modals.clickByText(modals.modalBody, btnOpen3rd);
      modals.isItemTextContains(nestedModalsDemo, modals.modalTitle, thirdModalTitle, 2);
    });

    it(`when user closes the third modal then the second is visible, and when user closes the second modal
      then the first is visible`, () => {
      modals.clickByText(nestedModalsDemo, btnText);
      modals.clickByText(modals.modalBtn, btnOpen2nd);
      modals.clickByText(modals.modalBody, btnOpen3rd);
      modals.checkElementsQuantity(modals.openedNestedModals, 3);
      modals.clickOnBtn(modals.modalDirectBtnX, 2);
      modals.checkElementsQuantity(modals.openedNestedModals, 2);
      modals.clickOnBtn(modals.modalDirectBtnX, 1);
      modals.checkElementsQuantity(modals.openedNestedModals, 1);
      modals.clickOnBtn(modals.modalDirectBtnX, 0);
      modals.checkElementsQuantity(modals.openedNestedModals, 0);
    });
  });

  describe('Modal events', () => {
    beforeEach(() => modals.scrollToMenu('Modal events'));

    const eventsModalsDemo = modals.exampleDemosArr.directiveEvents;
    const btnText = 'Open a modal';
    const btnX = '×';
    const eventOnShowFired = 'event onShow is fired';
    const eventOnShownFired = 'event onShown is fired';
    const eventOnHide = 'event onHide is fired';
    const eventOnHidden = 'event onHidden is fired';

    it('example contains the button "Open a modal"', () => {
      modals.isButtonExist(eventsModalsDemo, btnText);
    });

    it(`when user clicks on "Open a modal" button then modal is opened then should be two messages
      "event onShow is fired" and "event onShown is fired"`, () => {
      modals.clickByText(eventsModalsDemo, btnText);
      modals.isDirectModalVisible(eventsModalsDemo, true);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnShowFired);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnShownFired);
    });

    it(`when user closes modal by click on the cross then should be messages "event onHide is fired"
      and "event onHidden is fired"`, () => {
      modals.clickByText(eventsModalsDemo, btnText);
      modals.clickByText(modals.modalBtnX, btnX);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnHide);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnHidden);
    });

    it(`when user user closes modal by click outside the modal window then should be messages
      "event onHidden is fired" and "onHidden event has been fired"`, () => {
      modals.clickByText(eventsModalsDemo, btnText);
      modals.isModalVisible(eventsModalsDemo, true);
      modals.clickOnModal(eventsModalsDemo);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnHide);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnHidden);
    });

    it(`when user closes modal by pressing ESC button then modal is closed and should be messages
      "event onHide is fired, dismissed by esc" and "event onHidden is fired, dismissed by esc"`, () => {
      const modalText = 'Just another modal';
      modals.clickByText(eventsModalsDemo, btnText);
      modals.isDirectModalVisible(eventsModalsDemo, true);
      modals.isItemTextContains(eventsModalsDemo, modals.modalBody, modalText);
      modals.isBackdropExist(true);
      modals.pressEscOnModal(eventsModalsDemo);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnShowFired);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnHide);
      modals.isDemoContainsTxt(eventsModalsDemo, eventOnHidden);
    });
  });

  describe('Auto shown modal', () => {
    beforeEach(() => modals.scrollToMenu('Auto shown modal'));

    const autoDemo = modals.exampleDemosArr.directiveAutoShow;
    const btnText = 'Render auto-shown modal';
    const btnX = '×';

    it('example contains the button "Render auto-shown modal"', () => {
      modals.isButtonExist(autoDemo, btnText);
    });

    it(`when user clicks on the "Render auto-shown modal" button, then modal is opened, it appeared in the DOM`,
      () => {
        modals.clickByText(autoDemo, btnText);
        modals.isDirectModalVisible(autoDemo, true);
      });

    it(`when user closes the modal then modal is removed from the DOM`,
      () => {
        modals.clickByText(autoDemo, btnText);
        modals.clickByText(modals.modalBtnX, btnX);
        modals.isModalEnabled(autoDemo, false);
      });
  });
});
