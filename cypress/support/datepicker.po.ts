import { BaseComponent } from './base.component';
import { glLocale, hiLocale, mnLocale } from 'ngx-bootstrap/chronos';
import * as globalLocales from 'ngx-bootstrap/locale';
import { AttrObj } from './interfaces';


export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  daterangepickerInput = 'input[bsdaterangepicker]';
  datepickerNavView = 'bs-datepicker-navigation-view';
  datepickerContainer = 'bs-datepicker-container';
  daterangepickerContainer = 'bs-daterangepicker-container';
  datepickerBodyDaysView = 'bs-days-calendar-view';
  datepickerBodyMonthView = 'bs-month-calendar-view';
  datepickerBodyYearsView = 'bs-years-calendar-view';
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
    customTodayClass: 'demo-datepicker-custom-today-class'
  };

  clickOnDatepickerInput(baseSelector: string, datepickerIndex = 0) {
    cy.get(`${baseSelector} ${this.datepickerInput}`).eq(datepickerIndex).click();
  }

  clickOnDaterangepickerInput(baseSelector: string) {
    cy.get(`${baseSelector} ${this.daterangepickerInput}`).click();
  }

  isSelectedDateExist(picker = 'datepicker' || 'daterangepicker', exist: boolean, baseSelector = 'body', expectedDay?: string) {
    if (!exist) {
      cy.get(`${baseSelector}>${picker === 'datepicker' ?
        this.datepickerContainer : this.daterangepickerContainer} .selected`)
        .should('not.exist');
    } else {
      cy.get(`${baseSelector}>${picker === 'datepicker' ?
        this.datepickerContainer : this.daterangepickerContainer} .selected`)
        .should('be.visible')
        .and('contain', expectedDay);
    }
  }

  isVisibleMonthOrYearEqual(expectedMonth: string, baseSelector = 'body') {
    cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} button`).eq(1)
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
    cy.get(`${baseSelector}>${this.datepickerContainer}`).should(opened ? 'to.be.exist' : 'not.to.be.exist');
  }

  isDaterangepickerOpened(opened: boolean, baseSelector = 'body') {
    cy.get(`${baseSelector}>${this.daterangepickerContainer}`).should(opened ? 'to.be.exist' : 'not.to.be.exist');
  }

  getBodyParams(mode: string) {
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

  clickOnNavigation(baseSelector: string, navigationItem: string) {
    switch (navigationItem) {
      case '<' :
        cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} .previous`).click();
        break;

      case '>' :
        cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} .next`).click();
        break;

      case 'month' :
        cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} button`).eq(1).click();
        break;

      case 'year' :
        cy.get(`${baseSelector}>${this.datepickerContainer} ${this.datepickerNavView} button`).eq(2).click();
        break;

      default:
        throw new Error('Unknown navigation item');
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

    if (itemText === undefined) {
      cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td`).eq(itemIndex).click();
    } else {
      cy.get(`${baseSelector}>${this.datepickerContainer} ${bodyView} td span`)
        .not('[class*="is-other-month"]')
        .contains(itemText).click();
    }
  }

  clickOnDaterangePickerTableItem(mode: string, pickerIndex = 0, baseSelector = 'body', itemIndex?: number, itemText?: string) {
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
        actualMonthArr = hiLocale.months;
        break;

      case 'gl' :
        actualMonthArr = glLocale.months;
        break;

      case 'mn' :
        actualMonthArr = mnLocale.months;
        break;

      default:
        actualMonthArr = undefined;
    }
    cy.get(`${baseSelector}>${pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} tbody td`)
      .eq(0).each((month, monthIndex) => {
      expect(month.text().toLowerCase()).to.contains(
        actualMonthArr ? actualMonthArr[monthIndex].toLowerCase() :
          new Date(2017, monthIndex)
            .toLocaleDateString(expectedLocale, { month: 'long' })
            .toLowerCase());
    });
  }

  isWeekdayLocaleAppropriate(expectedLocale: string, pickerType = 'datepicker', baseSelector = 'body') {
    cy.get(`${baseSelector}>${pickerType === 'datepicker' ? this.datepickerContainer : this.daterangepickerContainer} table`)
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
      cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody span`)
        .not('[class*="is-other-month"]')
        .contains(min.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isSaturdaySundayDisabled(disabled: boolean) {
    cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody tr`)
      .each(week => {
        cy.wrap(week)
          .find('td')
          .not('.week')
          .find('span')
          .first()
          .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
        cy.wrap(week)
          .find('td')
          .not('.week')
          .find('span')
          .last().should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
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
      cy.get(`body>${this.daterangepickerContainer} ${this.datepickerBodyDaysView}`).eq(0).find(`tbody span`)
        .not('[class*="is-other-month"]')
        .contains(min.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isDayIntervalDisabledInNextMonth(minDate: Date, maxDate: Date, disabled: boolean) {
    const maxOrigin = new Date(maxDate.getTime());
    const max = maxDate;
    for (max; minDate <= max && maxOrigin.getMonth() === max.getMonth(); max.setDate(max.getDate() - 1)) {
      cy.get(`body>${this.datepickerContainer} ${this.datepickerBodyDaysView} tbody span`)
        .not('[class*="is-other-month"]')
        .contains(max.getDate())
        .should(disabled ? 'have.class' : 'not.to.have.class', 'disabled');
    }
  }

  isDayIntervalDisabledInNextMonthDateRange(minDate: Date, maxDate: Date, disabled: boolean) {
    const maxOrigin = new Date(maxDate.getTime());
    const max = maxDate;
    for (max; minDate <= max && maxOrigin.getMonth() === max.getMonth(); max.setDate(max.getDate() - 1)) {
      cy.get(`body>${this.daterangepickerContainer} ${this.datepickerBodyDaysView}`).eq(1).find(`tbody span`)
        .not('[class*="is-other-month"]')
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
  isDatepickerPlacementCorrect(baseSelector: string, placement: string) {
    let index: number;
    const inputMarginHeight = 15;
    const inputMarginWidth = 27;
    cy.get(`body>${this.datepickerContainer}`).as('Datepicker');
    cy.get(`${baseSelector} input`).as('InputsArray');

    switch (placement) {
      case 'right':
        index = 0;
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
        index = 1;
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
        index = 2;
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
        index = 3;
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
}
