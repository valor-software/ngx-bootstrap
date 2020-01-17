import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  BsDatepickerViewMode,
  BsNavigationDirection,
  BsNavigationEvent,
  CellHoverEvent,
  DatepickerRenderOptions,
  DaysCalendarViewModel,
  DayViewModel, WeekViewModel
} from '../../models';

import { BsDatepickerConfig } from '../../bs-datepicker.config';

@Component({
  selector: 'bs-days-calendar-view',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <!--days matrix-->
      <table role="grid" class="days weeks">
        <thead>
        <tr>
          <!--if show weeks-->
          <th *ngIf="options.showWeekNumbers"></th>
          <th *ngFor="let weekday of calendar.weekdays; let i = index"
              aria-label="weekday">{{ calendar.weekdays[i] }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of calendar.weeks; let i = index">
          <td class="week" [class.active-week]="isWeekHovered"  *ngIf="options.showWeekNumbers">
            <span
                (click)="selectWeek(week)"
                (mouseenter)="weekHoverHandler(week, true)"
                (mouseleave)="weekHoverHandler(week, false)">{{ calendar.weekNumbers[i] }}</span>
          </td>
          <td *ngFor="let day of week.days" role="gridcell">
          <span bsDatepickerDayDecorator
                [day]="day"
                (click)="selectDay(day)"
                (mouseenter)="hoverDay(day, true)"
                (mouseleave)="hoverDay(day, false)">{{ day.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>

    </bs-calendar-layout>
  `
})
export class BsDaysCalendarViewComponent  {
  @Input() calendar: DaysCalendarViewModel;
  @Input() options: DatepickerRenderOptions;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<CellHoverEvent>();
  @Output() onHoverWeek = new EventEmitter<WeekViewModel>();

  isWeekHovered: boolean;

  constructor(private _config: BsDatepickerConfig) { }

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({ step: { month: step } });
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }

  selectDay(event: DayViewModel): void {
    this.onSelect.emit(event);
  }

  selectWeek(week: WeekViewModel): void {
    if (!this._config.selectWeek) {
      return;
    }

    if (week.days
      && week.days[0]
      && !week.days[0].isDisabled
      && this._config.selectFromOtherMonth) {

      this.onSelect.emit(week.days[0]);

      return;
    }

    if (week.days.length === 0) {
      return;
    }

    const selectedDay = week.days.find((day: DayViewModel) => {
      return this._config.selectFromOtherMonth
        ? !day.isDisabled
        : !day.isOtherMonth && !day.isDisabled;
    });

    this.onSelect.emit(selectedDay);
  }

  weekHoverHandler(cell: WeekViewModel, isHovered: boolean): void {
    if (!this._config.selectWeek) {
      return;
    }

    const hasActiveDays = cell.days.find((day: DayViewModel) => {
      return this._config.selectFromOtherMonth
        ? !day.isDisabled
        : !day.isOtherMonth && !day.isDisabled;
    });

    if (hasActiveDays) {
      cell.isHovered = isHovered;
      this.isWeekHovered = isHovered;
      this.onHoverWeek.emit(cell);
    }
  }

  hoverDay(cell: DayViewModel, isHovered: boolean): void {
    if (this._config.selectFromOtherMonth && cell.isOtherMonth) {
      cell.isOtherMonthHovered = isHovered;
    }

    this.onHover.emit({ cell, isHovered });
  }
}
