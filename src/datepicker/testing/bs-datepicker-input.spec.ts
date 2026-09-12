import { ChangeDetectionStrategy, Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';

import { BsDatepickerDirective } from '../bs-datepicker.component';
import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDaterangepickerDirective } from '../bs-daterangepicker.component';

@Component({
    selector: 'test-datepicker-reactive-forms',
    template: `<input type="text" bsDatepicker [formControl]="control">`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class DatepickerReactiveFormsTestComponent {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  control = new FormControl<Date | null>(new Date(2024, 0, 15));
}

@Component({
    selector: 'test-daterangepicker-reactive-forms',
    template: `<input type="text" bsDaterangepicker [formControl]="control">`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class DaterangepickerReactiveFormsTestComponent {
  @ViewChild(BsDaterangepickerDirective, { static: false }) daterangepicker: BsDaterangepickerDirective;
  control = new FormControl<Date[] | null>([new Date(2024, 0, 10), new Date(2024, 0, 20)]);
}

@Component({
    selector: 'test-datepicker-signal-forms',
    template: `<input type="text" bsDatepicker [formField]="myForm.myDate">`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class DatepickerSignalFormsTestComponent {
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  myModel = signal({ myDate: new Date(2024, 0, 15) as Date | null });
  myForm = form(this.myModel);
}

describe('datepicker input: reactive forms', () => {
  let fixture: ComponentFixture<DatepickerReactiveFormsTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerReactiveFormsTestComponent],
      imports: [BsDatepickerModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerReactiveFormsTestComponent);
    fixture.detectChanges();
  });

  it('emits null, not undefined, when the native input is cleared', () => {
    const input = fixture.debugElement.query(By.css('input[bsDatepicker]')).nativeElement as HTMLInputElement;

    input.value = '';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBeNull();
  });

  it('emits null, not undefined, when bsValue is cleared from the picker', () => {
    const datepicker = fixture.componentInstance.datepicker;

    datepicker.bsValue = undefined;
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBeNull();
  });
});

describe('daterangepicker input: reactive forms', () => {
  let fixture: ComponentFixture<DaterangepickerReactiveFormsTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DaterangepickerReactiveFormsTestComponent],
      imports: [BsDatepickerModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterangepickerReactiveFormsTestComponent);
    fixture.detectChanges();
  });

  it('emits null, not undefined, when the native input is cleared', () => {
    const input = fixture.debugElement.query(By.css('input[bsDaterangepicker]')).nativeElement as HTMLInputElement;

    input.value = '';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBeNull();
  });

  it('emits null, not undefined, when bsValue is cleared from the picker', () => {
    const daterangepicker = fixture.componentInstance.daterangepicker;

    daterangepicker.bsValue = undefined;
    fixture.detectChanges();

    expect(fixture.componentInstance.control.value).toBeNull();
  });
});

describe('datepicker input: signal forms', () => {
  let fixture: ComponentFixture<DatepickerSignalFormsTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerSignalFormsTestComponent],
      imports: [BsDatepickerModule, FormField]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerSignalFormsTestComponent);
    fixture.detectChanges();
  });

  it('does not throw and sets the field to null when the input is cleared', () => {
    const input = fixture.debugElement.query(By.css('input[bsDatepicker]')).nativeElement as HTMLInputElement;

    expect(() => {
      input.value = '';
      input.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }).not.toThrow();

    expect(fixture.componentInstance.myModel().myDate).toBeNull();
  });

  it('keeps the field alive so a later date still reaches the model', () => {
    const input = fixture.debugElement.query(By.css('input[bsDatepicker]')).nativeElement as HTMLInputElement;

    input.value = '';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    const nextDate = new Date(2024, 1, 10);
    fixture.componentInstance.datepicker.bsValue = nextDate;
    fixture.detectChanges();

    expect(fixture.componentInstance.myModel().myDate?.getTime()).toEqual(nextDate.getTime());
  });
});
