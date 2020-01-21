import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild, Renderer2 } from '@angular/core';

import { BsDatepickerModule } from './bs-datepicker.module';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { CalendarCellViewModel, WeekViewModel } from './models';
import { dispatchKeyboardEvent } from '@netbasal/spectator';
import { registerEscClick } from '../utils';

@Component({
  selector: 'test-cmp',
  template: `<input *ngIf="show" type="text" bsDatepicker [(bsValue)]="date" [bsConfig]="bsConfig">`
})
class TestComponent {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  bsConfig: Partial<BsDatepickerConfig> = {
    displayMonths: 2,
    selectWeek: true
  };
  show = true;
  date = new Date();
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

  it('should keep config in sync', async(() => {
    const datepicker = showDatepicker(fixture);
    const datepickerContainerInstance = getDatepickerContainer(datepicker);
    fixture.componentRef.instance.bsConfig = { dateInputFormat: 'DD/MM/YYYY' };
    const date = new Date(2019, 1, 24);
    const expectedResponse = '24/02/2019';

    showDatepicker(fixture);
    datepickerContainerInstance.valueChange.emit(date);
    let input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual(expectedResponse);

    fixture.componentRef.instance.show = false;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
    expect(input).toBeNull();

    fixture.componentRef.instance.show = true;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual(expectedResponse);
  }));
});
