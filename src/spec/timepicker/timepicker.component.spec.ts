// tslint:disable:no-floating-promises
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { fireEvent } from '../../../scripts/helpers';
import {
  TimepickerActions,
  TimepickerComponent,
  TimepickerConfig,
  TimepickerModule
} from '../../timepicker';

function getInputElements(fixture: any) {
  return fixture.nativeElement.querySelectorAll('input') as HTMLInputElement;
}

function getElements(fixture: any, selector: string) {
  return fixture.nativeElement.querySelectorAll(selector) as HTMLElement;
}

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
  let inputDebugHours: any;
  let inputDebugMinutes: any;
  let inputDebugSeconds: any;
  let buttonMeridian: HTMLElement;
  let buttonDebugMeridian: any;
  let buttonChanges: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimepickerModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [TimepickerConfig, TimepickerActions]
    });
  });

  describe('default configuration', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      buttonChanges = getElements(fixture, 'a.btn');
      buttonMeridian = getElements(fixture, 'button');
    });

    it('should seconds fields is not display', () => {
      expect(inputHours).toBeTruthy();
      expect(inputMinutes).toBeTruthy();
    });

    it('should seconds fields is not display', () => {
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

    it('should change time period after click on AM/PM button', () => {
      expect(buttonMeridian.textContent.trim()).toBe(component.meridians[0]);

      buttonDebugMeridian.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(buttonMeridian.textContent.trim()).toBe(component.meridians[1]);
      });
    });

    it('should change time period after click on AM/PM button without readonlyInput', () => {
      component.readonlyInput = false;
      component.showMeridian = false;

      fixture.detectChanges();

      buttonDebugMeridian.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(buttonMeridian.textContent.trim()).toBe(component.meridians[0]);
      });
    });

    it('should change time period after click on AM/PM button with readonlyInput', () => {
      component.readonlyInput = false;
      component.showMeridian = true;

      fixture.detectChanges();

      buttonDebugMeridian.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(buttonMeridian.textContent.trim()).toBe(component.meridians[1]);
      });
    });
  });

  describe('validate input fields with property of showMeridian switch off', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      buttonMeridian = getElements(fixture, 'button')[0];
      inputHours = getInputElements(fixture)[0];
    });

    it('should not display AM/PM button if showMeridian switch off', () => {
      expect(buttonMeridian).toBeTruthy();

      component.showMeridian = false;
      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        buttonMeridian = getElements(fixture, 'button')[0];
        expect(buttonMeridian).toBeFalsy();
      });
    });

    it('should validate the data in the hours input at time format 24h', () => {
      component.showMeridian = false;

      component.writeValue(testTime(22));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBe('22');
      });
    });
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
      component.max = testTime(18);
      component.writeValue(testTime(17, 50));
      fixture.detectChanges();

      expect(buttonChanges[0]).toHaveCssClass('disabled');
      expect(buttonChanges[1]).not.toHaveCssClass('disabled');

      component.writeValue(testTime(17, 57));
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

  describe('hide minutes fields with property of showMinutes', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      inputMinutes = getInputElements(fixture)[1];
    });
    it('should hide minutes field when property showMinutes is == false', () => {
      component.showMinutes = false;
      fixture.detectChanges();
      expect(inputSeconds).toBeFalsy();
    });
  });

  describe('display seconds fields with property of showSeconds', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputSeconds = getInputElements(fixture)[2];
    });

    it('should display seconds field if showMeridian switch on', () => {
      component.showSeconds = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputSeconds = getInputElements(fixture)[2];

        fireEvent(inputSeconds, 'change');

        expect(inputSeconds).toBeTruthy();
      });
    });

    it('should validate the data in the seconds input', () => {
      component.showSeconds = true;

      component.writeValue(testTime(2, 6, 7));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputSeconds = getInputElements(fixture)[2];

        fireEvent(inputSeconds, 'change');

        expect(inputSeconds.value).toBe('07');
      });
    });
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

    it('should be possible to enter values', () => {
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
    });

    it('should be display is time change buttons', () => {
      expect(buttonChanges).toBeTruthy();
    });

    it('should be impossible to enter values', () => {
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
    });

    it('should disable buttons if readonlyInput is true', () => {
      expect(buttonChanges).toBeTruthy();

      component.readonlyInput = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonsDisabled = fixture.nativeElement.querySelector('a.btn');

        expect(buttonsDisabled.className).toContain('disabled');
      });
    });

    it('should disable buttons if disabled is true', () => {
      expect(buttonChanges).toBeTruthy();

      component.disabled = true;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonsDisabled = fixture.nativeElement.querySelector('a.btn');

        expect(buttonsDisabled.className).toContain('disabled');
      });
    });
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

    it('should add to the hour input field value, hourStep value increment', () => {
      component.hourStep = 2;

      component.writeValue(testTime());

      fireEvent(buttonChanges[0], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBe('02');
      });
    });

    it('should add to the hour input field value, hourStep value decrement', () => {
      component.hourStep = 2;

      component.writeValue(testTime(6));

      fireEvent(buttonChanges[2], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBe('04');
      });
    });

    it('should input field value, minuteStep value increment', () => {
      component.minuteStep = 12;

      component.writeValue(testTime(6, 22));

      fireEvent(buttonChanges[1], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toBe('34');
      });
    });

    it('should input field value, minuteStep value decrement', () => {
      component.minuteStep = 12;

      component.writeValue(testTime(6, 22));

      fireEvent(buttonChanges[3], 'click');

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toBe('10');
      });
    });

    it('should input field value, secondsStep value increment', () => {
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
    });

    it('should input field value, secondsStep value decrement', () => {
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
    });
  });

  describe('hide change button', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      buttonChanges = getElements(fixture, 'a.btn');
    });

    it('should hide change button', () => {
      component.showSpinners = false;

      component.writeValue(testTime());

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const buttonsHidden = fixture.nativeElement.querySelector('a.btn');
        expect(buttonsHidden.parentElement.parentElement.hasAttribute('hidden')).toEqual(true)
      });
    });
  });

  describe('validate mousewheel', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      inputDebugHours = getDebugElements(fixture, 'input')[0];
      inputDebugMinutes = getDebugElements(fixture, 'input')[1];
      inputDebugSeconds = getDebugElements(fixture, 'input')[2];
    });

    it('should can change hours value with the mouse wheel increment', () => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = {deltaY: -1, preventDefault: () => {}};

      inputDebugHours.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('09');
        expect(methodSpy).toHaveBeenCalledWith(
          component.hourStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can change minutes value with the mouse wheel increment', () => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = {deltaY: -1, preventDefault: Function.prototype};

      inputDebugMinutes.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('33');
        expect(methodSpy).toHaveBeenCalledWith(
          component.minuteStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can change seconds value with the mouse wheel increment', () => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();

      component.showSeconds = true;
      component.secondsStep = 3;

      component.writeValue(testTime(6, 30, 30));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputDebugSeconds = getDebugElements(fixture, 'input')[2];

        const wheelEvent = {deltaY: -1, preventDefault: () => Function.prototype};
        inputDebugSeconds.triggerEventHandler('wheel', wheelEvent);

        fixture.detectChanges();

        inputSeconds = getInputElements(fixture)[2];

        expect(inputSeconds.value).toEqual('33');
        expect(methodSpy).toHaveBeenCalledWith(
          component.secondsStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can change hours value with the mouse wheel decrement', () => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = {deltaY: 1, preventDefault: Function.prototype };

      inputDebugHours.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('03');
        expect(methodSpy).toHaveBeenCalledWith(
          component.hourStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can change minutes value with the mouse wheel decrement', () => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = {deltaY: 1, preventDefault: Function.prototype};

      inputDebugMinutes.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('27');
        expect(methodSpy).toHaveBeenCalledWith(
          component.minuteStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can change seconds value with the mouse wheel decrement', () => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.secondsStep = 3;
      component.showSeconds = true;

      component.writeValue(testTime(6, 30, 30));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputSeconds = getInputElements(fixture)[2];
        inputDebugSeconds = getDebugElements(fixture, 'input')[2];

        const wheelEvent = {deltaY: 1, preventDefault: Function.prototype};

        inputDebugSeconds.triggerEventHandler('wheel', wheelEvent);

        fixture.detectChanges();

        expect(inputSeconds.value).toEqual('27');
        expect(methodSpy).toHaveBeenCalledWith(
          component.secondsStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can not change hours value with the mouse wheel', () => {
      const methodSpy = spyOn(component, 'changeHours').and.callThrough();
      component.hourStep = 3;
      component.mousewheel = false;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = {deltaY: 1, preventDefault: Function.prototype};

      inputDebugHours.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputHours.value).toEqual('06');
        expect(methodSpy).toHaveBeenCalledWith(
          component.hourStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can not change minutes value with the mouse wheel', () => {
      const methodSpy = spyOn(component, 'changeMinutes').and.callThrough();
      component.minuteStep = 3;
      component.mousewheel = false;

      component.writeValue(testTime(6, 30, 30));
      fixture.detectChanges();

      const wheelEvent = {deltaY: 1, preventDefault: Function.prototype};

      inputDebugMinutes.triggerEventHandler('wheel', wheelEvent);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(inputMinutes.value).toEqual('30');
        expect(methodSpy).toHaveBeenCalledWith(
          component.minuteStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });

    it('should can not change seconds value with the mouse wheel', () => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.showSeconds = true;
      component.secondsStep = 3;
      component.mousewheel = false;

      component.writeValue(testTime(6, 30, 30));

      const wheelEvent = {deltaY: 1, preventDefault: Function.prototype};

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputSeconds = getInputElements(fixture)[2];
        inputDebugSeconds = getDebugElements(fixture, 'input')[2];

        inputDebugSeconds.triggerEventHandler('wheel', wheelEvent);

        fixture.detectChanges();

        expect(inputSeconds.value).toEqual('30');
        expect(methodSpy).toHaveBeenCalledWith(
          component.secondsStep * component.wheelSign(wheelEvent),
          'wheel'
        );
      });
    });
  });

  describe('validate arrowkeys', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
      inputDebugHours = getDebugElements(fixture, 'input')[0];
      inputDebugMinutes = getDebugElements(fixture, 'input')[1];
      inputDebugSeconds = getDebugElements(fixture, 'input')[2];
    });

    it('should can change hours value with the arrow keys up', () => {
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
    });

    it('should can change minutes value with the arrow keys up', () => {
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
    });

    it('should can change seconds value with the arrow keys up', () => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();
      component.showSeconds = true;
      component.secondsStep = 3;

      component.writeValue(testTime(6, 2, 3));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputDebugSeconds = getDebugElements(fixture, 'input')[2];

        inputDebugSeconds.triggerEventHandler('keydown.ArrowUp', null);

        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];

        expect(inputSeconds.value).toEqual('06');
        expect(methodSpy).toHaveBeenCalledWith(component.secondsStep, 'key');
      });
    });

    it('should can not change hours value with the arrow keys down', () => {
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
    });

    it('should can not change minutes value with the arrow keys down', () => {
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
    });

    it('should can not change seconds value with the arrow keys down', () => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();

      component.showSeconds = true;
      component.secondsStep = 3;

      component.writeValue(testTime(6, 2, 3));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputDebugSeconds = getDebugElements(fixture, 'input')[2];

        inputDebugSeconds.triggerEventHandler('keydown.ArrowDown', null);

        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];

        expect(inputSeconds.value).toEqual('00');
        expect(methodSpy).toHaveBeenCalledWith(-component.secondsStep, 'key');
      });
    });

    it('should can not change hours value with the arrow keys', () => {
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
    });

    it('should can not change minutes value with the arrow keys', () => {
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
    });

    it('should can not change seconds value with the arrow keys', () => {
      const methodSpy = spyOn(component, 'changeSeconds').and.callThrough();

      component.showSeconds = true;
      component.secondsStep = 3;
      component.arrowkeys = false;

      component.writeValue(testTime(6, 2, 3));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputDebugSeconds = getDebugElements(fixture, 'input')[2];

        inputDebugSeconds.triggerEventHandler('keydown.ArrowUp', null);

        fixture.detectChanges();
        inputSeconds = getInputElements(fixture)[2];

        expect(inputSeconds.value).toEqual('03');
        expect(methodSpy).toHaveBeenCalledWith(component.secondsStep, 'key');
      });
    });
  });

  describe('custom validate', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TimepickerComponent);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture)[0];
      inputMinutes = getInputElements(fixture)[1];
      inputSeconds = getInputElements(fixture)[2];
    });

    it('should leave the input fields not specified', () => {
      expect(inputHours.value).toBe('');
      expect(inputMinutes.value).toBe('');
    });

    it('should ignore minutes for validation if showMinutes flag == false', () => {
      component.showMinutes = false;
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      component.hours = '12';
      component.minutes = '99';
      component._updateTime();
      fixture.detectChanges();
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

      component.updateHours('99');

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
      expect(component.invalidHours).toEqual(true);
    });

    it('should clear model if hour limits are invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      spyOn(component, 'isValidLimit').and.returnValue(false);

      component.updateHours('19');

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
      expect(component.invalidHours).toEqual(true);
    });

    it('should update time if hour is valid', () => {
      spyOn(component, '_updateTime').and.stub();
      component.hours = '10';
      component.showMeridian = false;

      component.updateHours('17');

      expect(component.invalidHours).toEqual(false);
      expect(component._updateTime).toHaveBeenCalled();
    });

    it('should clear model if minute input is invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      component.minutes = '10';

      component.updateMinutes('99');

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should clear model if minute limits are invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      spyOn(component, 'isValidLimit').and.returnValue(false);

      component.updateMinutes('30');

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should update time if minute is valid', () => {
      spyOn(component, '_updateTime').and.stub();
      component.minutes = '10';

      component.updateMinutes('30');

      expect(component.invalidMinutes).toEqual(false);
      expect(component._updateTime).toHaveBeenCalled();
    });

    it('should clear model if second input is invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      component.showSeconds = true;
      component.seconds = '10';

      component.updateSeconds('99');

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should clear model if second limits are invalid', () => {
      const methodSpy = spyOn(component, 'onChange').and.callThrough();
      spyOn(component.isValid, 'emit').and.stub();
      spyOn(component, 'isValidLimit').and.returnValue(false);

      component.updateSeconds('50');

      expect(methodSpy).toHaveBeenCalledWith(null);
      expect(component.isValid.emit).toHaveBeenCalledWith(false);
    });

    it('should update time if second is valid', () => {
      spyOn(component, '_updateTime').and.stub();
      component.seconds = '10';

      component.updateSeconds('30');

      expect(component.invalidSeconds).toEqual(false);
      expect(component._updateTime).toHaveBeenCalled();
    });

    it('should valid value in input fields', () => {
      component.showSeconds = true;
      component.showMeridian = false;

      component.writeValue(testTime(11, 25, 45));

      fixture.detectChanges();

      expect(inputHours.value).toBeGreaterThan(0);
      expect(inputHours.value).toBeLessThan(13);

      expect(inputMinutes.value).toBeGreaterThan(-1);
      expect(inputMinutes.value).toBeLessThan(60);

      component.writeValue(testTime(22, 25, 45));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputHours.value).toBeGreaterThan(-1);
        expect(inputHours.value).toBeLessThan(24);

        inputSeconds = getInputElements(fixture)[2];
        expect(inputSeconds.value).toBeGreaterThan(-1);
        expect(inputSeconds.value).toBeLessThan(60);
      });
    });
  });
});
