import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerInputDirective } from '../bs-datepicker-input.directive';

import { BsDatepickerModule } from '../bs-datepicker.module';

@Component({
  selector: 'test-cmp',
  template: `<input type='text'
                    bsDatepicker>`
})
class TestComponent {
  @ViewChild(BsDatepickerInputDirective, { static: false }) datepicker: BsDatepickerInputDirective;
}

const minDate = new Date('2023-01-01T12:36:16');
const maxDate = new Date('2023-01-31T12:36:16');
const beforeMinDate = new Date('2022-12-01T12:36:16');
const afterMaxDate = new Date('2024-02-02T12:36:16');

describe('datepicker input:', () => {
  let fixture: ComponentFixture<TestComponent>;
  let datepickerDirective: BsDatepickerInputDirective;
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
    datepickerDirective = fixture.componentInstance.datepicker;
    datepickerDirective['_picker'].minDate = minDate;
    datepickerDirective['_picker'].maxDate = maxDate;
    input = fixture.debugElement.query(By.css('input[bsDatepicker]'));
  });

  it('should overwrite the date if overwriteInvalidDate is true', () => {
    datepickerDirective['_picker']._config.overwriteInvalidDate = true;
    jest.spyOn(datepickerDirective, 'writeValue');

    datepickerDirective._setInputValue(beforeMinDate);
    datepickerDirective.validate(new FormControl(beforeMinDate));
    fixture.detectChanges();
    expect(datepickerDirective.writeValue).toHaveBeenCalledWith(minDate);
    // should overwrite the date to be the minDate
    expect(input.nativeElement.value).toEqual('01/01/2023');

    datepickerDirective._setInputValue(afterMaxDate);
    datepickerDirective.validate(new FormControl(afterMaxDate));
    fixture.detectChanges();
    expect(datepickerDirective.writeValue).toHaveBeenCalledWith(maxDate);
    // should overwrite the date to be the maxDate
    expect(input.nativeElement.value).toEqual('01/31/2023');
  });

  it('should not overwrite the date if overwriteInvalidDate is set to false', () => {
    datepickerDirective['_picker']._config.overwriteInvalidDate = false;
    jest.spyOn(datepickerDirective, 'writeValue');

    datepickerDirective._setInputValue(beforeMinDate);
    datepickerDirective.validate(new FormControl(beforeMinDate));
    fixture.detectChanges();
    expect(datepickerDirective.writeValue).not.toHaveBeenCalled();
    expect(input.nativeElement.value).toEqual('12/01/2022');

    datepickerDirective._setInputValue(afterMaxDate);
    datepickerDirective.validate(new FormControl(afterMaxDate));
    fixture.detectChanges();
    expect(datepickerDirective.writeValue).not.toHaveBeenCalled();
    expect(input.nativeElement.value).toEqual('02/02/2024');
  });
});
