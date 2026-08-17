import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

import { BsDatepickerModule } from '../bs-datepicker.module';
import { BsDatepickerInlineDirective } from '../bs-datepicker-inline.component';
import { BsDaterangepickerInlineDirective } from '../bs-daterangepicker-inline.component';
import { BsDatepickerAbstractComponent } from '../base/bs-datepicker-container';
import { BsDatepickerViewMode } from '../models';

@Component({
    selector: 'test-datepicker-cmp',
    template: `<bs-datepicker-inline></bs-datepicker-inline>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class DatepickerTestComponent {
  @ViewChild(BsDatepickerInlineDirective, { static: false }) datepicker!: BsDatepickerInlineDirective;
}

@Component({
    selector: 'test-daterangepicker-cmp',
    template: `<bs-daterangepicker-inline></bs-daterangepicker-inline>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class DaterangepickerTestComponent {
  @ViewChild(BsDaterangepickerInlineDirective, { static: false }) datepicker!: BsDaterangepickerInlineDirective;
}

type AnyPickerFixture = ComponentFixture<DatepickerTestComponent | DaterangepickerTestComponent>;

function getContainer(fixture: AnyPickerFixture): BsDatepickerAbstractComponent {
  return fixture.componentInstance.datepicker[`_datepickerRef`].instance;
}

function trackingWarnings(warnSpy: jest.SpyInstance): string[] {
  return warnSpy.mock.calls
    .map((args: unknown[]) => String(args[0]))
    .filter((message: string) => message.includes('NG0956'));
}

function navigateMonths(fixture: AnyPickerFixture, steps: number): void {
  const container = getContainer(fixture);
  for (let i = 0; i < steps; i++) {
    container.navigateTo({ step: { month: 1 } });
    fixture.detectChanges();
  }
}

function switchViewMode(fixture: AnyPickerFixture, viewMode: BsDatepickerViewMode): void {
  getContainer(fixture).setViewMode(viewMode);
  fixture.detectChanges();
}

/**
 * Regression guard for #6827.
 *
 * The calendar view models are rebuilt from scratch on every navigation, so any `@for`
 * that tracks by object identity destroys and re-creates its entire collection. Angular
 * reports that as NG0956.
 *
 * Note that a single `track` regression can mask the others: while the outer `@for` over
 * the calendars re-creates `<bs-days-calendar-view>`, the inner loops over weeks and days
 * run inside a brand-new component instance, so nothing is *re-*created at that level and
 * they stay silent. All the track expressions therefore have to be checked together, and
 * both the single-calendar and the two-calendar (range) layouts have to be covered.
 */
describe('datepicker: @for track expressions must not re-create collections (NG0956)', () => {
  let fixture: ComponentFixture<DatepickerTestComponent>;
  let warnSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    declarations: [DatepickerTestComponent],
    imports: [BsDatepickerModule]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerTestComponent);
    fixture.detectChanges();
    // Spy only after the first render — initial creation can never trip NG0956.
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => warnSpy.mockRestore());

  it('should not warn when navigating the days calendar', () => {
    navigateMonths(fixture, 3);

    expect(trackingWarnings(warnSpy)).toEqual([]);
  });

  it('should still render a full day grid after navigating', () => {
    navigateMonths(fixture, 2);

    const cells = fixture.nativeElement.querySelectorAll('td[role="gridcell"]').length;
    expect(cells).toBeGreaterThan(0);
    expect(cells % 7).toBe(0);
  });

  it('should not warn when navigating the months calendar', () => {
    switchViewMode(fixture, 'month');

    navigateMonths(fixture, 2);

    expect(trackingWarnings(warnSpy)).toEqual([]);
  });

  it('should not warn when navigating the years calendar', () => {
    switchViewMode(fixture, 'year');

    navigateMonths(fixture, 2);

    expect(trackingWarnings(warnSpy)).toEqual([]);
  });

  it('should not warn when switching back and forth between view modes', () => {
    for (const viewMode of ['year', 'month', 'day', 'month', 'year'] as const) {
      switchViewMode(fixture, viewMode);
    }

    expect(trackingWarnings(warnSpy)).toEqual([]);
  });
});

describe('daterangepicker: @for track expressions must not re-create collections (NG0956)', () => {
  let fixture: ComponentFixture<DaterangepickerTestComponent>;
  let warnSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    declarations: [DaterangepickerTestComponent],
    imports: [BsDatepickerModule]
  }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaterangepickerTestComponent);
    fixture.detectChanges();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => warnSpy.mockRestore());

  // The range picker renders two side-by-side calendars, which is the "collection of
  // size 2" the issue reporter saw.
  it('should not warn when navigating with two calendars displayed', () => {
    navigateMonths(fixture, 3);

    expect(trackingWarnings(warnSpy)).toEqual([]);
  });

  it('should keep both calendars rendered after navigating', () => {
    navigateMonths(fixture, 2);

    expect(fixture.nativeElement.querySelectorAll('bs-days-calendar-view').length).toBe(2);
  });
});
