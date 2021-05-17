/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { fireEvent } from '../../../scripts/helpers';
import '../../../scripts/jest/toHaveCssClass';
import { TimepickerActions, TimepickerComponent, TimepickerConfig, TimepickerModule } from '../index';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getInputElements(fixture: any) {
  return fixture.nativeElement.querySelectorAll('input') as HTMLInputElement[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getElements(fixture: any, selector: string) {
  return fixture.nativeElement.querySelectorAll(selector) as HTMLElement[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDebugElements(fixture: any, selector: string) {
  return fixture.debugElement.queryAll(By.css(selector));
}

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
  let inputHours: HTMLInputElement;
  let inputMinutes: HTMLInputElement;
  let inputSeconds: HTMLInputElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let inputDebugHours: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let inputDebugMinutes: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let inputDebugSeconds: any;
  let buttonMeridian: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let buttonDebugMeridian: any;
  let buttonChanges: HTMLElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimepickerModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [TimepickerConfig, TimepickerActions]
    });
  });

  describe('by default', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      buttonChanges = getElements(fixture, 'a.btn');
      buttonMeridian = getElements(fixture, 'button')[0];
    });

    it('hours and minutes fields should be visible', () => {
      expect(inputHours).toBeTruthy();
      expect(inputMinutes).toBeTruthy();
    });

    it('seconds input should be hidden', () => {
      expect(inputSeconds).toBeFalsy();
    });

    it('should be empty inputs fields hours and minutes', () => {
      expect(inputHours.value).toBeFalsy();
      expect(inputMinutes.value).toBeFalsy();
    });

    it('should visible change buttons', () => {
      expect(buttonChanges).toBeTruthy();
    });

    it('should visible meridian button', () => {
      expect(buttonMeridian).toBeTruthy();
    });

    it('hours placeholder should be \'HH\' ', () => {
      expect(component.hoursPlaceholder).toEqual('HH');
    });

    it('minutes placeholder should be \'MM\' ', () => {
      expect(component.minutesPlaceholder).toEqual('MM');
    });

    it('seconds placeholder should be \'SS\' ', () => {
      expect(component.secondsPlaceholder).toEqual('SS');
    });
  });

  describe('validate input fields with default state', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should validate the data in the minutes input with valid data', () => {
      fireEvent(inputMinutes, 'change');

      component.writeValue(testTime(0, 12, 0));

      fixture.detectChanges();

      expect(inputMinutes.value).toEqual('12');
    });

    it('should validate the data in the minutes input with valid data with half value', () => {
      component.writeValue(testTime(0, 2, 0));
      fixture.detectChanges();

      expect(inputMinutes.value).toEqual('02');
    });

    it('should set time in a input field after click on input change button', () => {
      expect(inputHours.value).toBeFalsy();
      expect(inputMinutes.value).toBeFalsy();

      fireEvent(buttonChanges[0], 'click');

      fixture.detectChanges();

      expect(inputHours.value).toBe('01');
      expect(inputMinutes.value).toBe('00');
    });

    it('should emit isValid with false when clearing date', () => {
      spyOn(component.isValid, 'emit').and.stub();
      fireEvent(inputMinutes, 'change');
      component.writeValue(testTime());
      fixture.detectChanges();
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('validate input fields with property of showMeridian switch on', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      buttonMeridian = getElements(fixture, 'button')[0];
      buttonDebugMeridian = getDebugElements(fixture, 'button')[0];
    });

    it('should default state showMeridian display AM/PM button', () => {
      expect(buttonMeridian).toBeTruthy();
    });

    it('should validate the data in the hours input at time format 12h', () => {
      fireEvent(inputHours, 'change');

      component.writeValue(testTime(22));

      fixture.detectChanges();

      expect(inputHours.value).toEqual('10');
    });

    it('should change time period after click on AM/PM button', fakeAsync(() => {
      expect(buttonMeridian.textContent?.trim()).toBe(component.meridians[0]);

      buttonDebugMeridian.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(buttonMeridian.textContent?.trim()).toBe(component.meridians[1]);
      });
    }));

    it('should change time period after click on AM/PM button without readonlyInput', fakeAsync(() => {
      component.readonlyInput = false;
      component.showMeridian = false;

      fixture.detectChanges();

      buttonDebugMeridian.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(buttonMeridian.textContent?.trim()).toBe(component.meridians[0]);
      });
    }));

    it('should change time period after click on AM/PM button with readonlyInput', fakeAsync(() => {
      component.readonlyInput = false;
      component.showMeridian = true;

      fixture.detectChanges();

      buttonDebugMeridian.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(buttonMeridian.textContent?.trim()).toBe(component.meridians[1]);
      });
    }));
  });

  describe('validate input fields with property of showMeridian switch off', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      buttonMeridian = getElements(fixture, 'button')[0];
      inputHours = getInputElements(fixture)[0];
    });

    it('should not display AM/PM button if showMeridian switch off', fakeAsync(() => {
      expect(buttonMeridian).toBeTruthy();

      component.showMeridian = false;
      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        buttonMeridian = getElements(fixture, 'button')[0];
        expect(buttonMeridian).toBeFalsy();
      });
    }));

    it('should validate the data in the hours input at time format 24h', fakeAsync(() => {
      component.showMeridian = false;

      component.writeValue(testTime(22));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBe('22');
      });
    }));
  });

  describe('validate input fields with property of max', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should block the hours / minutes increment button if clicking on it will cause exceeding the max value', () => {
      component.max = testTime(23, 45);
      component.writeValue(testTime(22, 50));
      fixture.detectChanges();

      expect(buttonChanges[0]).toHaveCssClass('disabled');
      expect(buttonChanges[1]).not.toHaveCssClass('disabled');

      component.writeValue(testTime(23, 41));
      fixture.detectChanges();

      expect(buttonChanges[0]).toHaveCssClass('disabled');
      expect(buttonChanges[1]).toHaveCssClass('disabled');
    });
  });

  describe('validate input fields with property of min', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should block the hours / minutes decrement button if clicking on it will cause exceeding the min value', () => {
      component.min = testTime(13);
      component.writeValue(testTime(13, 22));
      fixture.detectChanges();

      expect(buttonChanges[2]).toHaveCssClass('disabled');
      expect(buttonChanges[3]).not.toHaveCssClass('disabled');

      component.writeValue(testTime(13, 2));
      fixture.detectChanges();

      expect(buttonChanges[2]).toHaveCssClass('disabled');
      expect(buttonChanges[3]).toHaveCssClass('disabled');
    });
  });

  describe('validate input fields with property of allowEmptyDate', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should emit isValid with false when allowEmptyDate is false', () => {
      component.allowEmptyDate = false;
      spyOn(component.isValid, 'emit').and.stub();
      fireEvent(inputMinutes, 'change');
      component.writeValue(testTime());
      fixture.detectChanges();
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should emit isValid with true when allowEmptyDate is true ', () => {
      component.allowEmptyDate = true;
      spyOn(component.isValid, 'emit').and.stub();
      fireEvent(inputMinutes, 'change');
      component.writeValue(testTime());
      fixture.detectChanges();
      expect(component.isValid.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('hide minutes fields with property of showMinutes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      component.showMinutes = false;

      fixture.detectChanges();
      inputMinutes = getInputElements(fixture)[1];
    });
    it('should hide minutes field when property showMinutes is == false', () => {
      expect(inputMinutes).toBeFalsy();
    });
  });

  describe('display seconds fields with property of showSeconds', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputSeconds = getInputElements(fixture)[2];
    });

    it('should display seconds field if showMeridian switch on', fakeAsync(() => {
      component.showSeconds = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputSeconds = getInputElements(fixture)[2];

        fireEvent(inputSeconds, 'change');

        expect(inputSeconds).toBeTruthy();
      });
    }));

    it('should validate the data in the seconds input', fakeAsync(() => {
      component.showSeconds = true;

      component.writeValue(testTime(2, 6, 7));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputSeconds = getInputElements(fixture)[2];

        fireEvent(inputSeconds, 'change');

        expect(inputSeconds.value).toBe('07');
      });
    }));
  });

  describe('input fields with property of readonlyInput', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should be possible to enter values', fakeAsync(() => {
      expect(inputHours.getAttribute('readonly')).toBeFalsy();
      expect(inputMinutes.getAttribute('readonly')).toBeFalsy();

      component.showSeconds = true;
      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];

        expect(inputSeconds.getAttribute('readonly')).toBeFalsy();
      });
    }));

    it('should be display is time change buttons', () => {
      expect(buttonChanges).toBeTruthy();
    });

    it('should be impossible to enter values', fakeAsync(() => {
      component.readonlyInput = true;
      component.showSeconds = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];

        expect(inputHours.getAttribute('readonly')).toBe('');
        expect(inputMinutes.getAttribute('readonly')).toBe('');
        expect(inputSeconds.getAttribute('readonly')).toBe('');
      });
    }));

    it('should disable buttons if readonlyInput is true', fakeAsync(() => {
      expect(buttonChanges).toBeTruthy();

      component.readonlyInput = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonsDisabled = fixture.nativeElement.querySelector('a.btn');

        expect(buttonsDisabled.className).toContain('disabled');
      });
    }));

    it('should disable buttons if disabled is true', fakeAsync(() => {
      expect(buttonChanges).toBeTruthy();

      component.disabled = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonsDisabled = fixture.nativeElement.querySelector('a.btn');

        expect(buttonsDisabled.className).toContain('disabled');
      });
    }));
  });

  describe('input fields hour with property of hourStep', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should add to the hour input field value, hourStep value increment', fakeAsync(() => {
      component.hourStep = 2;

      component.writeValue(testTime());

      fireEvent(buttonChanges[0], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBe('02');
      });
    }));

    it('should add to the hour input field value, hourStep value decrement', fakeAsync(() => {
      component.hourStep = 2;

      component.writeValue(testTime(6));

      fireEvent(buttonChanges[2], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBe('04');
      });
    }));

    it('should input field value, minuteStep value increment', fakeAsync(() => {
      component.minuteStep = 12;

      component.writeValue(testTime(6, 22));

      fireEvent(buttonChanges[1], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toBe('34');
      });
    }));

    it('should input field value, minuteStep value decrement', fakeAsync(() => {
      component.minuteStep = 12;

      component.writeValue(testTime(6, 22));

      fireEvent(buttonChanges[3], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toBe('10');
      });
    }));

    it('should input field value, secondsStep value increment', fakeAsync(() => {
      component.showSeconds = true;
      component.secondsStep = 10;

      component.writeValue(testTime(6, 22, 30));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        buttonChanges = getElements(fixture, 'a.btn');

        fireEvent(buttonChanges[2], 'click');

        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];
        expect(inputSeconds.value).toBe('40');
      });
    }));

    it('should input field value, secondsStep value decrement', fakeAsync(() => {
      component.showSeconds = true;
      component.secondsStep = 10;

      component.writeValue(testTime(6, 22, 30));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        buttonChanges = getElements(fixture, 'a.btn');
        fireEvent(buttonChanges[5], 'click');

        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];
        expect(inputSeconds.value).toBe('20');
      });
    }));
  });


  describe('hide change button', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should hide change button', fakeAsync(() => {
      component.showSpinners = false;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonsHidden = fixture.nativeElement.querySelector('a.btn');
        expect(buttonsHidden.parentElement.parentElement.hasAttribute('hidden')).toEqual(true);
      });
    }));
  });

  describe('validate mousewheel', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      component.showSeconds = true;
      fixture.detectChanges();

      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      inputDebugHours = getDebugElements(fixture, 'input')[0];
      inputDebugMinutes = getDebugElements(fixture, 'input')[1];
      inputDebugSeconds = getDebugElements(fixture, 'input')[2];
    });

    it('should can change hours value with the mouse wheel increment', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: -1, preventDefault: () => undefined };

      inputDebugHours.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('09');
        expect(methodSpy).toHaveBeenCalledWith(
          component.hourStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can change minutes value with the mouse wheel increment', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: -1, preventDefault: Function.prototype };

      inputDebugMinutes.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('33');
        expect(methodSpy).toHaveBeenCalledWith(
          component.minuteStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can change seconds value with the mouse wheel increment', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();

      component.showSeconds = true;
      component.secondsStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: -1, preventDefault: () => Function.prototype };
      inputDebugSeconds.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputSeconds.value).toEqual('33');
        expect(methodSpy).toHaveBeenCalledWith(
          component.secondsStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can change hours value with the mouse wheel decrement', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: 1, preventDefault: Function.prototype };

      inputDebugHours.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('03');
        expect(methodSpy).toHaveBeenCalledWith(
          component.hourStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can change minutes value with the mouse wheel decrement', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: 1, preventDefault: Function.prototype };

      inputDebugMinutes.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('27');
        expect(methodSpy).toHaveBeenCalledWith(
          component.minuteStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can change seconds value with the mouse wheel decrement', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.secondsStep = 3;
      component.showSeconds = true;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: 1, preventDefault: Function.prototype };
      inputDebugSeconds.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputSeconds.value).toEqual('27');
        expect(methodSpy).toHaveBeenCalledWith(
          component.secondsStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can not change hours value with the mouse wheel', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;
      component.mousewheel = false;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: 1, preventDefault: Function.prototype };

      inputDebugHours.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('06');
        expect(methodSpy).toHaveBeenCalledWith(
          component.hourStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can not change minutes value with the mouse wheel', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;
      component.mousewheel = false;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = { deltaY: 1, preventDefault: Function.prototype };

      inputDebugMinutes.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('30');
        expect(methodSpy).toHaveBeenCalledWith(
          component.minuteStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));

    it('should can not change seconds value with the mouse wheel', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.secondsStep = 3;
      component.mousewheel = false;

      component.writeValue(testTime(6, 30, 30));

      const wheelEvent = { deltaY: 1, preventDefault: Function.prototype };
      fixture.detectChanges();

      inputDebugSeconds.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputSeconds.value).toEqual('30');
        expect(methodSpy).toHaveBeenCalledWith(
          component.secondsStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    }));
  });

  describe('validate arrowkeys', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      component.showSeconds = true;
      fixture.detectChanges();

      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      inputDebugHours = getDebugElements(fixture, 'input')[0];
      inputDebugMinutes = getDebugElements(fixture, 'input')[1];
      inputDebugSeconds = getDebugElements(fixture, 'input')[2];
    });

    it('should can change hours value with the arrow keys up', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugHours.triggerEventHandler('keydown.ArrowUp', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('09');
        expect(methodSpy).toHaveBeenCalledWith(component.hourStep, 'key');
      });
    }));

    it('should can change minutes value with the arrow keys up', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugMinutes.triggerEventHandler('keydown.ArrowUp', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('05');
        expect(methodSpy).toHaveBeenCalledWith(component.minuteStep, 'key');
      });
    }));

    it('should can change seconds value with the arrow keys up', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.secondsStep = 3;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugSeconds.triggerEventHandler('keydown.ArrowUp', null);
      fixture.detectChanges();


      fixture.whenStable().then(() => {
        expect(inputSeconds.value).toEqual('06');
        expect(methodSpy).toHaveBeenCalledWith(component.secondsStep, 'key');
      });
    }));

    it('should can not change hours value with the arrow keys down', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugHours.triggerEventHandler('keydown.ArrowDown', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('03');
        expect(methodSpy).toHaveBeenCalledWith(-component.hourStep, 'key');
      });
    }));

    it('should can not change minutes value with the arrow keys down', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugMinutes.triggerEventHandler('keydown.ArrowDown', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('59');
        expect(methodSpy).toHaveBeenCalledWith(-component.minuteStep, 'key');
      });
    }));

    it('should can not change seconds value with the arrow keys down', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.showSeconds = true;
      component.secondsStep = 3;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugSeconds.triggerEventHandler('keydown.ArrowDown', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputSeconds.value).toEqual('00');
        expect(methodSpy).toHaveBeenCalledWith(-component.secondsStep, 'key');
      });
    }));

    it('should can not change hours value with the arrow keys', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;
      component.arrowkeys = false;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugHours.triggerEventHandler('keydown.ArrowUp', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('06');
        expect(methodSpy).toHaveBeenCalledWith(component.hourStep, 'key');
      });
    }));

    it('should can not change minutes value with the arrow keys', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;
      component.arrowkeys = false;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugMinutes.triggerEventHandler('keydown.ArrowUp', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('02');
        expect(methodSpy).toHaveBeenCalledWith(component.minuteStep, 'key');
      });
    }));

    it('should can not change seconds value with the arrow keys', fakeAsync(() => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();

      component.showSeconds = true;
      component.secondsStep = 3;
      component.arrowkeys = false;

      component.writeValue(testTime(6, 2, 3));
      fixture.detectChanges();

      inputDebugSeconds.triggerEventHandler('keydown.ArrowUp', null);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputSeconds.value).toEqual('03');
        expect(methodSpy).toHaveBeenCalledWith(component.secondsStep, 'key');
      });
    }));
  });

  describe('custom validate', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      component.showSeconds = true;
      fixture.detectChanges();

      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
    });

    it('should leave the input fields not specified', () => {
      expect(inputHours.value).toBe('');
      expect(inputMinutes.value).toBe('');
    });

    it('should ignore minutes for validation if showMinutes flag == false', () => {
      const methodSpy = spyOn(component, 'onChange');

      component.showMinutes = false;
      component.showSeconds = false;
      component.hours = '12';
      component.minutes = '99';
      fixture.detectChanges();

      component._updateTime();
      expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should clear model if values are invalid', () => {
      component.showSeconds = true;
      component.writeValue(testTime(12, 12, 12));
      fixture.detectChanges();
      inputSeconds = getInputElements(fixture)[2];

      expect(inputHours.value).toBe('12');
      expect(inputMinutes.value).toBe('12');
      expect(inputSeconds.value).toBe('12');

      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      component.hours = '99';
      component.minutes = '99';
      component.seconds = '99';
      component._updateTime();
      fixture.detectChanges();

      expect(methodSpy).toHaveBeenCalledWith(null);
    });

    it('should clear model if hour input is invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      component.hours = '10';
      component.showMeridian = false;

      inputHours = getInputElements(fixture)[0];
      (inputHours as HTMLInputElement).value = '99';
      component.updateHours(inputHours);

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
      expect(component.invalidHours).toEqual(true);
    });

    it('should clear model if hour limits are invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      spyOn(component, 'isValidLimit').and.returnValue(false);

      inputHours = getInputElements(fixture)[0];
      (inputHours as HTMLInputElement).value = '19';
      component.updateHours(inputHours);

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
      expect(component.invalidHours).toEqual(true);
    });

    it('should update time if hour is valid', () => {
      spyOn(component, '_updateTime').and.stub();
      component.hours = '10';
      component.showMeridian = false;

      inputHours = getInputElements(fixture)[0];
      (inputHours as HTMLInputElement).value = '17';
      component.updateHours(inputHours);

      expect(component.invalidHours).toEqual(false);
      expect(component._updateTime).toHaveBeenCalled();
    });

    it('should clear model if minute input is invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      component.minutes = '10';

      inputMinutes = getInputElements(fixture)[1];
      (inputMinutes as HTMLInputElement).value = '99';
      component.updateMinutes(inputMinutes);

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should clear model if minute limits are invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      spyOn(component, 'isValidLimit').and.returnValue(false);

      inputMinutes = getInputElements(fixture)[1];
      (inputMinutes as HTMLInputElement).value = '30';
      component.updateMinutes(inputMinutes);

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should update time if minute is valid', () => {
      spyOn(component, '_updateTime').and.stub();
      component.minutes = '10';

      inputMinutes = getInputElements(fixture)[1];
      (inputMinutes as HTMLInputElement).value = '30';
      component.updateMinutes(inputMinutes);

      expect(component.invalidMinutes).toEqual(false);
      expect(component._updateTime).toHaveBeenCalled();
    });

    it('should clear model if second input is invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      component.showSeconds = true;
      component.seconds = '10';

      inputSeconds = getInputElements(fixture)[2];
      (inputSeconds as HTMLInputElement).value = '99';
      component.updateSeconds(inputSeconds);

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should clear model if second limits are invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      spyOn(component, 'isValidLimit').and.returnValue(false);


      inputSeconds = getInputElements(fixture)[2];
      (inputSeconds as HTMLInputElement).value = '50';
      component.updateSeconds(inputSeconds);

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should update time if second is valid', () => {
      spyOn(component, '_updateTime').and.stub();
      component.seconds = '10';

      inputSeconds = getInputElements(fixture)[2];
      (inputSeconds as HTMLInputElement).value = '30';
      component.updateSeconds(inputSeconds);

      expect(component.invalidSeconds).toEqual(false);
      expect(component._updateTime).toHaveBeenCalled();
    });

    it('should valid value in input fields', fakeAsync(() => {
      component.showMeridian = false;

      component.writeValue(testTime(11, 25, 45));

      fixture.detectChanges();

      expect(+inputHours.value).toBeGreaterThan(0);
      expect(+inputHours.value).toBeLessThan(13);

      expect(+inputMinutes.value).toBeGreaterThan(-1);
      expect(+inputMinutes.value).toBeLessThan(60);

      component.writeValue(testTime(22, 25, 45));
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(+inputHours.value).toBeGreaterThan(-1);
        expect(+inputHours.value).toBeLessThan(24);

        expect(+inputSeconds.value).toBeGreaterThan(-1);
        expect(+inputSeconds.value).toBeLessThan(60);
      });
    }));
  });

  describe('custom placeholders', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      component.showSeconds = true;
      component.hoursPlaceholder = 'hh';
      component.minutesPlaceholder = 'mm';
      component.secondsPlaceholder = 'ss';

      fixture.detectChanges();

      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
    });

    it('should use \'hh\' for hours placeholder', () => {
      expect(inputHours.getAttribute('placeholder')).toEqual('hh');
    });

    it('should use \'mm\' for minutes placeholder', () => {
      expect(inputMinutes.getAttribute('placeholder')).toEqual('mm');
    });

    it('should use \'ss\' for seconds placeholder', () => {
      expect(inputSeconds.getAttribute('placeholder')).toEqual('ss');
    });

  });

  describe('date part', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      component = fixture.componentInstance;
      component.showSeconds = true;
      component.showMeridian = false;

      fixture.detectChanges();

      const inputs = getInputElements(fixture);
      inputHours = inputs[0];
      inputMinutes = inputs[1];
      inputSeconds = inputs[2];
      buttonChanges = getElements(fixture, 'a.btn');
    });

    /**
     * Extract only the date part, i.e. floor to previous midnight
     * (in system local timezone)
     * @param date with potential hours, minutes, seconds and milliseconds
     */
    function _getDateOnly(date: Date): Date {
      const result = new Date(date);
      result.setHours(0, 0, 0, 0);

      return result;
    }

    it('should preserve day when hour crosses up from 23 to 00', fakeAsync(() => {
      const hourA = 23;
      const hourAstr = '23';

      let componentDateTime: Date;
      component.registerOnChange((newDateTime: Date) => {
        componentDateTime = newDateTime;
        return newDateTime;
      });

      // @ts-ignore
      expect(componentDateTime).toBeUndefined();
      const testedTime = testTime(hourA);
      component.writeValue(testedTime);

      fixture.detectChanges();

      // @ts-ignore
      if (!componentDateTime) {
        return expect(void 0).toBeDefined();
      }
      expect(componentDateTime.getHours()).toBe(hourA);
      expect(inputHours.value).toBe(hourAstr);

      // Record date part before changing hour
      const expectedDate = _getDateOnly(componentDateTime);

      fireEvent(buttonChanges[0], 'click'); // Hour increment button
      const hourB = 0;
      const hourBstr = '00';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(componentDateTime.getHours()).toBe(hourB);
        expect(inputHours.value).toBe(hourBstr);

        const actualDate = _getDateOnly(componentDateTime);

        // Compare string output for easier debugging
        expect(actualDate.toString()).toBe(expectedDate.toString());

        // Still compare epoch value for millisecond precision
        expect(actualDate.valueOf()).toBe(expectedDate.valueOf());
      });

    }));

    it('should preserve day when hour crosses down from 00 to 23', fakeAsync(() => {
      const hourA = 0;
      const hourAstr = '00';

      let componentDateTime: Date;
      component.registerOnChange((newDateTime: Date) => {
        componentDateTime = newDateTime;

        return newDateTime;
      });

      // @ts-ignore
      expect(componentDateTime).toBeUndefined();
      const testedTime = testTime(hourA);
      component.writeValue(testedTime);

      fixture.detectChanges();

      // @ts-ignore
      if (!componentDateTime) {
        return expect(void 0).toBeDefined();
      }

      expect(componentDateTime.getHours()).toBe(hourA);
      expect(inputHours.value).toBe(hourAstr);

      // Record date part before changing hour
      const expectedDate = _getDateOnly(componentDateTime);

      fireEvent(buttonChanges[3], 'click'); // Hour decrement button
      const hourB = 23;
      const hourBstr = '23';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(componentDateTime.getHours()).toBe(hourB);
        expect(inputHours.value).toBe(hourBstr);

        const actualDate = _getDateOnly(componentDateTime);
        expect(actualDate.toString()).toBe(expectedDate.toString());
        expect(actualDate.valueOf()).toBe(expectedDate.valueOf());
      });

    }));

    // Case for #3139
    // minuteStep default value is 5
    it('should preserve day when minutes cross up from 23:59 to 00:04', fakeAsync(() => {
      const hourA = 23;
      const hourAstr = '23';
      const minutesA = 59;
      const minutesAstr = '59';

      let componentDateTime: Date;
      component.registerOnChange((newDateTime: Date) => {
        componentDateTime = newDateTime;

        return newDateTime;
      });
      // @ts-ignore
      expect(componentDateTime).toBeUndefined();

      const testedTime = testTime(hourA, minutesA);
      component.writeValue(testedTime);

      fixture.detectChanges();

      // @ts-ignore
      if (!componentDateTime) {
        return expect(void 0).toBeDefined();
      }

      expect(componentDateTime.getHours()).toBe(hourA);
      expect(inputHours.value).toBe(hourAstr);
      expect(componentDateTime.getMinutes()).toBe(minutesA);
      expect(inputMinutes.value).toBe(minutesAstr);

      // Record date part before changing hour
      const expectedDate = _getDateOnly(componentDateTime);

      fireEvent(buttonChanges[1], 'click'); // Minutes increment button
      const hourB = 0;
      const hourBstr = '00';
      const minutesB = 4;
      const minutesBstr = '04';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(componentDateTime.getHours()).toBe(hourB);
        expect(inputHours.value).toBe(hourBstr);
        expect(componentDateTime.getMinutes()).toBe(minutesB);
        expect(inputMinutes.value).toBe(minutesBstr);

        const actualDate = _getDateOnly(componentDateTime);
        expect(actualDate.toString()).toBe(expectedDate.toString());
        expect(actualDate.valueOf()).toBe(expectedDate.valueOf());
      });

    }));

    // Case for #3139
    it('should preserve day when minutes cross down from 00:01 to 23:56', fakeAsync(() => {
      const hourA = 0;
      const hourAstr = '00';
      const minutesA = 1;
      const minutesAstr = '01';

      let componentDateTime: Date;
      component.registerOnChange((newDateTime: Date) => {
        componentDateTime = newDateTime;

        return newDateTime;
      });
      // @ts-ignore
      expect(componentDateTime).toBeUndefined();

      const testedTime = testTime(hourA, minutesA);
      component.writeValue(testedTime);

      fixture.detectChanges();

      // @ts-ignore
      if (!componentDateTime) {
        return expect(void 0).toBeDefined();
      }

      expect(componentDateTime.getHours()).toBe(hourA);
      expect(inputHours.value).toBe(hourAstr);
      expect(componentDateTime.getMinutes()).toBe(minutesA);
      expect(inputMinutes.value).toBe(minutesAstr);

      // Record date part before changing hour
      const expectedDate = _getDateOnly(componentDateTime);

      fireEvent(buttonChanges[4], 'click'); // Minutes decrement button
      const hourB = 23;
      const hourBstr = '23';
      const minutesB = 56;
      const minutesBstr = '56';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(componentDateTime.getHours()).toBe(hourB);
        expect(inputHours.value).toBe(hourBstr);
        expect(componentDateTime.getMinutes()).toBe(minutesB);
        expect(inputMinutes.value).toBe(minutesBstr);

        const actualDate = _getDateOnly(componentDateTime);
        expect(actualDate.toString()).toBe(expectedDate.toString());
        expect(actualDate.valueOf()).toBe(expectedDate.valueOf());
      });

    }));

    // Case for #3139
    // secondsStep default value is 10
    it('should preserve day when seconds cross up from 23:59:59 to 00:00:09', fakeAsync(() => {
      const hourA = 23;
      const hourAstr = '23';
      const minutesA = 59;
      const minutesAstr = '59';
      const secondsA = 59;
      const secondsAstr = '59';

      let componentDateTime: Date;
      component.registerOnChange((newDateTime: Date) => {
        componentDateTime = newDateTime;

        return newDateTime;
      });
      // @ts-ignore
      expect(componentDateTime).toBeUndefined();

      const testedTime = testTime(hourA, minutesA, secondsA);
      component.writeValue(testedTime);

      fixture.detectChanges();

      // @ts-ignore
      if (!componentDateTime) {
        return expect(void 0).toBeDefined();
      }

      expect(componentDateTime.getHours()).toBe(hourA);
      expect(inputHours.value).toBe(hourAstr);
      expect(componentDateTime.getMinutes()).toBe(minutesA);
      expect(inputMinutes.value).toBe(minutesAstr);
      expect(componentDateTime.getSeconds()).toBe(secondsA);
      expect(inputSeconds.value).toBe(secondsAstr);

      // Record date part before changing hour
      const expectedDate = _getDateOnly(componentDateTime);

      fireEvent(buttonChanges[2], 'click'); // Seconds increment button
      const hourB = 0;
      const hourBstr = '00';
      const minutesB = 0;
      const minutesBstr = '00';
      const secondsB = 9;
      const secondsBstr = '09';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(componentDateTime.getHours()).toBe(hourB);
        expect(inputHours.value).toBe(hourBstr);
        expect(componentDateTime.getMinutes()).toBe(minutesB);
        expect(inputMinutes.value).toBe(minutesBstr);
        expect(componentDateTime.getSeconds()).toBe(secondsB);
        expect(inputSeconds.value).toBe(secondsBstr);

        const actualDate = _getDateOnly(componentDateTime);
        expect(actualDate.toString()).toBe(expectedDate.toString());
        expect(actualDate.valueOf()).toBe(expectedDate.valueOf());
      });

    }));

    // Case for #3139
    it('should preserve day when seconds cross down from 00:00:01 to 23:59:51', fakeAsync(() => {
      const hourA = 0;
      const hourAstr = '00';
      const minutesA = 0;
      const minutesAstr = '00';
      const secondsA = 1;
      const secondsAstr = '01';

      let componentDateTime: Date;
      component.registerOnChange((newDateTime: Date) => {
        componentDateTime = newDateTime;

        return newDateTime;
      });
      // @ts-ignore
      expect(componentDateTime).toBeUndefined();


      const testedTime = testTime(hourA, minutesA, secondsA);
      component.writeValue(testedTime);

      fixture.detectChanges();
      // @ts-ignore
      if (!componentDateTime) {
        return expect(void 0).toBeDefined();
      }

      expect(componentDateTime.getHours()).toBe(hourA);
      expect(inputHours.value).toBe(hourAstr);
      expect(componentDateTime.getMinutes()).toBe(minutesA);
      expect(inputMinutes.value).toBe(minutesAstr);
      expect(componentDateTime.getSeconds()).toBe(secondsA);
      expect(inputSeconds.value).toBe(secondsAstr);

      // Record date part before changing hour
      const expectedDate = _getDateOnly(componentDateTime);

      fireEvent(buttonChanges[5], 'click'); // Seconds decrement button
      const hourB = 23;
      const hourBstr = '23';
      const minutesB = 59;
      const minutesBstr = '59';
      const secondsB = 51;
      const secondsBstr = '51';

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(componentDateTime.getHours()).toBe(hourB);
        expect(inputHours.value).toBe(hourBstr);
        expect(componentDateTime.getMinutes()).toBe(minutesB);
        expect(inputMinutes.value).toBe(minutesBstr);
        expect(componentDateTime.getSeconds()).toBe(secondsB);
        expect(inputSeconds.value).toBe(secondsBstr);

        const actualDate = _getDateOnly(componentDateTime);
        expect(actualDate.toString()).toBe(expectedDate.toString());
        expect(actualDate.valueOf()).toBe(expectedDate.valueOf());
      });

    }));

  });
});
