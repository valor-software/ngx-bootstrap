import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DayViewModel } from '../../models/index';
import { BsDatepickerDayDecoratorComponent } from './bs-datepicker-day-decorator.directive';

@Component({
  selector: 'test-cmp',
  template: `<span bsDatepickerDayDecorator [day]="day">{{ day.label }}</span>`
})
class TestComponent {
  day: DayViewModel = {date: new Date(), label: ''};
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
  beforeEach(async(() =>
    TestBed.configureTestingModule({
      declarations: [TestComponent, BsDatepickerDayDecoratorComponent]
    }).compileComponents()
  ));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should display date', () => {
    // arrange
    const label = 'some label';
    setDay(fixture, {label});
    const el = getDayElement(fixture);
    // assert
    expect(el.innerText).toBe(label);
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
  });
});
