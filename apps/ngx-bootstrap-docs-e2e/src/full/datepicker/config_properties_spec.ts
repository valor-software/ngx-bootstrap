import { DatepickerPo } from '../../support/datepicker.po';
import { formatDate } from 'ngx-bootstrap/chronos';

describe('Datepicker demo testing suite: Config properties', () => {
  const datepicker = new DatepickerPo();
  const configProperties = datepicker.exampleDemosArr.configProperties;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Config properties');
  });

  it(`example contains Datepicker input, template src should contain
                 bsConfig parames: dateInputFormat: "DD-MM-YYYY", containerClass: "theme-red"`, () => {
    datepicker.isInputHaveAttrs(configProperties, [{ attr: 'placeholder', value: 'Datepicker' }]);
    datepicker.isTemplateSrcContain('Config properties', `dateInputFormat: 'DD-MM-YYYY'`);
    datepicker.isTemplateSrcContain('Config properties', `containerClass: 'theme-red'`);
  });

  it(`when user clicks on Datepicker input, bs-datepicker-container opens in style "theme-red"`, () => {
    datepicker.clickOnDatepickerInput(configProperties);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatepickerStyleCorrect('red');
  });

  it(`when user chose any date, then container disappeared and date shown in format "DD-MM-YYYY"`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(configProperties);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(configProperties, `${formatDate(chosenDate, 'DD-MM-YYYY')}`);
    datepicker.isDatepickerOpened(false);
  });
});
