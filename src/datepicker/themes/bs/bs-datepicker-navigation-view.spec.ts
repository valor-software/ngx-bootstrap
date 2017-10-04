import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BsNavigationDirection,
  DaysCalendarViewModel
} from '../../models/index';
import { BsDatepickerNavigationViewComponent } from './bs-datepicker-navigation-view.component';

@Component({
  selector: 'test-cmp',
  template: `
    <bs-datepicker-navigation-view
      [calendar]="month"
      (onNavigate)="navTo($event)"
    ></bs-datepicker-navigation-view>`
})
class TestComponent {
  month: DaysCalendarViewModel;
  _navTo: BsNavigationDirection;

  navTo(event: BsNavigationDirection): void {
    this._navTo = event;
  }
}

type TestFixture = ComponentFixture<TestComponent>;
const titleSelector = '.current';
const prevNavSelector = '.previous';
const nextNavSelector = '.next';

function getTitles(fixture: TestFixture): string[] {
  const elements = fixture.nativeElement.querySelectorAll(titleSelector);

  return [elements[0].innerText, elements[1].innerText];
}

function getPrevNavButton(fixture: TestFixture): HTMLElement {
  return fixture.nativeElement.querySelector(prevNavSelector) as HTMLElement;
}

function getNextNavButton(fixture: TestFixture): HTMLElement {
  return fixture.nativeElement.querySelector(nextNavSelector) as HTMLElement;
}

function getNavEvent(fixture: TestFixture): BsNavigationDirection {
  return fixture.componentInstance._navTo;
}

function setMonth(fixture: TestFixture,
                  month: Partial<DaysCalendarViewModel>): void {
  fixture.componentInstance.month = month as DaysCalendarViewModel;
  fixture.detectChanges();
}

describe('datepicker: bs-datepicker-navigation-view', () => {
  let fixture: TestFixture;
  beforeEach(
    async(() => TestBed.configureTestingModule({
        declarations: [TestComponent, BsDatepickerNavigationViewComponent]
      }).compileComponents()
    ));
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should display month and year titles', () => {
    const monthTitle = 'Some month';
    const yearTitle = 'Some year';

    setMonth(fixture, {monthTitle, yearTitle});
    const titles = getTitles(fixture);

    expect(titles[0].trim()).toBe(monthTitle);
    expect(titles[1].trim()).toBe(yearTitle);
  });

  it('should display navigation buttons by default', () => {
    const prev = getPrevNavButton(fixture);
    const next = getNextNavButton(fixture);
    setMonth(fixture, {});
    expect(prev.style.visibility).toBe('visible');
    expect(next.style.visibility).toBe('visible');
  });

  it('should hide prev nav button', () => {
    const prev = getPrevNavButton(fixture);
    setMonth(fixture, {hideLeftArrow: true});
    expect(prev.style.visibility).toBe('hidden');
  });

  it('should hide next nav button', () => {
    const next = getNextNavButton(fixture);
    setMonth(fixture, {hideRightArrow: true});
    expect(next.style.visibility).toBe('hidden');
  });

  it('on prev nav button click should nav DOWN', () => {
    const prev = getPrevNavButton(fixture);
    prev.click();
    expect(getNavEvent(fixture)).toBe(BsNavigationDirection.DOWN);
  });

  it('on next nav button click should nav UP', () => {
    const next = getNextNavButton(fixture);
    next.click();
    expect(getNavEvent(fixture)).toBe(BsNavigationDirection.UP);
  });
});
