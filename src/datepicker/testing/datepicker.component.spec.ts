import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePickerComponent } from '../datepicker.component';
import { DatepickerModule } from '../datepicker.module';

@Component({
  selector: 'test-cmp',
  template: `<datepicker></datepicker>`
})
class TestComponent implements OnInit {
  @ViewChild(DatePickerComponent, { static: true }) datepicker: DatePickerComponent;

  ngOnInit(): void {
    this.datepicker.writeValue(new Date());
  }
}

type TestFixture = ComponentFixture<TestComponent>;

describe('datepicker:', () => {
  let fixture: TestFixture;

  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        DatepickerModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents())
  );

  it('should not throw undefined reference error when initializing value before content init hook',
    () => {
      expect(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
      }).not.toThrowError(/^.*undefined.*$/gm);
    }
  );
});
