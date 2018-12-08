import { TimepickerPo } from '../support/timepicker.po';

describe('Timepicker demo page test suite', () => {
  const timepicker = new TimepickerPo();

  beforeEach(() => timepicker.navigateTo());

  describe('Meridian', () => {
    const meridian = timepicker.exampleDemosArr.meridian;
    const togglerText = '12H / 24H';


    it('first click on 12/24 toggler removes AM/PM button', () => {
      cy.get(`${ meridian } ${ timepicker.btnAmPm }`).as('am/pm')
        .should('to.exist');

      timepicker.clickByText(meridian, togglerText);
      cy.get('@am/pm')
        .should('not.to.exist');
    });
  });
});
