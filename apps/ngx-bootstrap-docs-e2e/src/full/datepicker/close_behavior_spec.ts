import { DatepickerPo } from '../../support/datepicker.po';
import {TimepickerPo} from "../../support/timepicker.po";

describe('Datepicker demo testing suite: Visibility Events', () => {
  const datepicker = new DatepickerPo();
  const visibilityEvents = datepicker.exampleDemosArr.closeBehavior;
  const datepickerTimepickerSelector = 'bs-datepicker-container';
  const timepicker = new TimepickerPo();

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Close behavior with timepicker changes');
  });

  it(`example contains Datepicker input`, () => {
    datepicker.isInputHaveAttrs(visibilityEvents, [{ attr: 'placeholder', value: 'Datepicker' }]);
  });

  it(`when user clicks on Datepicker input, bs-datepicker-container opens with timepicker"`, () => {
    datepicker.clickOnDatepickerInput(visibilityEvents);
    datepicker.isDatepickerOpened(true);
    datepicker.isElementVisible('body', `${datepickerTimepickerSelector} timepicker`);
  });

  it(`when user clicks on timepicker arrows value in input should be changed`, () => {
    datepicker.clickOnDatepickerInput(visibilityEvents);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '15');
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(visibilityEvents, '15');
    datepicker.clickOnDatepickerInput(visibilityEvents);
    timepicker.clickOnArrow(`body ${datepickerTimepickerSelector}`, 'up', 0);
    datepicker.isInputValueContain(visibilityEvents, '2');
    datepicker.isDatepickerOpened(true);
  });
});
