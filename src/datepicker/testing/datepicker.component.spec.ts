import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerComponent } from '../datepicker.component';

describe('datepicker:', () => {
  let fixture: ComponentFixture<DatePickerComponent>;
  let component: DatePickerComponent;

  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [DatePickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents())
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
  });
  /* eslint-disable @typescript-eslint/no-explicit-any */
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

  it('should emit selectionDone - onSelectionDone', () => {
    const selectionDoneEmit = jest.spyOn(component.selectionDone, 'emit');

    component.onSelectionDone(new Date);

    expect(selectionDoneEmit).toHaveBeenCalled();
  });

  it('should emit activeDateChange - onActiveDateChange', () => {
    const activeDateChangeEmit = jest.spyOn(component.activeDateChange, 'emit');

    component.onActiveDateChange(new Date);

    expect(activeDateChangeEmit).toHaveBeenCalled();
  });

  describe('writeValue', () => {
    it('should compare activeDate property to be zero', () => {
      jest.spyOn(component._datePicker, 'compare').mockReturnValue(0);

      component.writeValue('any value');

      expect(component.activeDate).not.toBe('any value');
    });

    it('should do not find the function compare in _datePicker', () => {
      component._datePicker = null;

      component.writeValue(undefined);

      expect(component.activeDate).toBe((component as any)._now);
    });

    it('should set activeDate as 2021-1-1', () => {
      const dateExpected = new Date('2021-1-1');

      component.writeValue(dateExpected);

      expect(component.activeDate).toEqual(dateExpected);
    });

    it('should call _datePicker.select', () => {
      const selectExpected = jest.spyOn(component._datePicker, 'select');

      component.writeValue(new Date('2023-4-1'));

      expect(selectExpected).toHaveBeenCalled();
    });

    it('should not call _datePicker.select', () => {
      component._datePicker = null;

      component.writeValue(new Date('2023-4-1'));

      expect(component._datePicker).toBeFalsy();
    });

    it('should set new Date to activeDate', () => {
      component.activeDate = null;

      component.writeValue('2000-10-10');

      expect(component.activeDate).toBeDefined();
    });
  });

  it('should define onChange property', () => {
    component.registerOnChange(() => 0);

    expect(component.onChange).toBeDefined();
  });

  it('should define onTouched property', () => {
    component.registerOnTouched(() => 0);

    expect(component.onTouched).toBeDefined();
  });
});
