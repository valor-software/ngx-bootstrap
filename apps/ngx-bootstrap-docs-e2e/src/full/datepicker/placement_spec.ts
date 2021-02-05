import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Placement', () => {
  const datepicker = new DatepickerPo();
  const placement = datepicker.exampleDemosArr.placement;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Placement');
  });

  it(`example contains 4 Datepicker inputs (each have description about placement: right, top, bottom, left)`, () => {
    datepicker.isInputHaveAttrs(placement, [
      { attr: 'placeholder', value: 'Datepicker' },
      {attr: 'placement', value: 'right'}], 0);
    datepicker.isInputHaveAttrs(placement, [
      { attr: 'placeholder', value: 'Datepicker' },
      {attr: 'placement', value: 'top'}], 1);
    datepicker.isInputHaveAttrs(placement, [
      { attr: 'placeholder', value: 'Datepicker' },
      {attr: 'placement', value: 'bottom'}], 2);
    datepicker.isInputHaveAttrs(placement, [
      { attr: 'placeholder', value: 'Datepicker' },
      {attr: 'placement', value: 'left'}], 3);
  });

  it(`when user clicks on first input, datepicker opens on the right side
                 when user clicks on first input again, bs-datepicker-container disappeared`, () => {
    cy.viewport(1440, 900);
    datepicker.clickOnDatepickerInput(placement, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatepickerPlacementCorrect(placement, 'right');
    datepicker.clickOnDatepickerInput(placement, 0);
    datepicker.isDatepickerOpened(false);
  });

  it(`when user clicks on second input, datepicker opens at the top
                 when user clicks on second input again, bs-datepicker-container disappeared`, () => {
    cy.viewport(1440, 900);
    datepicker.clickOnDatepickerInput(placement, 1);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatepickerPlacementCorrect(placement, 'top', 1);
    datepicker.clickOnDatepickerInput(placement, 1);
    datepicker.isDatepickerOpened(false);
  });

  it(`when user clicks on third input, datepicker opens at the bottom
                 when user clicks on third input again, bs-datepicker-container disappeared`, () => {
    cy.viewport(1440, 900);
    datepicker.clickOnDatepickerInput(placement, 2);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatepickerPlacementCorrect(placement, 'bottom');
    datepicker.clickOnDatepickerInput(placement, 2);
    datepicker.isDatepickerOpened(false);
  });

  it(`when user clicks on fourth input, datepicker opens on the left side
                 when user clicks on fourth input again, bs-datepicker-container disappeared`, () => {
    cy.viewport(1440, 900);
    datepicker.clickOnDatepickerInput(placement, 3);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatepickerPlacementCorrect(placement, 'left');
    datepicker.clickOnDatepickerInput(placement, 3);
    datepicker.isDatepickerOpened(false);
  });
});
