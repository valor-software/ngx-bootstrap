import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule, ValidationErrors
} from '@angular/forms';

import {
  TimepickerActions,
  TimepickerComponent,
  TimepickerConfig,
  TimepickerModule
} from '../../timepicker';
import {
  hoursValidator,
  getlimitsValidator,
  minutesValidator,
  secondsValidator
} from '../input.validator';

function testTime(hours?: number, minutes?: number, seconds?: number) {
  const time = new Date();
  time.setHours(hours || 0);
  time.setMinutes(minutes || 0);
  time.setSeconds(seconds || 0);

  return time;
}

describe('Component: TimepickerComponent', () => {
  let fixture: ComponentFixture<TimepickerComponent>;
  let component: TimepickerComponent;

  beforeEach(() => {
    return TestBed.configureTestingModule({
      imports: [TimepickerModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [TimepickerConfig, TimepickerActions]
    })
      .compileComponents();
  });


  describe('custom validate', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('should return error if hour are invalid', () => {
      expect(hoursValidator({ hours: '99' }))
        .toEqual({ hours: true });
    });

    it('should return error if minute are invalid', () => {
      expect(minutesValidator({ minutes: '99' }))
        .toEqual({ minutes: true });
    });

    it('should return error if second are invalid', () => {
      expect(secondsValidator({ seconds: '99' }))
        .toEqual({ seconds: true });
    });

    it('should return error if hours out of range', () => {
      const errors: ValidationErrors = getlimitsValidator(testTime(16), testTime(18), true)({
        hours: 20,
        minutes: 44,
        seconds: 0
      });

      expect(errors)
        .toEqual({
          hours: { outOfRange: true },
          minutes: { outOfRange: true },
          seconds: { outOfRange: true }
        });
    });
  });
});
