import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormsModule, NgForm, NgModel,
  ReactiveFormsModule
} from '@angular/forms';

import {
  TimepickerActions,
  TimepickerComponent,
  TimepickerConfig,
  TimepickerModule
} from '../../timepicker';
import { hoursValidator, limitsValidator, minutesValidator, secondsValidator } from '../../timepicker/input.validator';

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
      component.ngControl = new NgModel(new NgForm([], []), [], [], [component]);

      fixture.detectChanges();
    });

    it('should return error if hour are invalid', () => {
      expect(hoursValidator(new FormControl({ hours: 99 })))
        .toEqual({ hours: true });
    });

    it('should return error if minute are invalid', () => {
      expect(minutesValidator(new FormControl({ minutes: 99 })))
        .toEqual({ minutes: true });
    });

    it('should return error if second are invalid', () => {
      expect(secondsValidator(new FormControl({ seconds: 99 })))
        .toEqual({ seconds: true });
    });

    it('should return error if hours limits are invalid', () => {
      expect(limitsValidator(new FormControl({
        hours: 18,
        minutes: 44,
        seconds: 0,
        range: { max: testTime(18), min: testTime(17)}
      })))
        .toEqual({
          hours: { inputLimit: true },
          minutes: { inputLimit: true },
          seconds: { inputLimit: true }
        });
    });
  });
});
