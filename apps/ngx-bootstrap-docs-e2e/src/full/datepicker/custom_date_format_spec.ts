import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Custom date format', () => {
  const datepicker = new DatepickerPo();
  const customFormat = datepicker.exampleDemosArr.customFormat;
  const newDate = new Date();
  const currentMonthNum: number = newDate.getMonth();
  const currentMonthStr: string = datepicker.monthNames[newDate.getMonth()];
  const currentYearNum: number = newDate.getFullYear();
  const currentDay: number = newDate.getDate();

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Custom date format');
  });

  it(`example contains 3 Datepicker inputs, 3 clickable buttons, value in inputs is current day in diff formats:
                     "YYYY-MM-DD", "MM/DD/YYYY", "MMMM Do YYYY,h:mm:ss a"`, () => {
    const dayToChose = currentDay < 10 ? `0${currentDay}` : currentDay;
    const monthToChose = currentMonthNum + 1 < 10 ? `0${currentMonthNum + 1}` : currentMonthNum + 1;
    datepicker.isInputHaveAttrs(customFormat, [{ attr: 'formcontrolname', value: 'dateYMD' }], 0);
    datepicker.isInputHaveAttrs(customFormat, [{ attr: 'formcontrolname', value: 'dateMDY' }], 1);
    datepicker.isInputHaveAttrs(customFormat, [{ attr: 'formcontrolname', value: 'dateFull' }], 2);
    datepicker.isButtonExist(customFormat, 'Date Picker', 0);
    datepicker.isButtonExist(customFormat, 'Date Picker', 1);
    datepicker.isButtonExist(customFormat, 'Date Picker', 2);
    datepicker.isInputValueEqual(customFormat,
     newDate.toLocaleDateString('Lt'), 0);
    datepicker.isInputValueEqual(customFormat, `${monthToChose}/${dayToChose}/${currentYearNum}`, 1);
    datepicker.isInputValueContain(customFormat,
      newDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }), 2);
    datepicker.isInputValueContain(customFormat,
      `${newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase().split('')[1]}`, 2);
  });

  it('when user click on the first "Date Picker" btn, chose other date - it chosen, appear in "YYYY-MM-DD"', () => {
    const dayToChose = currentDay === 15 ? '16' : '15';
    datepicker.clickOnBtn(customFormat, 0);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, dayToChose);
    datepicker.isInputValueEqual(customFormat,
      new Date(`${currentYearNum}-${currentMonthNum + 1}-${Number(dayToChose)}`).toLocaleDateString('Lt'), 0);
  });

  it('when user click on the second "Date Picker" btn, chose other date - it chosen, appear in "MM/DD/YYYY"', () => {
    const dayToChose = currentDay === 15 ? '16' : '15';
    const monthToChose = currentMonthNum + 1 < 10 ? `0${currentMonthNum + 1}` : currentMonthNum + 1;
    datepicker.clickOnBtn(customFormat, 1);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, dayToChose);
    datepicker.isInputValueEqual(customFormat, `${monthToChose}/${dayToChose}/${currentYearNum}`, 1);
  });

  it('when user click on the third "Date Picker" btn, chose other date - it chosen, MMMM Do YYYY,h:mm:ss a', () => {
    const dayToChose = currentDay === 15 ? '16' : '15';
    datepicker.clickOnBtn(customFormat, 2);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, dayToChose);
    datepicker.isInputValueContain(customFormat,
      `${currentMonthStr} ${dayToChose}th ${currentYearNum}`, 2);
    datepicker.isInputValueContain(customFormat,
      `${newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase().split('')[1]}`, 2);
  });
});
