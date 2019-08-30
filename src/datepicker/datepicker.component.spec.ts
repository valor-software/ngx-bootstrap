import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild, OnInit } from '@angular/core';

import { DatepickerModule, DatePickerComponent } from '.';

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
    async(() => TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        DatepickerModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents())
  );

  it('should not throw undefined reference error when initializing value before content init hook',
    () => {
      // tslint:disable-next-line: no-floating-promises
      expect(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
      }).not.toThrowError(/^.*undefined.*$/gm);
    }
  );
});
