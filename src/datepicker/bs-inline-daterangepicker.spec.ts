import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from './bs-datepicker.module';
import { BsDaterangepickerInlineDirective } from './bs-daterangepicker-inline.component';
import { BsDaterangepickerInlineConfig } from './bs-daterangepicker-inline.config';

@Component({
    selector: 'test-cmp',
    template: `<bs-daterangepicker-inline [bsConfig]="bsConfig"></bs-daterangepicker-inline>`
})
class TestComponent {
    @ViewChild(BsDaterangepickerInlineDirective, { static: false }) daterangepicker: BsDaterangepickerInlineDirective;
    bsConfig: Partial<BsDaterangepickerInlineConfig> = {
        customTodayClass: 'custom-today-class'
    };
}

type TestFixture = ComponentFixture<TestComponent>;

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
});
