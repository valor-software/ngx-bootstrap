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
  DayViewModel
} from '../../models/index';

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
          <td class="week" *ngIf="options.showWeekNumbers">
            <span>{{ calendar.weekNumbers[i] }}</span>
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
export class BsDaysCalendarViewComponent {
  @Input() calendar: DaysCalendarViewModel;
  @Input() options: DatepickerRenderOptions;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<CellHoverEvent>();

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

  hoverDay(cell: DayViewModel, isHovered: boolean): void {
    this.onHover.emit({ cell, isHovered });
  }
}
