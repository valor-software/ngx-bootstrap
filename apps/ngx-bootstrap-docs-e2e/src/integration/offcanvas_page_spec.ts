import { OffcanvasPo } from '../support/offcanvas.po';

describe('Offcanvas page testing suite', () => {
  const offcanvas = new OffcanvasPo();

  beforeEach(() => offcanvas.navigateTo());

  describe('Basic offcanvas', () => {
    const basic = offcanvas.exampleDemosArr.basic;
    const element = offcanvas.exampleDemosArr.offcanvasElement;
    const backdrop = offcanvas.exampleDemosArr.backdropElement;
    const header = offcanvas.exampleDemosArr.headerElement;

    it('when user click on button element should appear with default configuration', () => {
      offcanvas.checkClass(`${basic} ${element}`, 'show', true);
      offcanvas.clickOnBtn(`${basic}`);
      offcanvas.checkClass(`${basic} ${element}`, 'show');
      offcanvas.checkClass(`body ${backdrop}`, 'show');
      offcanvas.checkTextContent(`${basic} ${element} ${header} h5`, '');
      offcanvas.clickOnBtn(`${basic} ${element} ${header}`);
      offcanvas.checkClass(`${basic} ${element}`, 'show', true);
    });
  });

  describe('Header Title offcanvas', () => {
    const headerTitle = offcanvas.exampleDemosArr.headerTitle;
    const element = offcanvas.exampleDemosArr.offcanvasElement;
    const backdrop = offcanvas.exampleDemosArr.backdropElement;
    const header = offcanvas.exampleDemosArr.headerElement;

    it('when user click on button element should appear with new header Title', () => {
      offcanvas.checkClass(`${headerTitle} ${element}`, 'show', true);
      offcanvas.clickOnBtn(`${headerTitle}`);
      offcanvas.checkClass(`${headerTitle} ${element}`, 'show');
      offcanvas.checkClass(`body ${backdrop}`, 'show');
      offcanvas.checkTextContent(`${headerTitle} ${element} ${header} h5`, 'Added Header Title');
      offcanvas.clickOnBtn(`${headerTitle} ${element} ${header}`);
      offcanvas.checkClass(`${headerTitle} ${element}`, 'show', true);
    });
  });

  describe('Different placement of offcanvas', () => {
    const differentPosition = offcanvas.exampleDemosArr.differentPosition;
    const element = offcanvas.exampleDemosArr.offcanvasElement;
    const header = offcanvas.exampleDemosArr.headerElement;

    const POSITION_CLASSNAME = {
      start: 'offcanvas-start',
      end: 'offcanvas-end',
      top: 'offcanvas-top',
      bottom: 'offcanvas-bottom'
    };

    const BUTTON_INDEX = {
      start: 0,
      end: 1,
      top: 2,
      bottom: 3
    };

    const availablePosition = Object.keys(POSITION_CLASSNAME);

    it('when user click on button element should appears with new header Title', () => {
      offcanvas.checkClass(`${differentPosition} ${element}`, 'show', true);
      for (let i = 0; i < availablePosition.length - 1; i++) {
        const position = availablePosition[i];
        offcanvas.clickOnBtn(`${differentPosition}`, BUTTON_INDEX[position]);
        offcanvas.checkClass(`${differentPosition} ${element}`, 'show');
        offcanvas.checkClass(`${differentPosition} ${element}`, POSITION_CLASSNAME[position]);
        offcanvas.clickOnBtn(`${differentPosition} ${element} ${header}`);
        offcanvas.checkClass(`${differentPosition} ${element}`, 'show', true);
      }
    });
  });

  describe('Backdrop of offcanvas', () => {
    const backdropSelector = offcanvas.exampleDemosArr.backdrop;
    const element = offcanvas.exampleDemosArr.offcanvasElement;
    const header = offcanvas.exampleDemosArr.headerElement;
    const backdrop = offcanvas.exampleDemosArr.backdropElement;

    it('when user click on button element should appears with/without backdrop', () => {
      offcanvas.checkClass(`${backdropSelector} ${element}`, 'show', true);
      offcanvas.clickOnBtn(`${backdropSelector}`, 1);
      offcanvas.checkClass(`${backdropSelector} ${element}`, 'show');
      offcanvas.checkClass(`body ${backdrop}`, 'show');
      offcanvas.clickOnBtn(`${backdropSelector} ${element} ${header}`);
      offcanvas.clickOnBtn(`${backdropSelector}`, 0);
      offcanvas.clickOnBtn(`${backdropSelector}`, 1);
      offcanvas.checkClass(`${backdropSelector} ${element}`, 'show');
      offcanvas.checkBackdropInDom(`body ${backdrop}`);
    });
  });

  describe('Events offcanvas', () => {
    const eventSelector = offcanvas.exampleDemosArr.triggerEvent;
    const element = offcanvas.exampleDemosArr.offcanvasElement;
    const header = offcanvas.exampleDemosArr.headerElement;

    it('when user opens element should appears true in pre tag, after closing it should be changed on false', () => {
      offcanvas.checkClass(`${eventSelector} ${element}`, 'show', true);
      offcanvas.clickOnBtn(`${eventSelector}`);
      offcanvas.checkTextContent(`${eventSelector} pre`, 'true');
      offcanvas.clickOnBtn(`${eventSelector} ${element} ${header}`);
      offcanvas.checkTextContent(`${eventSelector} pre`, 'false');
    });
  });

  describe('Ways to use', () => {
    const waysToUseSelector = offcanvas.exampleDemosArr.waysToUse;
    const element = offcanvas.exampleDemosArr.offcanvasElement;
    const header = offcanvas.exampleDemosArr.headerElement;
    const backdrop = offcanvas.exampleDemosArr.backdropElement;

    it('when user opens element should appears true in pre tag, after closing it should be changed on false', () => {
      offcanvas.checkClass(`${waysToUseSelector} ${element}`, 'show', true);
      offcanvas.clickOnBtn(`${waysToUseSelector}`, 0);
      offcanvas.checkClass(`${waysToUseSelector} ${element}`, 'show');
      offcanvas.clickOnBtn(`${waysToUseSelector} ${element} ${header}`);
      offcanvas.clickOnBtn(`${waysToUseSelector}`, 1);
      offcanvas.checkClass(`${waysToUseSelector} ${element}`, 'show');
      offcanvas.clickOnBackdrop(`body ${backdrop}`);
      offcanvas.checkClass(`${waysToUseSelector} ${element}`, 'show', true);
    });
  });
});
