import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Visibility Events', () => {
  const datepicker = new DatepickerPo();
  const visibilityEvents = datepicker.exampleDemosArr.visibilityEvents;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Visibility Events');
  });

  it(`example contains Datepicker input`, () => {
    datepicker.isInputHaveAttrs(visibilityEvents, [{ attr: 'placeholder', value: 'Datepicker' }]);
  });

  it(`when user clicks on Datepicker input, bs-datepicker-container opens
                 and user see card with "Event onShown is fired"`, () => {
    datepicker.clickOnDatepickerInput(visibilityEvents);
    datepicker.isDatepickerOpened(true);
    datepicker.isPreviewExist(visibilityEvents, 'Event onShown is fired', 0);
  });

  it(`when user chose any date, then bs-datepicker-container disappeared
                 and "Event onShown is fired", "Event onHidden is fired" shown`, () => {
    datepicker.clickOnDatepickerInput(visibilityEvents);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '15');
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(visibilityEvents, '15');
    datepicker.isPreviewExist(visibilityEvents, 'Event onShown is fired', 0);
    datepicker.isPreviewExist(visibilityEvents, 'Event onHidden is fired', 1);
  });

  it(`when user clicks on input again, then "Event onShown is fired" shown
                 and "Event onHidden is fired" hidden`, () => {
    datepicker.clickOnDatepickerInput(visibilityEvents);
    datepicker.isDatepickerOpened(true);
    datepicker.isPreviewExist(visibilityEvents, 'Event onShown is fired');
    datepicker.isPreviewHidden(visibilityEvents, 1);
  });
});
