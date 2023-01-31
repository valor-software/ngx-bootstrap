import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDaterangepickerInputDirective } from '../bs-daterangepicker-input.directive';

@Component({
  selector: 'test-cmp',
  template: `<input type="text"
                    bsDaterangepicker>`
})
class TestComponent {
  @ViewChild(BsDaterangepickerInputDirective, { static: false }) daterangepicker: BsDaterangepickerInputDirective;
}

const minDate = new Date('2023-01-01T12:36:16');
const maxDate = new Date('2023-01-31T12:36:16');
const outOfRangeDates = [new Date('2022-12-01T12:36:16'), new Date('2024-02-02T12:36:16')];

describe('daterangepicker input:', () => {
  let fixture: ComponentFixture<TestComponent>;
  let datepickerDirective: BsDaterangepickerInputDirective;
  let input: DebugElement;
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
    datepickerDirective = fixture.componentInstance.daterangepicker;
    datepickerDirective['_picker'].minDate = minDate;
    datepickerDirective['_picker'].maxDate = maxDate;
    input = fixture.debugElement.query(By.css('input[bsDaterangepicker]'));
  });

  it('should overwrite the date if overwriteInvalidDate is true', () => {
    datepickerDirective['_picker']._config.overwriteInvalidDate = true;
    jest.spyOn(datepickerDirective, 'writeValue');

    datepickerDirective._setInputValue(outOfRangeDates);
    datepickerDirective.validate(new FormControl(outOfRangeDates));
    fixture.detectChanges();
    expect(datepickerDirective.writeValue).toHaveBeenCalledWith([minDate, maxDate]);
    // should overwrite the date to be the minDate
    expect(input.nativeElement.value).toEqual('01/01/2023 - 01/31/2023');
  });

  it('should not overwrite the date if overwriteInvalidDate is set to false', () => {
    datepickerDirective['_picker']._config.overwriteInvalidDate = false;
    jest.spyOn(datepickerDirective, 'writeValue');

    datepickerDirective._setInputValue(outOfRangeDates);
    datepickerDirective.validate(new FormControl(outOfRangeDates));
    fixture.detectChanges();
    expect(datepickerDirective.writeValue).not.toHaveBeenCalled();
    expect(input.nativeElement.value).toEqual('12/01/2022 - 02/02/2024');
  });
});
