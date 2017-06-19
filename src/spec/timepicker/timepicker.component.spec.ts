import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerComponent } from '../../timepicker/timepicker.component';
import { TimepickerConfig } from '../../timepicker/timepicker.config';
import { TimepickerActions } from '../../timepicker/reducer/timepicker.actions';
import { Data } from '@angular/router';

describe('Component: timepicker', () => {
  let fixture: ComponentFixture<TimepickerComponent>;
  let context: TimepickerComponent;
  let nativeEl: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimepickerComponent],
      providers: [
        TimepickerConfig,
        TimepickerActions
      ]
    });

    fixture = TestBed.createComponent(TimepickerComponent);
    context = fixture.componentInstance;
    nativeEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should prevDef', () => {
    context.prevDef(new Event('customWheel'));
  });

  it('should wheelSign', () => {
    context.wheelSign(new Event('customWheel'));
  });

  // it('should canBeChanged wheel', () => {
  //   context.mousewheel = false;
  //   context.canBeChanged('wheel');
  // });
  //
  // it('should canBeChanged key', () => {
  //   context.arrowkeys = false;
  //   context.canBeChanged('key');
  // });
  //
  // it('should canBeChanged true', () => {
  //   context.readonlyInput = true;
  //   context.canBeChanged();
  // });

  it('should changeHours', () => {
    context.changeHours(3);
  });

  it('should changeHours canIncrementHours', () => {
    context.canIncrementHours = false;
    context.changeHours(3);
  });

  it('should changeHours canDecrementHours', () => {
    context.canDecrementHours = false;
    context.changeHours(-3);
  });

  it('should changeHours wheel', () => {
    context.mousewheel = false;
    context.changeHours(3, 'wheel');
  });

  it('should changeMinutes', () => {
    context.changeMinutes(3);
  });

  it('should changeMinutes canIncrementHours', () => {
    context.canIncrementMinutes = false;
    context.changeMinutes(3);
  });

  it('should changeMinutes canDecrementHours', () => {
    context.canDecrementMinutes = false;
    context.changeMinutes(-3);
  });

  it('should changeMinutes wheel', () => {
    context.mousewheel = false;
    context.changeMinutes(3, 'wheel');
  });

  it('should changeSeconds', () => {
    context.changeSeconds(3);
  });

  it('should changeSeconds canIncrementHours', () => {
    context.canIncrementSeconds = false;
    context.changeSeconds(3);
  });

  it('should changeSeconds canDecrementHours', () => {
    context.canDecrementSeconds = false;
    context.changeSeconds(-3);
  });

  it('should changeSeconds wheel', () => {
    context.mousewheel = false;
    context.changeSeconds(3, 'wheel');
  });

  it('should updateHours', () => {
    context.readonlyInput = true;
    context.updateHours('0');
  });

  it('should updateHours', () => {
    context.updateHours('');
    context.updateHours('-1');
    context.updateHours('1');
  });

  it('should updateMinutes', () => {
    context.readonlyInput = true;
    context.updateMinutes('0');
  });

  it('should updateMinutes', () => {
    context.updateMinutes('');
    context.updateMinutes('-1');
    context.updateMinutes('1');
  });

  it('should updateSeconds', () => {
    context.readonlyInput = true;
    context.updateSeconds('0');
  });

  it('should updateSeconds', () => {
    context.updateSeconds('');
    context.updateSeconds('-1');
    context.updateSeconds('1');
  });

  it('should toggleMeridian true', () => {
    context.showMeridian = true;
    context.toggleMeridian();
  });

  it('should toggleMeridian false', () => {
    context.showMeridian = false;
    context.toggleMeridian();
  });

  it('should writeValue', () => {
    context.writeValue('1');
  });

  it('should writeValue', () => {
    context.writeValue('');
  });

  it('should registerOnChange', () => {
    context.registerOnChange((val: any) => val);
  });

  it('should registerOnTouched', () => {
    context.registerOnTouched(() => true);
  });

  it('should setDisabledState', () => {
    context.setDisabledState(true);
  });

  it('should showMeridian change', () => {
    context.showMeridian = false;
    (context as any)._renderTime('-1');
  });
});
