import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BsDatepickerViewMode, BsNavigationDirection,
  BsNavigationEvent,
  DatepickerRenderOptions, MonthHoverEvent, MonthsCalendarViewModel,
  MonthViewModel
} from '../../models/index';

@Component({
  selector: 'bs-month-calendar-view',
  template: `
    <div class="bs-datepicker bs-timepicker theme-green">
      <div *ngFor="let month of calendars"
           [class.bs-datepicker-multiple]="calendars.length > 1">
        <div class="bs-datepicker-head">
          <bs-datepicker-navigation-view
            [calendar]="month"
            (onNavigate)="navigateTo($event)"
            (onViewMode)="changeViewMode($event)"
          ></bs-datepicker-navigation-view>
        </div>
        <div class="bs-datepicker-body">
          <bs-month-matrix-view
            [calendar]="month"
            (onHover)="hoverHandler($event)"
            (onSelect)="selectHandler($event)"
          ></bs-month-matrix-view>
        </div>
      </div>
    </div>
  `
})
export class BsMonthCalendarViewComponent {
  @Input() calendars: MonthsCalendarViewModel[];

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<MonthViewModel>();
  @Output() onHover = new EventEmitter<MonthHoverEvent>();

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({step: {year: step}});
  }

  hoverHandler(event: MonthHoverEvent): void {
    this.onHover.emit(event);
  }

  selectHandler(event: MonthViewModel): void {
    this.onSelect.emit(event);
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }
}
