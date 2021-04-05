import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild } from '@angular/core';

import { take } from 'rxjs/operators';

import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDatepickerInlineDirective } from '../bs-datepicker-inline.component';
import { BsDatepickerInlineConfig } from '../bs-datepicker-inline.config';
import { BsDatepickerContainerComponent } from '../themes/bs/bs-datepicker-container.component';

import { CalendarCellViewModel } from '../models';
import { getYearsCalendarInitialDate } from '../utils/bs-calendar-utils';

@Component({
  selector: 'test-cmp',
  template: `<bs-datepicker-inline [bsConfig]="bsConfig"></bs-datepicker-inline>>`
})
class TestComponent {
  @ViewChild(BsDatepickerInlineDirective, { static: false }) datepicker: BsDatepickerInlineDirective;
  bsConfig: Partial<BsDatepickerInlineConfig> = {
    customTodayClass: 'custom-today-class',
    minMode: 'year'
  };
}

type TestFixture = ComponentFixture<TestComponent>;

function getDatepickerInlineDirective(fixture: TestFixture): BsDatepickerInlineDirective {
  return  fixture.componentInstance.datepicker;
}

function getDatepickerInlineContainer(datepicker: BsDatepickerInlineDirective): BsDatepickerContainerComponent | null {
  return datepicker[`_datepickerRef`] ? datepicker[`_datepickerRef`].instance : null;
}

xdescribe('datepicker inline minMode="year":', () => {
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

  it('should not reorder years when the first year is selected', () => {
    const datepicker = getDatepickerInlineDirective(fixture);
    const datepickerContainerInstance = getDatepickerInlineContainer(datepicker);

    datepickerContainerInstance[`_store`]
      .select(state => state)
      .pipe(take(1))
      .subscribe(initialState => {
        const initialFirstDate = getYearsCalendarInitialDate(initialState);
        const initialFirstYear = initialFirstDate && initialFirstDate.getFullYear();

        const yearSelection: CalendarCellViewModel = { date: new Date(initialFirstYear, 1, 1), label: 'label' };
        datepickerContainerInstance.yearSelectHandler(yearSelection);
        fixture.detectChanges();
        datepickerContainerInstance[`_store`]
          .select(state => state)
          .pipe(take(1))
          .subscribe(state => {
            const selectedYear = state.view.date.getFullYear();
            expect(selectedYear).toEqual(initialFirstYear);

            const firstDate = getYearsCalendarInitialDate(state);
            const firstYear = firstDate && firstDate.getFullYear();
            expect(firstYear).toEqual(initialFirstYear);
          });
      });
  });
});
