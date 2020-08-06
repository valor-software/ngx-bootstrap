import { BaseComponent } from './base.component';
import * as globalLocales from 'ngx-bootstrap/locale';
import { getDate } from '../../src/chronos/utils/date-getters';

export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  daterangepickerInput = 'input[bsdaterangepicker]';
  datepickerNavView = 'bs-datepicker-navigation-view';
  datepickerContainer = 'bs-datepicker-container';
  datepickerInlineContainer = 'bs-datepicker-inline-container';
  daterangepickerContainer = 'bs-daterangepicker-container';
  datepickerBodyDaysView = 'bs-days-calendar-view';
  datepickerBodyMonthView = 'bs-month-calendar-view';
  datepickerBodyYearsView = 'bs-years-calendar-view';
  daterangepickerQuickSelectContainer = 'bs-custom-date-view';
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'January'];
  locales = [];


  exampleDemosArr = {
    basic: 'demo-datepicker-basic',
    initialState: 'demo-datepicker-date-initial-state',
    customFormat: 'demo-date-picker-custom-format',
    hideOnScroll: 'demo-date-picker-hide-on-scroll',
    themes: 'demo-datepicker-color-theming',
    locales: 'demo-datepicker-change-locale',
    minMax: 'demo-datepicker-min-max',
    daysDisabled: 'demo-datepicker-daysdisabled',
    minMode: 'demo-datepicker-min-mode',
    disabled: 'demo-datepicker-disabled',
    forms: 'demo-datepicker-forms',
    reactiveForms: 'demo-datepicker-reactive-forms',
    manualTrigger: 'demo-datepicker-triggers-manual',
    placement: 'demo-datepicker-placement',
    configMethod: 'demo-datepicker-config-method',
    visibilityEvents: 'demo-datepicker-visibility-events',
    valueChangeEvent: 'demo-datepicker-value-change-event',
    configProperties: 'demo-datepicker-config-object',
    selectFromOtherMonth: 'demo-datepicker-select-dates-from-other-months',
    outsideClick: 'demo-datepicker-outside-click',
    triggerByIsOpen: 'demo-datepicker-trigger-by-isopen',
    customTriggers: 'demo-datepicker-triggers-custom',
    selectWeek: 'demo-datepicker-select-week',
    inlineDatepicker: 'bs-datepicker-inline',
    customTodayClass: 'demo-datepicker-custom-today-class',
    quickSelectRange: 'demo-datepicker-quick-select-ranges',
    maxDateRange: 'demo-datepicker-max-date-range'
  };

  clickOnDatepickerInput(baseSelector: string, datepickerIndex = 0) {
    cy.get(`${baseSelector} ${this.datepickerInput}`).eq(datepickerIndex).click();
  }

  clickOnDaterangepickerInput(baseSelector: string, dateRangeIndex = 0) {
    cy.get(`${baseSelector} ${this.daterangepickerInput}`).eq(dateRangeIndex).click();
  }

  isSelectedDateExist(picker = 'datepicker', exist: boolean, baseSelector = 'body', expectedDay?: string) {
    const appropriateContainer: string = this.getAppropriateContainer(picker);

    if (!exist) {
      cy.get(`${baseSelector}>${appropriateContainer} .selected`)
        .should('not.exist');
    } else {
      cy.get(`${baseSelector}>${appropriateContainer} .selected`)
        .should('be.visible')
        .and('contain', expectedDay ? expectedDay : '');
    }
  }

  isVisibleMonthOrYearEqual(expectedMonth: string, baseSelector = 'body') {
    const appropriateContainer: string =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(1)
      .should('be.visible')
      .and('to.have.text', expectedMonth);
  }

  isVisibleDateRangePickerMonthOrYearEqual(expectedValueLeft: string, expectedValueRight: string, baseSelector = 'body') {
    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`).eq(0).find('button').eq(1)
      .should('be.visible')
      .and('to.have.text', expectedValueLeft);
    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`).eq(1).find('button').eq(1)
      .should('be.visible')
      .and('to.have.text', expectedValueRight);
  }

  isQuickSelectRangesDisplayed(baseSelector = 'body'){
    cy.get(this.daterangepickerQuickSelectContainer)
      .find('button')
      .as('DateRangePicker');
    cy.get('@DateRangePicker').eq(0)
      .should('be.visible')
      .and('to.have.text', ' Last 7 Days ');
    cy.get('@DateRangePicker').eq(1)
      .should('be.visible')
      .and('to.have.text', ' Next 7 Days ');
    cy.get('@DateRangePicker').eq(2)
      .should('be.visible')
      .and('to.have.text', ' Custom Range ');
  }

  clickOnQuickRangeBtn(countOfBtn: number) {
    cy.get(this.daterangepickerQuickSelectContainer).find('button').eq(countOfBtn).click();
  }

  isQuickSelectLastDaysApplied(datepicker: string, countOfBtn: number, baseSelector = 'body') {
    const todayDate = Cypress.moment().format('L');
    const previousDate = Cypress.moment().subtract(7, 'days').calendar();
    const nextDate = Cypress.moment().add(7, 'days').calendar();

    this.clickOnQuickRangeBtn(countOfBtn);
    cy.get(`${baseSelector} ${datepicker} ${this.daterangepickerInput}`)
      .should('contain.value', todayDate)
      .should('contain.value', countOfBtn === 0 ? previousDate : nextDate);
  }

  isQuickSelectRangeButtonHighlighted(rangeNumber: number, baseSelector = 'body') {
    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.daterangepickerQuickSelectContainer}`)
      .find('button').as('DateRangePicker');
    cy.get('@DateRangePicker').eq(rangeNumber)
      .should('have.class', 'selected');
  }

  isDatepickerNavigationFullyActiveAndCorrect(mode = 'date',
                                              baseSelector = 'body',
                                              expectedMonth?: string,
                                              expectedYear?: string) {
    const currentMonth: string = this.monthNames[new Date().getMonth()];
    const currentYearSrt: string = new Date().getFullYear().toString();

    cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView}`).as('DatepickerNavBarArray');
    cy.get('@DatepickerNavBarArray').find('button')
      .should('to.have.length', mode === 'date' ? 4 : 3);
    cy.get('@DatepickerNavBarArray').find('.previous')
      .should('be.visible')
      .and('to.have.text', '‹');
    cy.get('@DatepickerNavBarArray').find('.next')
      .should('be.visible')
      .and('to.have.text', '›');

    switch (mode) {
      case 'date':
        cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedMonth ? expectedMonth : currentMonth);
        cy.get('@DatepickerNavBarArray').find('button').eq(2)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : currentYearSrt);
        break;

      case 'month':
        cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', expectedYear ? expectedYear : currentYearSrt);
        break;

      case 'year':
        cy.get('@DatepickerNavBarArray').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', `${new Date().getFullYear() - 7} - ${new Date().getFullYear() + 8}`);
        break;

      default:
        throw new Error('Unknown view mode');
    }
  }

  isDateRangepickerNavigationFullyActiveAndCorrect(mode = 'date',
                                                   baseSelector = 'body',
                                                   expectedMonth?: string,
                                                   expectedYear?: string) {
    const currentMonth: string = expectedMonth ? expectedMonth
      : this.monthNames[new Date().getMonth()];
    const nextMonth: string = expectedMonth ? this.monthNames[this.monthNames.indexOf(expectedMonth) + 1]
      : this.monthNames[new Date().getMonth() + 1];
    const currentYearSrt: string = expectedYear ? expectedYear
      : new Date().getFullYear().toString();
    const currentYearNum: number = expectedYear ? Number(expectedYear)
      : new Date().getFullYear();
    const nextYearStr: string = expectedYear ? (Number(expectedYear) + 1).toString()
      : (new Date().getFullYear() + 1).toString();

    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
      .eq(0)
      .as('DaterangepickerNavBarLeft');
    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
      .eq(1)
      .as('DaterangepickerNavBarRight');
    cy.get('@DaterangepickerNavBarLeft').find('button')
      .should('to.have.length', mode === 'date' ? 4 : 3);
    cy.get('@DaterangepickerNavBarLeft').find('button.previous')
      .should('be.visible')
      .and('to.have.text', '‹');
    cy.get('@DaterangepickerNavBarLeft').find('button.next')
      .should('be.hidden')
      .and('to.have.text', '›');
    cy.get('@DaterangepickerNavBarRight').find('button')
      .should('to.have.length', mode === 'date' ? 4 : 3);
    cy.get('@DaterangepickerNavBarRight').find('button.previous')
      .should('be.hidden')
      .and('to.have.text', '‹');
    cy.get('@DaterangepickerNavBarRight').find('button.next')
      .should('be.visible')
      .and('to.have.text', '›');

    switch (mode) {
      case 'date':
        cy.get('@DaterangepickerNavBarLeft').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', currentMonth);
        cy.get('@DaterangepickerNavBarLeft').find('button').eq(2)
          .should('be.visible')
          .and('to.have.text', currentYearSrt);
        cy.get('@DaterangepickerNavBarRight').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', nextMonth);
        cy.get('@DaterangepickerNavBarRight').find('button').eq(2)
          .should('be.visible')
          .and('to.have.text', currentMonth === 'December' ? nextYearStr : currentYearSrt);
        break;

      case 'month':
        cy.get('@DaterangepickerNavBarLeft').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', currentYearSrt);
        cy.get('@DaterangepickerNavBarRight').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', nextYearStr);
        break;

      case 'year':
        cy.get('@DaterangepickerNavBarLeft').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', `${currentYearNum - 7} - ${currentYearNum + 8}`);
        cy.get('@DaterangepickerNavBarRight').find('button').eq(1)
          .should('be.visible')
          .and('to.have.text', `${currentYearNum + 9} - ${currentYearNum + 24}`);
        break;

      default:
        throw new Error('Unknown view mode');
    }
  }

  isDatePickerBodyExistAndCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;
    const expectedLength = this.getBodyParams(mode).expectedLength;

    cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`)
      .should('to.have.length', expectedLength);
  }

  isDaterangePickerBodyExistAndCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;
    const expectedLength = this.getBodyParams(mode).expectedLength;

    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`).each(bodyContainer => {
      cy.wrap(bodyContainer).find('td').should('to.have.length', expectedLength);
    });
  }

  isDatePickerTriggerCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;

    cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`)
      .each(date => {
        cy.wrap(date).trigger('mouseenter').should('to.have.class', 'is-highlighted');
      });
  }

  isDaterangePickerTriggerCorrect(mode: string, baseSelector = 'body') {
    const bodyView = this.getBodyParams(mode).bodyView;

    cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`).each(bodyContainer => {
      cy.wrap(bodyContainer).find('td')
        .each(date => {
          cy.wrap(date).trigger('mouseenter').should('to.have.class', 'is-highlighted');
        });
    });
  }

  isDatepickerOpened(opened: boolean, baseSelector = 'body') {
    cy.get(`${baseSelector}>${baseSelector === 'body' ? this.datepickerContainer : this.datepickerInlineContainer}`)
      .should(opened ? 'to.be.exist' : 'not.to.be.exist');
  }

  isDaterangepickerOpened(opened: boolean, baseSelector = 'body') {
    cy.get(`${baseSelector}>${this.daterangepickerContainer}`).should(opened ? 'to.be.exist' : 'not.to.be.exist');
  }

  clickOnNavigation(baseSelector: string, navigationItem: string) {
    const appropriateContainer =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    switch (navigationItem) {
      case '<' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .previous`).click();
        break;

      case '>' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} .next`).click();
        break;

      case 'month' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(1).click();
        break;

      case 'year' :
        cy.get(`${baseSelector}>${appropriateContainer} ${this.datepickerNavView} button`).eq(2).click();
        break;

      default:
        throw new Error('Unknown navigation item, correct: <, >, month, year');
    }
  }

  clickOnDateRangePickerNavigation(navigationItem: string, baseSelector = 'body') {
    switch (navigationItem) {
      case '<' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(0)
          .find('.previous')
          .click();
        break;

      case '>' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(1)
          .find('.next')
          .click();
        break;

      case 'month-left' || 'yearInterval-left' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(0)
          .find('button')
          .eq(1)
          .click();
        break;

      case 'month-right' || 'yearInterval-right' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(1)
          .find('button')
          .eq(1)
          .click();
        break;

      case 'year-left' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(0)
          .find('button')
          .eq(2)
          .click();
        break;

      case 'year-right' :
        cy.get(`${baseSelector}>${this.daterangepickerContainer} ${this.datepickerNavView}`)
          .eq(1)
          .find('button')
          .eq(2)
          .click();
        break;

      default:
        throw new Error(`Unknown item, available: "<", ">", "month-left", "month-right",
        "year-left", "year-right", "yearInterval-left", "yearInterval-right"`);
    }
  }

  clickOnDatepickerTableItem(mode: string, baseSelector = 'body', itemIndex?: number, itemText?: string) {
    const bodyView = this.getBodyParams(mode).bodyView;
    const appropriateContainer =
      this.getAppropriateContainer(baseSelector === 'body' ? 'datepicker' : 'datepickerInline');

    if (itemText === undefined) {
      cy.get(`${baseSelector}>${appropriateContainer} ${bodyView} td`).eq(itemIndex).click();
    } else {
      cy.get(`${baseSelector}>${appropriateContainer} ${bodyView}`)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .contains(itemText).click();
    }
  }

  clickOnDatepickerWeekItem(itemIndex?: number, itemText?: string) {
    if (itemText === undefined) {
      cy.get(`body>${this.datepickerContainer} .week`)
        .eq(itemIndex)
        .click();
    } else {
      cy.get(`body>${this.datepickerContainer} .week`)
        .contains(itemText)
        .click();
    }
  }

  clickOnDaterangePickerTableItem(mode: string,
                                  pickerIndex = 0,
                                  baseSelector = 'body',
                                  itemIndex?: number,
                                  itemText?: string) {
    const bodyView = this.getBodyParams(mode).bodyView;

    if (itemText === undefined) {
      cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)
        .eq(pickerIndex)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .eq(itemIndex).click();
    } else {
      cy.get(`${baseSelector}>${this.daterangepickerContainer} ${bodyView}`)
        .eq(pickerIndex)
        .find(`td`)
        .not('.week')
        .find('span')
        .not('[class*="is-other-month"]')
        .contains(itemText).click();
    }
  }

  isDatepickerStyleCorrect(expectedTheme: string, baseSelector = 'body') {
    let expColour: string;

    switch (expectedTheme) {
      case 'green' :
        expColour = 'rgb(92, 184, 92)';
        break;

      case 'default' :
        expColour = 'rgb(119, 119, 119)';
        break;

      case 'red' :
        expColour = 'rgb(217, 83, 79)';
        break;

      case 'blue' :
        expColour = 'rgb(91, 192, 222)';
        break;

      case 'dark-blue' :
        expColour = 'rgb(51, 122, 183)';
        break;

      case 'orange' :
        expColour = 'rgb(240, 173, 78)';
        break;

      default:
        throw new Error(`Unknown theme, available: "green", "blue", "dark-blue", "red", "orange", "default"`);
    }

    cy.get(`${baseSelector}>${this.datepickerContainer} .bs-datepicker-head`)
      .should('to.have.css', 'background-color', expColour);
    cy.get(`${baseSelector}>${this.datepickerContainer} .bs-datepicker-body .week span`)
      .should('to.have.css', 'color', expColour);
  }

  isMonthLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
    let actualMonthArr: any;
    switch (expectedLocale) {
      case 'hi' :
        actualMonthArr = globalLocales.hiLocale.months;
        break;

      case 'gl' :
        actualMonthArr = globalLocales.glLocale.months;
        break;

      case 'mn' :
        actualMonthArr = globalLocales.mnLocale.months;
        break;

      case 'ka' :
        actualMonthArr = globalLocales.kaLocale.months;
        break;

      case 'sq' :
        actualMonthArr = globalLocales.sqLocale.months;
        break;

      case 'kk' :
        actualMonthArr = globalLocales.kkLocale.months;
        break;

      default:
        actualMonthArr = undefined;
    }

    if (actualMonthArr) {
      actualMonthArr = Array.isArray(actualMonthArr) ? actualMonthArr : actualMonthArr.standalone;
    }

    cy.get(`${baseSelector}>${
      pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} tbody td`)
      .eq(0)
      .each((month, monthIndex) => {
      expect(month.text().toLowerCase()).to.contains(
        actualMonthArr ? actualMonthArr[monthIndex].toLowerCase() :
          new Date(2017, monthIndex)
            .toLocaleDateString(expectedLocale, { month: 'long' })
            .toLowerCase());
    });
  }

  isWeekdayLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
    cy.get(`${baseSelector}>${
      pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} table`)
      .eq(0)
      .find('th[aria-label*="weekday"]')
      .each((weekday, weekdayIndex) => {
        Object.values(globalLocales).forEach(globalLocale => {
          if (globalLocale === expectedLocale) {
            expect(weekday.text().toLowerCase())
              .to.contains(globalLocale.weekdaysShort[globalLocale.week.dow + weekdayIndex]);
          }
        });
      });
  }

  isDayIntervalDisabledInCurrentMonth(minDate: Date, maxDate: Date, disabled: boolean) {
    const minOrigin = new Date(minDate.getTime());
    const min = minDate;
    for (min; min <= maxDate && min.getMonth() === minOrigin.getMonth(); min.setDate(min.getDate() + 1)) {
      cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody td`)
        .not('.week')
        .find('span')
        .not('.is-other-month')
        .contains(min.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isDaysDisabledInCurrentMonth(minDate: Date, maxDate: Date, disabled: boolean, dateRangePicker?: boolean) {
    if (minDate.getDate() > 0 && minDate.getDate() < 19) {
      cy.get(`body>${dateRangePicker ? this.daterangepickerContainer : this.datepickerContainer} ${this.datepickerBodyDaysView} tbody td`)
        .not('.week')
        .find('span')
        .not('.is-other-month')
        .contains(maxDate.getDate() + 1)
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isWeekdayDisabled(disabled: boolean, weekdayIndex: number) {
    cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody tr`)
      .each(week => {
        cy.wrap(week)
          .find('td')
          .not('.week')
          .find('span')
          .eq(weekdayIndex)
          .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
      });
  }

  clickOnWeekDay(workingDay: boolean) {
    cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody tr`)
      .eq(2)
      .find('td')
      .not('.week')
      .eq(workingDay ? 2 : 0)
      .click();
  }

  isDayIntervalDisabledInCurrentMonthDateRange(minDate: Date, maxDate: Date, disabled: boolean) {
    const minOrigin = new Date(minDate.getTime());
    const min = minDate;
    for (min; min <= maxDate && min.getMonth() === minOrigin.getMonth(); min.setDate(min.getDate() + 1)) {
      cy.get(`body>${this.daterangepickerContainer} ${this.datepickerBodyDaysView}`).eq(0).find(`tbody td`)
        .not('.week')
        .find('span')
        .not('.is-other-month')
        .contains(min.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isDayIntervalDisabledInNextMonth(minDate: Date, maxDate: Date, disabled: boolean) {
    const maxOrigin = new Date(maxDate.getTime());
    const max = maxDate;
    for (max; minDate <= max && maxOrigin.getMonth() === max.getMonth(); max.setDate(max.getDate() - 1)) {
      cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody td`)
        .not('.week')
        .find('span')
        .not('.is-other-month')
        .contains(max.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isDayIntervalDisabledInNextMonthDateRange(minDate: Date, maxDate: Date, disabled: boolean) {
    const maxOrigin = new Date(maxDate.getTime());
    const max = maxDate;
    for (max; minDate <= max && maxOrigin.getMonth() === max.getMonth(); max.setDate(max.getDate() - 1)) {
      cy.get(`body>${this.daterangepickerContainer} ${this.datepickerBodyDaysView}`).eq(1).find(`tbody td`)
        .not('.week')
        .find('span')
        .not('.is-other-month')
        .contains(max.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isTodayHaveClass(className: string) {
    cy.get(`body>${this.datepickerContainer} tbody td`)
      .not('.week')
      .find('span')
      .not('.is-other-month')
      .contains(new Date().getDate())
      .should('to.have.class', className);
  }

  /**
   * Method checks datepicker placement according to input field (left/right/top/bottom)
   * Compare input and picker height and width for checking centering elements
   * For avoid resolution differences in equivalence check, used rounding to 10
   */
  isDatepickerPlacementCorrect(baseSelector: string, placement: string, indexInput?: number) {
    let index: number;
    const inputMarginHeight = 15;
    const inputMarginWidth = 27;
    cy.get(`body>${this.datepickerContainer}`).as('Datepicker');
    cy.get(`${baseSelector} input`).as('InputsArray');

    switch (placement) {
      case 'right':
        indexInput ? index = indexInput : index = 0;
        cy.get('@Datepicker').then(datepicker => {
          cy.get('@InputsArray').eq(index).then(input => {
            expect(input.offset().left).to.lessThan(datepicker.offset().left);
            expect(input.offset().top).to.greaterThan(datepicker.offset().top);
            expect(Math.round((input.offset().top + (input.height() + inputMarginHeight) / 2) / 10) * 10)
              .to.equal(Math.round((datepicker.offset().top + datepicker.height() / 2) / 10) * 10);
          });
        });
        break;

      case 'top':
        indexInput ? index = indexInput : index = 1;
        cy.get('@Datepicker').then(datepicker => {
          cy.get('@InputsArray').eq(index).then(input => {
            expect(input.offset().left).to.greaterThan(datepicker.offset().left);
            expect(input.offset().top).to.greaterThan(datepicker.offset().top);
            expect(Math.round((input.offset().left + (input.width() + inputMarginWidth) / 2) / 10) * 10)
              .to.equal(Math.round((datepicker.offset().left + datepicker.width() / 2) / 10) * 10);
          });
        });
        break;

      case 'bottom':
        indexInput ? index = indexInput : index = 2;
        cy.get('@Datepicker').then(datepicker => {
          cy.get('@InputsArray').eq(index).then(input => {
            expect(input.offset().left).to.greaterThan(datepicker.offset().left);
            expect(input.offset().top).to.lessThan(datepicker.offset().top);
            expect(Math.round((input.offset().left + (input.width() + inputMarginWidth) / 2) / 10) * 10)
              .to.equal(Math.round((datepicker.offset().left + datepicker.width() / 2) / 10) * 10);
          });
        });
        break;

      case 'left':
        indexInput ? index = indexInput : index = 3;
        cy.get('@Datepicker').then(datepicker => {
          cy.get('@InputsArray').eq(index).then(input => {
            expect(input.offset().left).to.greaterThan(datepicker.offset().left);
            expect(input.offset().top).to.greaterThan(datepicker.offset().top);
            expect(Math.round((input.offset().top + (input.height() + inputMarginHeight) / 2) / 10) * 10)
              .to.equal(Math.round((datepicker.offset().top + datepicker.height() / 2) / 10) * 10);
          });
        });
        break;
      default:
        index = undefined;
    }
  }

  private getBodyParams(mode: string) {
    let bodyView: string;
    let expectedLength: number;
    switch (mode) {
      case 'date':
        bodyView = this.datepickerBodyDaysView;
        expectedLength = 48;
        break;
      case 'month':
        bodyView = this.datepickerBodyMonthView;
        expectedLength = 12;
        break;
      case 'year':
        bodyView = this.datepickerBodyYearsView;
        expectedLength = 16;
        break;
      default:
        throw new Error('Unknown view mode');
    }

    return { bodyView, expectedLength };
  }

  private getAppropriateContainer(picker: string) {
    let appropriateContainer: string;
    switch (picker) {
      case 'datepicker':
        return appropriateContainer = this.datepickerContainer;
      case 'daterangepicker':
        return appropriateContainer = this.daterangepickerContainer;
      case 'datepickerInline':
        return appropriateContainer = this.datepickerInlineContainer;
      default:
        return appropriateContainer = this.datepickerContainer;
    }
  }
}
