import { Component, ViewChild } from '@angular/core';
import { BsDaterangepickerDirective } from '../bs-daterangepicker.component';
import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDaterangepickerConfig } from '../bs-daterangepicker.config';
import { BsDaterangepickerContainerComponent } from '../themes/bs/bs-daterangepicker-container.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'test-cmp',
    template: `<input type="text"
    bsDaterangepicker
    [bsConfig]="bsConfig">`,
    standalone: false
})
class TestComponent {
    @ViewChild(BsDaterangepickerDirective, { static: false }) daterangepicker: BsDaterangepickerDirective;
    bsConfig: Partial<BsDaterangepickerConfig> = {
        customTodayClass: 'custom-today-class'
    };
}

type TestFixture = ComponentFixture<TestComponent>;
function getDaterangepickerDirective(fixture: TestFixture): BsDaterangepickerDirective {
    const daterangepicker: BsDaterangepickerDirective = fixture.componentInstance.daterangepicker;

    return daterangepicker;
}

function showDatepicker(fixture: TestFixture): BsDaterangepickerDirective {
    const daterangepicker = getDaterangepickerDirective(fixture);
    daterangepicker.show();
    fixture.detectChanges();

    return daterangepicker;
}

function hideDatepicker(fixture: TestFixture): BsDaterangepickerDirective {
    const daterangepicker = getDaterangepickerDirective(fixture);
    daterangepicker.hide();
    fixture.detectChanges();

    return daterangepicker;
}

function getDaterangepickerContainer(daterangepicker: BsDaterangepickerDirective):
    BsDaterangepickerContainerComponent | null {
    return daterangepicker[`_datepickerRef`] ? daterangepicker[`_datepickerRef`].instance : null;
}

describe('daterangepicker:', () => {
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

  it('should display timepicker when withTimepicker is true', () => {
    const directive = getDaterangepickerDirective(fixture);
    directive.bsConfig = {
      withTimepicker: true
    };
    showDatepicker(fixture);
    const timepickerZone = document.querySelector('.bs-timepicker-in-datepicker-container');
    const timepickers = document.querySelectorAll('timepicker');
    expect(timepickerZone).toBeTruthy();
    expect(timepickers.length).toEqual(2);
  });

  it('should hide timepicker when withTimepicker is false', () => {
    const directive = getDaterangepickerDirective(fixture);
    directive.bsConfig = {
      withTimepicker: false
    };
    showDatepicker(fixture);
    const timepickerZone = document.querySelector('.bs-timepicker-in-datepicker-container');
    expect(timepickerZone).not.toBeTruthy();
  });

  it('should update time when time is changed in timepicker', (done) => {
    const directive = getDaterangepickerDirective(fixture);
    directive.bsConfig = {
      withTimepicker: true
    };
    const datepicker = showDatepicker(fixture);
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
    const datepickerContainerInstance = getDaterangepickerContainer(datepicker);
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
        done();
      });
  });

  it('should hide only if properties withtimepicker and keepDatepickerOpened are set to true and only time is changed. Properties are true', () => {
    const directive = getDaterangepickerDirective(fixture);
    const datepicker = showDatepicker(fixture);
    directive.bsConfig = {
      withTimepicker: true,
      keepDatepickerOpened: true
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
      },
      {
        label: '',
        value: [new Date(new Date().setMinutes(currentDate.getMinutes() + 5)), new Date(new Date().setMinutes(currentDate.getMinutes() + 1))]
      }
    ];

    //datepicker shouldn't close, because needed properties are true and only was changed
    const datepickerRef = document.querySelector('bs-daterangepicker-container');
    const datepickerContainerInstance = getDaterangepickerContainer(datepicker);
    datepickerContainerInstance.setRangeOnCalendar(ranges[0]);
    datepickerContainerInstance.valueChange.emit(ranges[0].value);
    datepickerContainerInstance.chosenRange = ranges[0].value || [];
    fixture.detectChanges();
    expect(datepickerRef).not.toBeNull();

    //datepicker shouldn't close, because needed properties are true and only was changed
    const datepicker2 = showDatepicker(fixture);
    const datepickerContainerInstance2 = getDaterangepickerContainer(datepicker2);
    datepickerContainerInstance2.setRangeOnCalendar(ranges[1]);
    datepickerContainerInstance2.valueChange.emit(ranges[1].value);
    datepickerContainerInstance2.chosenRange = ranges[1].value || [];
    fixture.detectChanges();
    const datepickerRef2 = document.querySelector('bs-daterangepicker-container');
    expect(datepickerRef2).not.toBeNull();

    //datepicker should close, because needed properties are true but date was changed
    const datepicker3 = showDatepicker(fixture);
    const datepickerContainerInstance3 = getDaterangepickerContainer(datepicker3);
    datepickerContainerInstance3.setRangeOnCalendar(ranges[2]);
    datepickerContainerInstance3.valueChange.emit(ranges[2].value);
    datepickerContainerInstance3.chosenRange = ranges[2].value || [];
    fixture.detectChanges();
    const datepickerRef3 = document.querySelector('bs-daterangepicker-container');
    expect(datepickerRef3).toBeNull();
  });

  it('should display daterangepicker on show', () => {
        const datepicker = showDatepicker(fixture);
        expect(getDaterangepickerContainer(datepicker)).toBeDefined();
    });

    it('should hide daterangepicker on hide', () => {
        const datepicker = hideDatepicker(fixture);
        expect(getDaterangepickerContainer(datepicker)).toBeNull();
    });

    it('should display correct date range in input when selected from ranges', (done) => {
        const datepicker = showDatepicker(fixture);
        const ranges = [
            {
                label: 'Last 7 days',
                value: [new Date('12-10-2019'), new Date('12-16-2019')]
            },
            {
                label: 'Next 7 days',
                value: [new Date('12-16-2019'), new Date('12-22-2019')]
            }
        ];
        datepicker.bsConfig.ranges = ranges;
        const datepickerContainerInstance = getDaterangepickerContainer(datepicker);
        datepickerContainerInstance.setRangeOnCalendar(ranges[0]);

        fixture.detectChanges();

        datepickerContainerInstance[`_store`]
            .select(state => state.selectedRange)
            .subscribe(view => {
                expect(view).toEqual(ranges[0].value);
                done();
            });
    });

    it('should display correct number of ranges button', () => {

        const ranges = [
            {
                label: 'Last 7 days',
                value: [new Date('12-10-2019'), new Date('12-16-2019')]
            },
            {
                label: 'Next 7 days',
                value: [new Date('12-16-2019'), new Date('12-22-2019')]
            }
        ];
        const daterangepickerInput = fixture.debugElement.query(By.css('input[bsDaterangepicker]'));
        fixture.componentInstance.daterangepicker.bsConfig.ranges = ranges;
        daterangepickerInput.nativeElement.click();

        fixture.detectChanges();

        const rangesButton = document.querySelector('.bs-datepicker-predefined-btns');
        expect(rangesButton.childElementCount).toEqual(ranges.length);
    });

    it('should correctly display the selected range button with active custom class', () => {
        const datepicker = showDatepicker(fixture);

        const ranges = [
            {
                label: 'Last 7 days',
                value: [new Date('12-10-2019'), new Date('12-16-2019')]
            },
            {
                label: 'Next 7 days',
                value: [new Date('12-16-2019'), new Date('12-22-2019')]
            }
        ];
        const daterangepickerInput = fixture.debugElement.query(By.css('input[bsDaterangepicker]'));
        fixture.componentInstance.daterangepicker.bsConfig.ranges = ranges;
        const datepickerContainerInstance = getDaterangepickerContainer(datepicker);
        datepickerContainerInstance.setRangeOnCalendar(ranges[0]);

        daterangepickerInput.nativeElement.click();

        fixture.detectChanges();
        // only one active element should be present
        const activeRangeButton = document.querySelectorAll('.bs-datepicker-predefined-btns button.selected');

        expect(activeRangeButton).toBeTruthy();
        expect(activeRangeButton.length).toEqual(1);
        expect(activeRangeButton[0].innerHTML.trim()).toEqual(ranges[0].label);
    });

  it('should not allow to select date behind max value', async () => {
    const datepicker = showDatepicker(fixture);
    datepicker.bsConfig.maxDate = new Date();
    datepicker.bsConfig.maxDateRange = 10;

    const datepickerContainerInstance = getDaterangepickerContainer(datepicker);

    const correctDateStart = new Date(new Date().setDate(new Date().getDate() - 14));
    const correctDateEnd = new Date(new Date().setDate(new Date().getDate() - 7));
    const selectedRange: BsCustomDates = {
      label: '',
      value: [correctDateStart, correctDateEnd]
    };

    datepickerContainerInstance.setMaxDateRangeOnCalendar(correctDateEnd);
    datepickerContainerInstance.setRangeOnCalendar(selectedRange);
    fixture.detectChanges();

    let view = await firstValueFrom(datepickerContainerInstance[`_store`].select((state) => state));
    expect(view.maxDate).toEqual(correctDateEnd);

    const incorrectCaseStart = new Date(new Date().setDate(new Date().getDate() - 5));
    const incorrectCaseEnd = new Date(new Date().setDate(new Date().getDate() + 15));
    const selectedRange1: BsCustomDates = {
      label: '',
      value: [incorrectCaseStart, incorrectCaseEnd]
    };

    datepickerContainerInstance.setMaxDateRangeOnCalendar(incorrectCaseStart);
    datepickerContainerInstance.setRangeOnCalendar(selectedRange1);
    fixture.detectChanges();

    view = await firstValueFrom(datepickerContainerInstance[`_store`].select((state) => state));
    expect(view.maxDate).not.toEqual(incorrectCaseEnd);
  });
});
