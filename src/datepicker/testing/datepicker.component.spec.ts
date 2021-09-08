import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerComponent } from '../datepicker.component';
import { DatepickerModule } from '../datepicker.module';

describe('datepicker:', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
      imports: [
        DatepickerModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents())
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
  });
  
  it('should not throw undefined reference error when initializing value before content init hook',
    () => {
      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError(/^.*undefined.*$/gm);
    }
  );

  it('should emit a new Date', () => {
    const selectionDoneEmit = jest.spyOn(component.selectionDone, 'emit');

    component.onSelectionDone(new Date);

    expect(selectionDoneEmit).toHaveBeenCalled();
  });
});
