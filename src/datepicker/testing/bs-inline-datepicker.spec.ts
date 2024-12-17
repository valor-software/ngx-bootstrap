import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild } from '@angular/core';

import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDatepickerInlineDirective } from '../bs-datepicker-inline.component';
import { BsDatepickerInlineConfig } from '../bs-datepicker-inline.config';
import { BsDatepickerContainerComponent } from '../themes/bs/bs-datepicker-container.component';
import { CalendarCellViewModel } from '../models';
import { initialYearShift } from '../engine/format-years-calendar';
import { take } from 'rxjs/operators';
import { getYearsCalendarInitialDate } from '../utils/bs-calendar-utils';

@Component({
    selector: 'test-cmp',
    template: `<bs-datepicker-inline [bsConfig]="bsConfig"></bs-datepicker-inline>`,
    standalone: false
})
class TestComponent {
  @ViewChild(BsDatepickerInlineDirective, { static: false }) datepicker: BsDatepickerInlineDirective;
  bsConfig: Partial<BsDatepickerInlineConfig> = {
    customTodayClass: 'custom-today-class'
  };
}

type TestFixture = ComponentFixture<TestComponent>;

function getDatepickerInlineDirective(fixture: TestFixture): BsDatepickerInlineDirective {
  const datepicker: BsDatepickerInlineDirective = fixture.componentInstance.datepicker;

  return datepicker;
}


function getDatepickerInlineContainer(datepicker: BsDatepickerInlineDirective): BsDatepickerContainerComponent | null {
  return datepicker[`_datepickerRef`] ? datepicker[`_datepickerRef`].instance : null;
}

describe('datepicker inline:', () => {
  let fixture: TestFixture;
  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        BsDatepickerModule,
        BrowserAnimationsModule
      ]}).compileComponents())
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

    it('should select correct year when a month other than selected year is chosen', () => {
      const datepicker = getDatepickerInlineDirective(fixture);
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

    it('should display one timepicker when withTimepicker is true', () => {
      const datepicker = getDatepickerInlineDirective(fixture);
      const datepickerContainerInstance = getDatepickerInlineContainer(datepicker);
      datepicker.bsConfig = {
        withTimepicker: true
      };
      const currentDate = new Date();
      const updatedDate = new Date(new Date().setMinutes(currentDate.getMinutes() + 5));
      datepicker.bsValue = currentDate;
      datepickerContainerInstance.timeSelectHandler(currentDate, 0);
      fixture.detectChanges();
      datepicker.bsValue = updatedDate;
      datepickerContainerInstance.timeSelectHandler(updatedDate, 0);
      fixture.detectChanges();

      datepickerContainerInstance[`_store`]
        .select(state => state.selectedTime)
        .subscribe(value => {
          expect(value[0].getMinutes()).toEqual(updatedDate.getMinutes());
        });
    });

  });
