import { Component, Renderer2, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchKeyboardEvent } from '@ngneat/spectator';
import { registerEscClick } from 'ngx-bootstrap/utils';
import { BsDatepickerDirective } from '../bs-datepicker.component';
import { BsDatepickerConfig } from '../bs-datepicker.config';
import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent, CalendarCellViewModel, WeekViewModel } from '../models';
import { BsDatepickerViewState } from '../reducer/bs-datepicker.state';
import { BsDatepickerContainerComponent } from '../themes/bs/bs-datepicker-container.component';

@Component({
  selector: 'test-cmp',
  template: `<input type='text'
                    bsDatepicker
                    [bsConfig]='bsConfig'>`
})
class TestComponent {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  bsConfig: Partial<BsDatepickerConfig> = {
    displayMonths: 2,
    selectWeek: true,
    showTodayButton: true
  };
}

type TestFixture = ComponentFixture<TestComponent>;

function getDatepickerDirective(fixture: TestFixture, date?: Date): BsDatepickerDirective {
  const datepicker = fixture.componentInstance.datepicker;

  if (date) {
    datepicker.bsValue = date;
    fixture.detectChanges();
  }

  return datepicker;
}

function showDatepicker(fixture: TestFixture, date?: Date): BsDatepickerDirective {
  const datepicker = getDatepickerDirective(fixture, date);
  datepicker.show();
  fixture.detectChanges();

  return datepicker;
}

function hideDatepicker(fixture: TestFixture): BsDatepickerDirective {
  const datepicker = getDatepickerDirective(fixture);
  datepicker.hide();
  fixture.detectChanges();

  return datepicker;
}

function getDatepickerContainer(datepicker: BsDatepickerDirective): BsDatepickerContainerComponent | null {
  return datepicker[`_datepickerRef`] ? datepicker[`_datepickerRef`].instance : null;
}

describe('datepicker:', () => {
  let fixture: TestFixture;
  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents()
    ));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should display datepicker on show', fakeAsync(() => {
    const datepicker = showDatepicker(fixture);
    tick(10);
    expect(getDatepickerContainer(datepicker)).toBeDefined();
  }));

  it('should hide datepicker on hide', () => {
    const datepicker = hideDatepicker(fixture);
    expect(getDatepickerContainer(datepicker)).toBeNull();
  });

  it('should select correct year when a month other than selected year is chosen', () => {
    const datepicker = showDatepicker(fixture);
    const datepickerContainerInstance = getDatepickerContainer(datepicker);
    const yearSelection: CalendarCellViewModel = { date: new Date(2017, 1, 1), label: 'label' };
    const monthSelection: CalendarCellViewModel = { date: new Date(2018, 1, 1), label: 'label' };
    datepickerContainerInstance.yearSelectHandler(yearSelection);
    datepickerContainerInstance.monthSelectHandler(monthSelection);
    fixture.detectChanges();
    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        expect(view.date.getFullYear()).toEqual(monthSelection.date.getFullYear());
      });
  });

  it('should select a week, when selectWeek flag is true', () => {
    const datepicker = showDatepicker(fixture);
    const datepickerContainerInstance = getDatepickerContainer(datepicker);
    datepickerContainerInstance.setViewMode('day');
    const weekSelection: WeekViewModel = {
      days: [
        { date: new Date(2019, 1, 6), label: 'label' },
        { date: new Date(2019, 1, 7), label: 'label' },
        { date: new Date(2019, 1, 8), label: 'label' },
        { date: new Date(2019, 1, 9), label: 'label' },
        { date: new Date(2019, 1, 10), label: 'label' },
        { date: new Date(2019, 1, 11), label: 'label' },
        { date: new Date(2019, 1, 12), label: 'label' }
      ], isHovered: true
    };
    datepickerContainerInstance.weekHoverHandler(weekSelection);
    fixture.detectChanges();
    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        const currentDate = `${view.date.getDate()}${view.date.getFullYear()}`;
        const oldDate = `${weekSelection.days[0].date.getDate()}${weekSelection.days[0].date.getFullYear()}`;
        expect(currentDate).not.toEqual(oldDate);
      });
  });

  it('should hide on esc', waitForAsync(() => {
    const datepicker = showDatepicker(fixture);
    const spy = jest.spyOn(datepicker, 'hide');
    const renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);

    registerEscClick(renderer, {
      outsideEsc: true,
      target: fixture.nativeElement,
      hide: () => datepicker.hide()
    });

    dispatchKeyboardEvent(document, 'keyup', 'Escape');

    expect(spy).toHaveBeenCalled();
  }));

  it('should show the today button when showTodayButton config is true', fakeAsync(() => {
    showDatepicker(fixture);
    tick();
    fixture.whenStable().then(() => {
      const buttonText: string[] = [];
      Array.from(document.body.getElementsByTagName('button'))
        .forEach(button => buttonText.push(button.textContent));
      expect(buttonText.filter(button => button === 'Today').length).toEqual(1);
    });
    expect(true).toBeTruthy();
  }));

  it('should show custom label for today button if set in config', () => {
    const todayBtnCustomLbl = 'Select today';
    const datepickerDirective = getDatepickerDirective(fixture);
    datepickerDirective.bsConfig = {
      todayButtonLabel: todayBtnCustomLbl,
      showTodayButton: true
    };
    showDatepicker(fixture);

    const buttonText: string[] = [];
    Array.from(document.body.getElementsByTagName('button'))
      .forEach(button => buttonText.push(button.textContent));
    expect(buttonText.filter(button => button === todayBtnCustomLbl).length).toEqual(1);
  });

  it('should show custom label for clear button if set in config', () => {
    const clearBtnCustomLbl = 'Clear current';
    const datepickerDirective = getDatepickerDirective(fixture);
    datepickerDirective.bsConfig = {
      clearButtonLabel: clearBtnCustomLbl,
      showClearButton: true
    };
    showDatepicker(fixture);

    const buttonText: string[] = [];
    // fixture.debugElement.queryAll(By.css('button'))
    Array.from(document.body.getElementsByTagName('button'))
      .forEach(button => buttonText.push(button.textContent));
    expect(buttonText.filter(button => button === clearBtnCustomLbl).length).toEqual(1);
  });

  describe('should start with', () => {

    const parameters = [
      {
        description: 'year view if set in config',
        startView: 'year',
        expectedVisibleContainer: ['bs-years-calendar-view'],
        expectedInvisibleContainer: ['bs-month-calendar-view', 'bs-days-calendar-view'],
        expectedViewMode: 'year'
      },
      {
        description: 'month view if set in config',
        startView: 'month',
        expectedVisibleContainer: ['bs-month-calendar-view'],
        expectedInvisibleContainer: ['bs-years-calendar-view', 'bs-days-calendar-view'],
        expectedViewMode: 'month'
      },
      {
        description: 'day view if set in config',
        startView: 'day',
        expectedVisibleContainer: ['bs-days-calendar-view'],
        expectedInvisibleContainer: ['bs-years-calendar-view', 'bs-month-calendar-view'],
        expectedViewMode: 'day'
      }
    ];

    parameters.forEach(parameter => {
      it(parameter.description, done => {
        const datepickerDirective = getDatepickerDirective(fixture);
        datepickerDirective.bsConfig = {
          startView: parameter.startView as BsDatepickerViewMode
        };

        const bsDatepickerDirective = showDatepicker(fixture);
        const datepickerContainerInstance = getDatepickerContainer(bsDatepickerDirective);

        parameter.expectedVisibleContainer.forEach(container => {
          expect(datepickerContainerInstance[`_element`].nativeElement.querySelectorAll(container)[0]).toBeTruthy();
        });
        parameter.expectedInvisibleContainer.forEach(container => {
          expect(datepickerContainerInstance[`_element`].nativeElement.querySelectorAll(container)[0]).toBeFalsy();
        });
        datepickerContainerInstance.viewMode.subscribe(res => {
          expect(res).toBe(parameter.expectedViewMode);
          done();
        });
      });
    });
  });

  it('should set today date', () => {
    const datepicker = showDatepicker(fixture);
    const datepickerContainerInstance = getDatepickerContainer(datepicker);

    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        view.date = new Date(2020, 0, 1);
      }).unsubscribe();
    fixture.detectChanges();

    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        expect(`${(view.date.getDate())}-${(view.date.getMonth())}-${(view.date.getFullYear())}`)
          .not.toEqual(`${(new Date().getDate())}-${(new Date().getMonth())}-${(new Date().getFullYear())}`);
      }).unsubscribe();

    datepickerContainerInstance.setToday();
    fixture.detectChanges();

    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        expect(`${(view.date.getDate())}-${(view.date.getMonth())}-${(view.date.getFullYear())}`)
          .toEqual(`${(new Date().getDate())}-${(new Date().getMonth())}-${(new Date().getFullYear())}`);
      }).unsubscribe();
  });

  it('should clear date', () => {
    const datepicker = showDatepicker(fixture);
    const datepickerContainerInstance = getDatepickerContainer(datepicker);
    datepickerContainerInstance.clearDate();
    fixture.detectChanges();
    datepickerContainerInstance[`_store`]
      .select(state => state.selectedDate)
      .subscribe(date => {
        expect(date).toBe(undefined);
      }).unsubscribe();
  });

  it('should display one timepicker when withTimepicker is true', () => {
    const datepickerDirective = getDatepickerDirective(fixture);
    datepickerDirective.bsConfig = {
      withTimepicker: true
    };
    showDatepicker(fixture);
    const timepickerZone = document.querySelector('.bs-timepicker-in-datepicker-container');
    const timepickers = document.querySelectorAll('timepicker');
    expect(timepickerZone).toBeTruthy();
    expect(timepickers.length).toEqual(1);
  });

  it('should not display timepicker when withTimepicker is true', () => {
    const datepickerDirective = getDatepickerDirective(fixture);
    datepickerDirective.bsConfig = {
      withTimepicker: false
    };
    showDatepicker(fixture);
    const timepickerZone = document.querySelector('.bs-timepicker-in-datepicker-container');
    expect(timepickerZone).not.toBeTruthy();
  });

  describe('should emit bsViewChange', () => {
    const initialDate = new Date(2022, 0, 1);
    const parameters: { description: string, navigationEvent: BsNavigationEvent, expectedEmit: BsDatepickerViewState }[] = [
      {
        description: 'when user navigates one month upwards',
        navigationEvent: { step: { month: 1 }, direction: BsNavigationDirection.UP },
        expectedEmit: { date: new Date(2022, 1, 1), mode: 'day' }
      },
      {
        description: 'when user navigates one month downwards',
        navigationEvent: { step: { month: -1 }, direction: BsNavigationDirection.DOWN },
        // navigating down one month from january 2022 should result in december 2021
        expectedEmit: { date: new Date(2021, 11, 1), mode: 'day' }
      },
      {
        description: 'when user navigates one year upwards',
        navigationEvent: { step: { year: 1 }, direction: BsNavigationDirection.UP },
        expectedEmit: { date: new Date(2023, 0, 1), mode: 'day' }
      },
      {
        description: 'when user navigates one year downwards',
        navigationEvent: { step: { year: -1 }, direction: BsNavigationDirection.DOWN },
        expectedEmit: { date: new Date(2021, 0, 1), mode: 'day' }
      }
    ];

    parameters.forEach(parameter => {
      it(parameter.description, () => {
        const datepicker = showDatepicker(fixture, initialDate);
        const datepickerContainerInstance = getDatepickerContainer(datepicker);
        const spy = jest.spyOn(datepicker.bsViewChange, 'emit');

        datepickerContainerInstance.navigateTo(parameter.navigationEvent);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(parameter.expectedEmit);
      });
    });
  });

  it('should emit bsViewChange when user changes the viewmode inside the datepicker', () => {
    const datepicker = showDatepicker(fixture, new Date(2022, 0, 1));
    const datepickerContainerInstance = getDatepickerContainer(datepicker);
    const spy = jest.spyOn(datepicker.bsViewChange, 'emit');

    datepickerContainerInstance.setViewMode('month');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
