import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BsDatepickerViewMode, BsNavigationDirection,
  BsNavigationEvent,
  DatepickerRenderOptions, MonthHoverEvent, MonthsCalendarViewModel,
  MonthViewModel, YearHoverEvent, YearsCalendarViewModel, YearViewModel
} from '../../models/index';
import { yearsPerCalendar } from '../../engine/format-years-calendar';

@Component({
  selector: 'bs-years-calendar-view',
  template: `
    <div class="bs-datepicker bs-timepicker theme-green">
      <div *ngFor="let calendar of calendars"
           [class.bs-datepicker-multiple]="calendars.length > 1">
        <div class="bs-datepicker-head">
          <bs-datepicker-navigation-view
            [calendar]="calendar"
            (onNavigate)="navigateTo($event)"
            (onViewMode)="changeViewMode($event)"
          ></bs-datepicker-navigation-view>
        </div>
        <div class="bs-datepicker-body">
          <bs-years-matrix-view
            [calendar]="calendar"
            (onHover)="hoverHandler($event)"
            (onSelect)="selectHandler($event)"
          ></bs-years-matrix-view>
        </div>
      </div>
    </div>
  `
})
export class BsYearsCalendarViewComponent {
  @Input() calendars: YearsCalendarViewModel[];

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<YearViewModel>();
  @Output() onHover = new EventEmitter<YearHoverEvent>();

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({step: {year: step * yearsPerCalendar}});
  }

  selectHandler(event: YearViewModel): void {
    this.onSelect.emit(event);
  }

  hoverHandler(event: YearHoverEvent): void {
    this.onHover.emit(event);
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }
}
