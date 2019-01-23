import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsDatepickerInlineConfig, BsDatepickerInlineDirective, BsDatepickerModule } from '.';
import { CalendarCellViewModel } from './models';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';

@Component({
  selector: 'test-cmp',
  template: `<bs-datepicker-inline [bsConfig]="bsConfig"></bs-datepicker-inline>>`
})
class TestComponent {
  @ViewChild(BsDatepickerInlineDirective) datepicker: BsDatepickerInlineDirective;
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
    async(() => TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [BsDatepickerModule.forRoot()]
    }).compileComponents()
    ));
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
      .select(state => state.view)
      .subscribe(view => {
        expect(view.date.getFullYear()).toEqual(monthSelection.date.getFullYear());
      });
  });
});
