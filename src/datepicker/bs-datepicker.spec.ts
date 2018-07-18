import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BsDatepickerConfig, BsDatepickerDirective, BsDatepickerModule } from '.';
import { CalendarCellViewModel } from './models';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';

@Component({
    selector: 'test-cmp',
    template: `<input type="text" bsDatepicker [bsConfig]="bsConfig">`
})
class TestComponent {
    @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
    bsConfig: Partial<BsDatepickerConfig> = {
        displayMonths: 2
    };
}

type TestFixture = ComponentFixture<TestComponent>;

function getDatepickerContainer(fixture: TestFixture): BsDatepickerContainerComponent {
    const datepickerInstance: BsDatepickerDirective = fixture.componentInstance.datepicker;
    datepickerInstance.show();
    fixture.detectChanges();

    // tslint:disable-next-line:no-string-literal
    return datepickerInstance['_datepickerRef'].instance;
}

describe('datepicker:', () => {
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
        const datepickerContainerInstance = getDatepickerContainer(fixture);
        const yearSelection: CalendarCellViewModel = { date: new Date(2017, 1, 1), label: 'label' };
        const monthSelection: CalendarCellViewModel = { date: new Date(2018, 1, 1), label: 'label' };
        datepickerContainerInstance.yearSelectHandler(yearSelection);
        datepickerContainerInstance.monthSelectHandler(monthSelection);
        fixture.detectChanges();
        // tslint:disable-next-line:no-string-literal
        datepickerContainerInstance['_store']
            .select(state => state.view)
            .subscribe(view => {
                expect(view.date.getFullYear()).toEqual(monthSelection.date.getFullYear());
            });
    });
});
