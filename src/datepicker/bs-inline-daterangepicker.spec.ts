import { Component, ViewChild } from '@angular/core';
import {
    BsDaterangepickerInlineDirective, BsDaterangepickerInlineConfig, BsDatepickerModule
} from '.';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarCellViewModel } from './models';


@Component({
    selector: 'test-cmp',
    template: `<bs-daterangepicker-inline [bsConfig]="bsConfig"></bs-daterangepicker-inline>>`
})
class TestComponent {
    @ViewChild(BsDaterangepickerInlineDirective, { static: false }) daterangepicker: BsDaterangepickerInlineDirective;
    bsConfig: Partial<BsDaterangepickerInlineConfig> = {
        customTodayClass: 'custom-today-class'
    };
}

type TestFixture = ComponentFixture<TestComponent>;

function getDatepickerInlineDirective(fixture: TestFixture): BsDaterangepickerInlineDirective {
    const datepicker: BsDaterangepickerInlineDirective = fixture.componentInstance.daterangepicker;

    return datepicker;
}


// function getDatepickerInlineContainer(datepicker: BsDaterangepickerInlineDirective):
//     BsDaterangepickerInlineDirective | null {
//     return datepicker[`_datepickerRef`] ? datepicker[`_datepickerRef`].instance : null;
// }

describe('daterangepicker inline:', () => {
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

    // it('should select correct year when a month other than selected year is chosen', () => {
    //     const datepicker = getDatepickerInlineDirective(fixture);
    //     const datepickerContainerInstance = getDatepickerInlineContainer(datepicker);
    //     const yearSelection: CalendarCellViewModel = { date: new Date(2017, 1, 1), label: 'label' };
    //     const monthSelection: CalendarCellViewModel = { date: new Date(2018, 1, 1), label: 'label' };
    //     datepickerContainerInstance.yearSelectHandler(yearSelection);
    //     datepickerContainerInstance.monthSelectHandler(monthSelection);
    //     fixture.detectChanges();
    //     datepickerContainerInstance[`_store`]
    //         .select(state => state.view)
    //         .subscribe(view => {
    //             expect(view.date.getFullYear()).toEqual(monthSelection.date.getFullYear());
    //         });
    // });
});
