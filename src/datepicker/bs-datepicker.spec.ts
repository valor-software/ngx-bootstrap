import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild, Renderer2 } from '@angular/core';

import { BsDatepickerModule } from './bs-datepicker.module';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { CalendarCellViewModel, WeekViewModel } from './models';
import { dispatchKeyboardEvent, queryAll } from '@netbasal/spectator';
import { registerEscClick } from '../utils';

@Component({
  selector: 'test-cmp',
  template: `<input type="text" bsDatepicker [bsConfig]="bsConfig">`
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

function getDatepickerDirective(fixture: TestFixture): BsDatepickerDirective {
  const datepicker: BsDatepickerDirective = fixture.componentInstance.datepicker;

  return datepicker;
}

function showDatepicker(fixture: TestFixture): BsDatepickerDirective {
  const datepicker = getDatepickerDirective(fixture);
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
    async(() => TestBed.configureTestingModule({
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

  it('should display datepicker on show', () => {
    const datepicker = showDatepicker(fixture);
    expect(getDatepickerContainer(datepicker)).toBeDefined();
  });

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
    const weekSelection: WeekViewModel = { days: [
      { date: new Date(2019, 1 , 6), label: 'label' },
        { date: new Date(2019, 1, 7), label: 'label' },
        { date: new Date(2019, 1, 8), label: 'label' },
        { date: new Date(2019, 1, 9), label: 'label' },
        { date: new Date(2019, 1, 10), label: 'label' },
        { date: new Date(2019, 1, 11), label: 'label' },
        { date: new Date(2019, 1, 12), label: 'label' }
      ], isHovered: true};
    datepickerContainerInstance.weekHoverHandler(weekSelection);
    fixture.detectChanges();
    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        expect(view.date.getDate()).not.toEqual((weekSelection.days[0].date.getDate()));
      });
  });

  it('should hide on esc', async(() => {
    const datepicker = showDatepicker(fixture);
    const spy = spyOn(datepicker, 'hide');
    const renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as any);

    registerEscClick(renderer, {
      outsideEsc: true,
      target: fixture.nativeElement,
      hide: () => datepicker.hide()
    });

    dispatchKeyboardEvent(document, 'keyup', 'Escape');

    expect(spy).toHaveBeenCalled();
  }));

  it('should show the today button when showTodayButton config is true', () => {
    showDatepicker(fixture);
    const buttonText: string[] = [];
    queryAll('button').forEach(button => {
      buttonText.push(button.textContent);
    });
    expect(buttonText.filter(button => button === 'Today').length).toEqual(1);
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
        expect(view.date.getDay()).not.toEqual((new Date().getDay()), 'should start out not equal to today');
      }).unsubscribe();

    datepickerContainerInstance.setToday();
    fixture.detectChanges();

    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        expect(view.date.getDay()).toEqual((new Date().getDay()), 'should update to equal today');
      }).unsubscribe();
  });


  it('should clear date', () => {
    const datepicker = showDatepicker(fixture);
    const datepickerContainerInstance = getDatepickerContainer(datepicker);

    datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        view.date = new Date(2020, 0, 1);
      }).unsubscribe();

    fixture.detectChanges();
    datepickerContainerInstance.clearDate();
    fixture.whenStable().then(re=>{
      datepickerContainerInstance[`_store`]
      .select(state => state.view)
      .subscribe(view => {
        expect(view.date).toBe(undefined);
      }).unsubscribe();
    });
});
});
