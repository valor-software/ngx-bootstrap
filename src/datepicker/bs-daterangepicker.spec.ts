import { Component, ViewChild } from '@angular/core';
import { BsDaterangepickerDirective } from './bs-daterangepicker.component';
import { BsDatepickerModule } from './bs-datepicker.module';
import { BsDaterangepickerConfig } from './bs-daterangepicker.config';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BsCustomDates } from './themes/bs/bs-custom-dates-view.component';


@Component({
    selector: 'test-cmp',
    template: `<input type="text"
    bsDaterangepicker
    [bsConfig]="bsConfig">`
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


    it('should display daterangepicker on show', () => {
        const datepicker = showDatepicker(fixture);
        expect(getDaterangepickerContainer(datepicker)).toBeDefined();
    });

    it('should hide daterangepicker on hide', () => {
        const datepicker = hideDatepicker(fixture);
        expect(getDaterangepickerContainer(datepicker)).toBeNull();
    });

    it('should display correct date range in input when selected from ranges', () => {
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

        expect(rangesButton.childElementCount).toEqual(ranges.length + 1); // +1 for `custom range` button

    });

    it('should display correct date range in input when selected from ranges', () => {
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
            });
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

    it('should highlight the Custom Range button when dates selected are not in ranges', () => {
        const datepicker = showDatepicker(fixture);
        const customRangeBtnLbl = 'My Custom Range';
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
        const selectedRange: BsCustomDates = {
            label: 'Next 7 days',
            value: [new Date('12-14-2019'), new Date('12-25-2019')]
        };

        const daterangepickerInput = fixture.debugElement.query(By.css('input[bsDaterangepicker]'));
        fixture.componentInstance.daterangepicker.bsConfig.ranges = ranges;
        fixture.componentInstance.daterangepicker.bsConfig.customRangeButtonLabel = customRangeBtnLbl;
        const datepickerContainerInstance = getDaterangepickerContainer(datepicker);
        datepickerContainerInstance.setRangeOnCalendar(selectedRange);
        daterangepickerInput.nativeElement.click();

        fixture.detectChanges();
        // only one active element should be present
        const activeRangeButton = document.querySelectorAll('.bs-datepicker-predefined-btns button.selected');

        expect(activeRangeButton).toBeTruthy();
        expect(activeRangeButton.length).toEqual(1);
        expect(activeRangeButton[0].innerHTML.trim()).toEqual(customRangeBtnLbl);
    });
});
