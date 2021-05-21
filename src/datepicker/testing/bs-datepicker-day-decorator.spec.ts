import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BsDatepickerConfig } from '../bs-datepicker.config';
import { DayViewModel } from '../models';
import { BsDatepickerDayDecoratorComponent } from '../themes/bs/bs-datepicker-day-decorator.directive';

import '../../../scripts/jest/toHaveCssClass';

@Component({
  selector: 'test-cmp',
  template: `<span bsDatepickerDayDecorator [day]='day'>{{ day.label }}</span>`
})
class TestComponent {
  day: DayViewModel = { date: new Date(), label: '' };
}

function getDayElement(fixture: ComponentFixture<TestComponent>): HTMLElement {
  return fixture.nativeElement.querySelector(
    '[bsDatepickerDayDecorator]'
  ) as HTMLElement;
}

function setDay(fixture: ComponentFixture<TestComponent>,
                day: Partial<DayViewModel>): void {
  fixture.componentInstance.day = day as DayViewModel;
  fixture.detectChanges();
}

describe('datepicker: [bsDatepickerDayDecorator]', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      declarations: [TestComponent, BsDatepickerDayDecoratorComponent],
      providers: [BsDatepickerConfig]
    }).compileComponents()
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should display date', () => {
    // arrange
    const label = 'some label';
    setDay(fixture, { label });
    const el = getDayElement(fixture);
    // assert
    expect(el.innerHTML).toBe(label);
  });

  it('should not add any special classes by default', () => {
    fixture.detectChanges();
    const el = getDayElement(fixture);
    expect(el).not.toHaveCssClass('disabled');
    expect(el).not.toHaveCssClass('is-highlighted');
    expect(el).not.toHaveCssClass('is-other-month');
    expect(el).not.toHaveCssClass('in-range');
    expect(el).not.toHaveCssClass('select-start');
    expect(el).not.toHaveCssClass('select-end');
    expect(el).not.toHaveCssClass('selected');
    expect(el).not.toHaveCssClass('custom1');
    expect(el).not.toHaveCssClass('custom2');
  });

  it('should add classes corresponding to day state', () => {
    setDay(fixture, {
      isDisabled: true,
      isHovered: true,
      isOtherMonth: true,
      isInRange: true,
      isSelectionStart: true,
      isSelectionEnd: true,
      isSelected: true
    });

    const el = getDayElement(fixture);
    expect(el).toHaveCssClass('disabled');
    expect(el).toHaveCssClass('is-highlighted');
    expect(el).toHaveCssClass('is-other-month');
    expect(el).toHaveCssClass('in-range');
    expect(el).toHaveCssClass('select-start');
    expect(el).toHaveCssClass('select-end');
    expect(el).toHaveCssClass('selected');
    expect(el).not.toHaveCssClass('custom1');
    expect(el).not.toHaveCssClass('custom2');
  });

  it('should add custom and state classes corresponding to day state', () => {
    setDay(fixture, {
      isDisabled: true,
      isHovered: true,
      isOtherMonth: true,
      isInRange: true,
      isSelectionStart: true,
      isSelectionEnd: true,
      isSelected: true,
      customClasses: 'custom1 custom2'
    });
    const el = getDayElement(fixture);
    expect(el).toHaveCssClass('disabled');
    expect(el).toHaveCssClass('is-highlighted');
    expect(el).toHaveCssClass('is-other-month');
    expect(el).toHaveCssClass('in-range');
    expect(el).toHaveCssClass('select-start');
    expect(el).toHaveCssClass('select-end');
    expect(el).toHaveCssClass('selected');
    expect(el).toHaveCssClass('custom1');
    expect(el).toHaveCssClass('custom2');
  });
});
