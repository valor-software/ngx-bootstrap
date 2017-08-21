import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DatepickerRenderOptions, DayHoverEvent, DayViewModel, DaysCalendarViewModel
} from '../../models/index';

@Component({
  selector: `bs-days-matrix-view`,
  // FIX: day select and hover should mutate day or use separate component
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table role="grid" class="days weeks">
      <thead>
      <tr>
        <th *ngIf="options.showWeekNumbers"></th><!--if show weeks-->
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
  `
})
export class BsDaysMatrixViewComponent {
  @Input() calendar: DaysCalendarViewModel;
  @Input() options: DatepickerRenderOptions;

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<DayHoverEvent>();

  selectDay(event: DayViewModel): void {
    this.onSelect.emit(event);
  }

  hoverDay(day: DayViewModel, isHovered: boolean): void {
    this.onHover.emit({day, isHovered});
  }
}

