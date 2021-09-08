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

  describe('onUpdate method', () => {
    it('should defined activeDate property', () => {
      component.activeDate = undefined;
  
      component.onUpdate(new Date('2021-10-12'));
  
      expect(component.activeDate).toBeDefined();
    });

    it('should call onChange with new Date 2021-10-12', () => {
      const onChangeSpy = jest.spyOn(component, 'onChange');
  
      component.onUpdate(new Date('2021-10-12'));
  
      expect(onChangeSpy).toHaveBeenCalledWith(new Date('2021-10-12'));
    });

  });

  it('should emit selectionDone', () => {
    const selectionDoneEmit = jest.spyOn(component.selectionDone, 'emit');

    component.onSelectionDone(new Date);

    expect(selectionDoneEmit).toHaveBeenCalled();
  });
});
