import { ModalsPo } from '../support/modals.po';
import { TooltipPo } from '../support/tooltip.po';

describe('Modals demo page test suite: Service examples', () => {
  const modals = new ModalsPo();
  beforeEach(() => modals.navigateTo());

  describe('Component modals', () => {
    beforeEach(() => modals.scrollToMenu('Component'));

    const componentDemo = modals.exampleDemosArr.serviceComponent;
    const btnText = 'Create modal with component';
    const modalBtnClose = 'Close';

    it('example contains the button "Create modalComponent with component"', () => {
      modals.isButtonExist(componentDemo, btnText);
    });

    it(`when user clicks on the button "Create template modalComponent" then modal is opened
      "Close" button is present`, () => {
      modals.clickByText(componentDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isButtonExist(modals.modalFooter, modalBtnClose);
    });

    it('when user closes modal by clicking on "Close" button', () => {
      modals.clickByText(componentDemo, btnText);
      modals.clickByText(modals.modalFooter, modalBtnClose);
      modals.isModalEnabled(modals.modalContainer, false);
    });
  });

  describe('Nested modals', () => {
    beforeEach(() => modals.scrollToMenu('Nested modals'));

    const nestedDemo = modals.exampleDemosArr.serviceNested;
    const btnText = 'Open first modal';
    const open2ndModal = 'Open second modal';
    const close1stModal = 'Close self';
    const firstModalTitle = 'First modal';
    const secondModalTitle = 'Second modal';

    it('example contains the button "Create modalComponent with component"', () => {
      modals.isButtonExist(nestedDemo, btnText);
    });

    it(`when user clicks on the button "Open parent modal" button then modal with title "First modal"
      is opened, button "Open second modal" button is present`, () => {
      modals.clickByText(nestedDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isModalTitleIs(firstModalTitle);
      modals.isButtonExist(modals.modalBody, open2ndModal);
    });

    it(`when user clicks on the button "Open second modal" then the second modal with title "Second modal" is opened,
        "Close self" is present`, () => {
      modals.clickByText(nestedDemo, btnText);
      modals.clickByText(modals.modalBtn, open2ndModal);
      modals.isModalTitleIs(secondModalTitle);
      modals.isButtonExist(modals.modalBody, close1stModal, 3);
      modals.checkElementsQuantity(modals.modalContainer, 2);
    });

    it('when user clicks on the button "Close self" then the first modal is closed', () => {
      modals.clickByText(nestedDemo, btnText);
      modals.clickByText(modals.modalBtn, open2ndModal);
      modals.clickByText(modals.modalRedBtn, close1stModal);
      modals.checkElementsQuantity(modals.modalContainer, 1);
    });
  });

  describe('Scrolling long content', () => {
    beforeEach(() => modals.scrollToMenu('Scrolling long content'));

    const scrollDemo = modals.exampleDemosArr.serviceScroll;
    const btnText = 'Open modal';

    it('example contains the button "Create modalComponent with component"', () => {
      modals.isButtonExist(scrollDemo, btnText);
    });

    it(`when user clicks on the button "Open modal" button then modal is opened and it has a text
      with 15 paragraphs`, () => {
      modals.clickByText(scrollDemo, btnText);
      modals.checkElementsQuantity(modals.modalParagraph, 15);
    });

    it('when user scroll content by mousewheel, content is scrolled successfully', () => {
      modals.clickByText(scrollDemo, btnText);
      cy.get(modals.modalParagraph).last().scrollIntoView();
      modals.isElementVisible('body', modals.modalParagraph, 14);
    });
  });

  describe('Events', () => {
    beforeEach(() => modals.scrollToMenu('Events'));

    const eventsDemo = modals.exampleDemosArr.serviceEvents;
    const btnText = 'Open modal';
    const btnX = '×';
    const demoOnShowFired = 'onShow event has been fired';
    const demoOnShownFired = 'onShown event has been fired';
    const demoOnHideFired = 'onHide event has been fired';
    const demoOnHiddenFired = 'onHidden event has been fired';
    const demoHideDismissed = 'onHide event has been fired, dismissed by backdrop-click';
    const demoHiddenDismissed = 'onHidden event has been fired, dismissed by backdrop-click';
    const demoOnEscDHide = 'onHide event has been fired, dismissed by esc';
    const demoOnEscHidden = 'onHidden event has been fired, dismissed by esc';

    it('example contains the button "Open modal"', () => {
      modals.isButtonExist(eventsDemo, btnText);
    });

    it(`when user clicks on "Open modal" button then modal is opened then should be two messages
      "onShow event has been fired" and "onShown event has been fired"`, () => {
      modals.clickByText(eventsDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isDemoContainsTxt(eventsDemo, demoOnShowFired);
      modals.isDemoContainsTxt(eventsDemo, demoOnShownFired);
    });

    it(`when user closes modal by click on the cross then should be messages "onHide event has been fired"
      and "onHidden event has been fired"`, () => {
      modals.clickByText(eventsDemo, btnText);
      modals.clickByText(modals.modalBtnX, btnX);
      modals.isModalEnabled(modals.modalContainer, false);
      modals.isDemoContainsTxt(eventsDemo, demoOnHideFired);
      modals.isDemoContainsTxt(eventsDemo, demoOnHideFired);
      modals.isDemoContainsTxt(eventsDemo, demoOnHiddenFired);
    });

    it(`when user closes modal by click outside the modal window then should be messages
    "onHide event has been fired" and "onHidden event has been fired"`, () => {
        modals.clickByText(eventsDemo, btnText);
        modals.isModalVisible(modals.modalContainer, true);
        modals.clickOnModalCorner('topLeft');
        modals.clickOutside(modals.modalContainer);
        modals.isDemoContainsTxt(eventsDemo, demoOnHideFired);
        modals.isDemoContainsTxt(eventsDemo, demoHideDismissed);
        modals.isDemoContainsTxt(eventsDemo, demoHiddenDismissed);
    });

    it(`when user closes modal by pressing ESC button then modal is closed and should be messages
    "onHide event has been fired" and "onHidden event has been fired"`, () => {
      modals.clickByText(eventsDemo, btnText);
      modals.pressEsc();
      modals.isModalEnabled(modals.modalContainer, false);
      modals.isBackdropExist(false);
      modals.isDemoContainsTxt(eventsDemo, demoOnEscDHide);
      modals.isDemoContainsTxt(eventsDemo, demoOnEscDHide);
      modals.isDemoContainsTxt(eventsDemo, demoOnEscHidden);
    });
  });

  describe('Confirm Window', () => {
    beforeEach(() => modals.scrollToMenu('Confirm Window'));

    const confirmDemo = modals.exampleDemosArr.serviceConfirm;
    const btnText = 'Open modal';
    const btnYes = 'Yes';
    const btnNo = 'No';
    const demoTextConfirmed = 'Confirmed!';
    const demoTextDeclined = 'Declined!';
    const emptyPreview = '';

    it('example contains the button "Open modal" and an empty demo', () => {
      modals.isButtonExist(confirmDemo, btnText);
      modals.isPreviewExist(confirmDemo, emptyPreview);
    });

    it('when user clicks on "Open modal" button then modal is opened, it contains two buttons: "Yes" and "No"',
      () => {
        modals.clickByText(confirmDemo, btnText);
        modals.isModalVisible(modals.modalContainer, true);
        modals.isButtonExist(modals.modalBody, btnYes, 2);
        modals.isButtonExist(modals.modalBody, btnNo, 3);
      });

    it('when user clicks on "Yes" button then modal is closed, message "Confirmed!" is displayed', () => {
      modals.clickByText(confirmDemo, btnText);
      modals.clickByText(modals.modalBody, btnYes);
      modals.isModalEnabled(modals.modalContainer, false);
      modals.isPreviewExist(confirmDemo, demoTextConfirmed);
    });

    it('when user clicks on "No" button then modal is closed, message "Declined!" is displayed', () => {
      modals.clickByText(confirmDemo, btnText);
      modals.clickByText(modals.modalBody, btnNo);
      modals.isModalEnabled(modals.modalContainer, false);
      modals.isPreviewExist(confirmDemo, demoTextDeclined);
    });

    it('when user clicks outside the modal then modal is closed, no message is displayed', () => {
      modals.clickByText(confirmDemo, btnText);
      modals.clickOutside(modals.modalContainer);
      modals.isPreviewExist(confirmDemo, emptyPreview);
    });
  });

  describe('Custom css class', () => {
    beforeEach(() => modals.scrollToMenu('Сustom css class'));

    const customCSSDemo = modals.exampleDemosArr.serviceCustomCSS;
    const btnText = 'Open modal with custom css class';
    const btnX = '×';

    it('example contains the button "Open modal with custom css class"', () => {
      modals.isButtonExist(customCSSDemo, btnText);
    });

    it('when user clicks on "Open modal with custom css class" button then modal is opened', () => {
      modals.clickByText(customCSSDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
    });

    it('when user clicks on the cross button then the modal is closed', () => {
      modals.clickByText(customCSSDemo, btnText);
      modals.clickByText(modals.modalBtnX, btnX);
      modals.isModalEnabled(modals.modalContainer, false);
    });
  });

  describe('Animation option', () => {
    beforeEach(() => modals.scrollToMenu('Animation option'));

    const animationDemo = modals.exampleDemosArr.serviceAnimation;
    const btnText = 'Open modal';
    const btnDisable = 'Disable animation';
    const btnEnable = 'Enable animation';
    const btnX = '×';

    it('example contains the buttons "Open modal" and "Disable animation"', () => {
      modals.isButtonExist(animationDemo, btnText);
      modals.isButtonExist(animationDemo, btnDisable, 1);
    });

    it('when user clicks on "Open modal" button then modal is opened. it appears with animations effects', () => {
      modals.clickByText(animationDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
    });

    it('when user clicks on "Disable animation" button then title of the button is changed to "Enable animation"',
      () => {
        modals.clickByText(animationDemo, btnDisable);
        modals.isButtonExist(animationDemo, btnEnable, 1);
      });

    it('after that click on "Open modal" button, modal is opened without animations effects', () => {
      modals.clickByText(animationDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
    });

    it('when user clicks on the cross button then the modal is closed', () => {
      modals.clickByText(animationDemo, btnText);
      modals.clickByText(modals.modalBtnX, btnX);
      modals.isModalEnabled(modals.modalContainer, false);
    });
  });

  describe('Esc closing option', () => {
    beforeEach(() => modals.scrollToMenu('Esc closing option'));

    const escapeDemo = modals.exampleDemosArr.serviceESC;
    const btnText = 'Open modal';
    const btnDisable = 'Disable Esc';
    const btnEnable = 'Enable Esc';

    it('example contains the buttons "Open modal" and "Disable Esc"', () => {
      modals.isButtonExist(escapeDemo, btnText);
      modals.isButtonExist(escapeDemo, btnDisable, 1);
    });

    it(`when user clicks on "Open modal" button then modal is opened. when user closes modal by click
      ESC button then modal stays opened`, () => {
      modals.clickByText(escapeDemo, btnText);
      modals.pressEsc();
      modals.isModalVisible(modals.modalContainer, true);
    });

    it(`when user clicks on "Disable Esc" button then title of the button is changed to "Enable animation"`,
      () => {
        modals.clickByText(escapeDemo, btnDisable);
        modals.isButtonExist(escapeDemo, btnEnable, 1);
      });

    it(`after that click on "Open modal" button, modal popup is opened. when user press ESC button then modal
      is closed`, () => {
      modals.clickByText(escapeDemo, btnText);
      modals.pressEsc();
      modals.isModalEnabled(modals.modalContainer, false);
    });
  });

  describe('Modal window with tooltip and popover', () => {
    beforeEach(() => modals.scrollToMenu('Modal window with tooltip and popover'));

    const tooltip = new TooltipPo();
    const toolPopupDemo = modals.exampleDemosArr.serviceToolPopup;
    const btnText = 'Open modal';
    const btnPopover = 'popover';
    const btnTooltip = 'tooltip';

    it('example contains the button "Open modal"', () => {
      modals.isButtonExist(toolPopupDemo, btnText);
    });

    it(`when user clicks on "Open modal" button then modal is opened. the buttons "popover" and "tooltip"
       are present`, () => {
      modals.clickByText(toolPopupDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isButtonExist(modals.modalBody, btnPopover, 2);
      modals.isButtonExist(modals.modalBody, btnTooltip, 3);
    });

    it('when user clicks on "popup" button then a popup is shown', () => {
      modals.clickByText(toolPopupDemo, btnText);
      modals.clickByText(modals.modalBody, btnPopover);
      modals.isElementVisible('body', modals.modalPopup);
    });

    it(`when user hover on "tooltip" button then a popup is shown`,
      () => {
        modals.clickByText(toolPopupDemo, btnText);
        tooltip.focusOnBtn(modals.modalBody, 3);
        modals.isModalTooltipVisible();
      });
  });

  describe('Backdrop options', () => {
    beforeEach(() => modals.scrollToMenu('Backdrop option'));

    const backdropDemo = modals.exampleDemosArr.serviceBackdrop;
    const btnText = 'Open modal';
    const btnDisable = 'Disable backdrop';
    const btnEnable = 'Enable backdrop';
    const btnDisableClick = 'Disable backdrop click';
    const btnEnableClick = 'Enable backdrop click';

    it('example contains the buttons "Open modal", "Disable backdrop" and "Enable backdrop"', () => {
      modals.isButtonExist(backdropDemo, btnText);
      modals.isButtonExist(backdropDemo, btnDisable, 1);
      modals.isButtonExist(backdropDemo, btnDisableClick, 2);
    });

    it('when user clicks on "Open modal" button then modal is opened, it can be closed by clicking on a backdrop',
      () => {
        modals.clickByText(backdropDemo, btnText);
        modals.isModalVisible(modals.modalContainer, true);
        modals.isBackdropExist(true);
        modals.clickOnBackdrop();
        modals.isModalEnabled(modals.modalContainer, false);
      });

    it(`when user clicks "Disable backdrop" then title of the button changes to "Enable background", after
      that click on "Open modal" button, modal is opened, backdrop is closed`, () => {
      modals.clickByText(backdropDemo, btnDisable);
      modals.isButtonExist(backdropDemo, btnEnable, 1);
      modals.clickByText(backdropDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isBackdropExist(false);
      modals.isModalEnabled(modals.modalContainer, false);
    });

    it(`when user clicks on "Disable backdrop click" button, title of button should change to "Enable backdrop click",
      after that open modal and close by click on backdrop then modal stays opened`, () => {
      modals.clickByText(backdropDemo, btnDisableClick);
      modals.isButtonExist(backdropDemo, btnEnableClick, 2);
      modals.clickByText(backdropDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.isBackdropExist(true);
      modals.clickOnBackdrop();
      modals.isModalVisible(modals.modalContainer, true);
    });
  });

  describe('Change class', () => {
    beforeEach(() => cy.viewport(1440, 900));

    const classChangeDemo = modals.exampleDemosArr.serviceClassChange;
    const btnText = 'Create template modal';
    const btnChangeWidth = 'Change width';
    const width300px = '300px';
    const width800px = '800px';
    const modalClassSM = '.modal-dialog.modal-sm';
    const modalClassLG = '.modal-dialog.modal-lg';

    it('example contains the button "Create template modal"', () => {
      modals.clickOnDemoMenu('Change class');
      modals.isButtonExist(classChangeDemo, btnText);
    });

    it(`when user clicks on "Create template modal" button then modal is opened, "Change width" button
       is present. the modal has width 300px and class "modal-dialog modal-sm"`,
      () => {
        modals.clickByText(classChangeDemo, btnText);
        modals.isModalVisible(modals.modalContainer, true);
        modals.isButtonExist(`${modals.modalContainer} div`, btnChangeWidth, 1);
        modals.isModalWindowWidthEqual(modals.modalContainer, width300px);
        modals.isModalHasChildClass(modalClassSM);
      });

    it(`when user click on the button "Change width" then width of the modal is changed to 800px and
      the modal class changed to "modal-dialog modal-lg"`, () => {
      modals.clickByText(classChangeDemo, btnText);
      modals.isModalVisible(modals.modalContainer, true);
      modals.clickByText(modals.modalContent, btnChangeWidth);
      modals.isModalWindowWidthEqual(modals.modalContainer, width800px);
      modals.isModalHasChildClass(modalClassLG);
    });
  });
});

