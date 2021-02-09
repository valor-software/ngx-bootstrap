import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { isSameDay } from 'ngx-bootstrap/chronos';

import {
  BsDatepickerViewMode,
  BsNavigationDirection,
  BsNavigationEvent,
  CellHoverEvent, DatepickerDateTooltipText,
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
            <span *ngIf="isiOS" (click)="selectWeek(week)">{{ calendar.weekNumbers[i] }}</span>
            <span *ngIf="!isiOS"
                (click)="selectWeek(week)"
                (mouseenter)="weekHoverHandler(week, true)"
                (mouseleave)="weekHoverHandler(week, false)">{{ calendar.weekNumbers[i] }}</span>
          </td>
          <td *ngFor="let day of week.days" role="gridcell">

            <!-- When we want to show tooltips for dates -->
            <span *ngIf="!isiOS && isShowTooltip" bsDatepickerDayDecorator
                [day]="day"
                (click)="selectDay(day)"
                tooltip="{{day.tooltipText}}"
                (mouseenter)="hoverDay(day, true)"
                (mouseleave)="hoverDay(day, false)">{{ day.label }} 3</span>
            <!-- When tooltips for dates are disabled -->
            <span *ngIf="!isiOS && !isShowTooltip" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)"
                  (mouseenter)="hoverDay(day, true)"
                  (mouseleave)="hoverDay(day, false)">{{ day.label }} 2</span>

            <!-- For mobile iOS view, tooltips are not needed -->
            <span *ngIf="isiOS" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)">{{ day.label }} 1</span>
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
  isiOS: boolean;
  isShowTooltip: boolean;

  constructor(private _config: BsDatepickerConfig) {
    this.isiOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    if (this._config.dateTooltipTexts && this._config.dateTooltipTexts.length > 0) {
      this.isShowTooltip = true;
    }
  }

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
    if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
      return;
    }

    if (week.days.length === 0) {
      return;
    }

    if (this._config.selectWeek && week.days[0]
        && !week.days[0].isDisabled
        && this._config.selectFromOtherMonth) {

        this.onSelect.emit(week.days[0]);

        return;
    }

    const selectedDay = week.days.find((day: DayViewModel) => {
      return this._config.selectFromOtherMonth
        ? !day.isDisabled
        : !day.isOtherMonth && !day.isDisabled;
    });

    this.onSelect.emit(selectedDay);

    if (this._config.selectWeekDateRange) {
      const days = week.days.slice(0);
      const lastDayOfRange = days.reverse().find((day: DayViewModel) => {
        return this._config.selectFromOtherMonth
          ? !day.isDisabled
          : !day.isOtherMonth && !day.isDisabled;
      });

      this.onSelect.emit(lastDayOfRange);
    }
  }

  weekHoverHandler(cell: WeekViewModel, isHovered: boolean): void {
    if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
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

    if (this._config.dateTooltipTexts) {
      cell.tooltipText = '';
      this._config.dateTooltipTexts.forEach((dateData: DatepickerDateTooltipText) => {

        if (isSameDay(dateData.date, cell.date)) {
          cell.tooltipText = dateData.tooltipText;

          return;
        }
      });
    }

    this.onHover.emit({ cell, isHovered });
  }
}
