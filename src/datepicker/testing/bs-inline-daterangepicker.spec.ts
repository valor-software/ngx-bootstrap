import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDaterangepickerInlineDirective } from '../bs-daterangepicker-inline.component';
import { BsDaterangepickerInlineConfig } from '../bs-daterangepicker-inline.config';
import { BsDaterangepickerContainerComponent } from '../themes/bs/bs-daterangepicker-container.component';
import { CalendarCellViewModel } from '../models';
import { take } from 'rxjs/operators';
import { getYearsCalendarInitialDate } from '../utils/bs-calendar-utils';
import { initialYearShift } from '../engine/format-years-calendar';

@Component({
    selector: 'test-cmp',
    template: `
    <bs-daterangepicker-inline [bsConfig]="bsConfig"></bs-daterangepicker-inline>`,
    standalone: false
})
class TestComponent {
  @ViewChild(BsDaterangepickerInlineDirective, { static: false }) datepicker: BsDaterangepickerInlineDirective;
  bsConfig: Partial<BsDaterangepickerInlineConfig> = {
    customTodayClass: 'custom-today-class'
  };
}

function getDaterangepickerInlineDirective(fixture: TestFixture): BsDaterangepickerInlineDirective {
  const datepicker: BsDaterangepickerInlineDirective = fixture.componentInstance.datepicker;

  return datepicker;
}


function getDatepickerInlineContainer(
  datepicker: BsDaterangepickerInlineDirective): BsDaterangepickerContainerComponent | null {
  return datepicker[`_datepickerRef`] ? datepicker[`_datepickerRef`].instance : null;
}

type TestFixture = ComponentFixture<TestComponent>;

describe('daterangepicker inline:', () => {
  let fixture: TestFixture;
  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        BsDatepickerModule,
        BrowserAnimationsModule
      ]
    }).compileComponents())
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should select correct year when a month other than selected year chosen', () => {
    const datepicker = getDaterangepickerInlineDirective(fixture);
    const datepickerContainerInstance = getDatepickerInlineContainer(datepicker);
    const yearSelection: CalendarCellViewModel = { date: new Date(2017, 1, 1), label: 'label' };
    const monthSelection: CalendarCellViewModel = { date: new Date(2018, 1, 1), label: 'label' };
    datepickerContainerInstance.yearSelectHandler(yearSelection);
    datepickerContainerInstance.monthSelectHandler(monthSelection);
    fixture.detectChanges();
    datepickerContainerInstance[`_store`]
      .select(state => state)
      .pipe(take(1))
      .subscribe(state => {
        const selectedYear = state.view.date.getFullYear();
        expect(selectedYear).toEqual(monthSelection.date.getFullYear());

        const firstDate = getYearsCalendarInitialDate(state);
        if (firstDate) {
          expect(firstDate.getFullYear()).toEqual(Number(selectedYear) + initialYearShift);
        }
      });
  });

  it('should update time when time is changed in timepicker', () => {
    const directive = getDaterangepickerInlineDirective(fixture);
    directive.bsConfig = {
      withTimepicker: true
    };
    const currentDate = new Date();
    const ranges = [
      {
        label: '',
        value: [currentDate, new Date(new Date().setDate(currentDate.getDate() + 7))]
      },
      {
        label: '',
        value: [new Date(new Date().setMinutes(currentDate.getMinutes() + 5)), new Date(new Date().setDate(currentDate.getDate() + 7))]
      }
    ];
    const datepickerContainerInstance = getDatepickerInlineContainer(directive);
    datepickerContainerInstance.setRangeOnCalendar(ranges[0]);

    fixture.detectChanges();
    datepickerContainerInstance.valueChange.emit(ranges[1].value);
    datepickerContainerInstance.chosenRange = ranges[1].value || [];
    datepickerContainerInstance.timeSelectHandler(ranges[1].value[0], 0);
    datepickerContainerInstance.timeSelectHandler(ranges[1].value[1], 1);
    fixture.detectChanges();

    datepickerContainerInstance[`_store`]
      .select(state => state.selectedTime)
      .subscribe(view => {
        expect(view[0].getMinutes()).toEqual(ranges[1].value[0].getMinutes());
        expect(view[1].getMinutes()).toEqual(ranges[1].value[1].getMinutes());
      });
  });
});
