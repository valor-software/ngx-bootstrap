import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatepickerRenderOptions, DayHoverEvent, DayViewModel, MonthViewModel } from '../../models/index';

@Component({
  selector: `bs-datepicker-month-view`,
  // FIX: day select and hover should mutate day or use separate component
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table role="grid" class="days weeks">
      <thead>
      <tr>
        <th *ngIf="options.showWeekNumbers"></th><!--if show weeks-->
        <th *ngFor="let weekday of month.weekdays; let i = index"
            aria-label="weekday">{{ month.weekdays[i] }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let week of month.weeks; let i = index">
        <td class="week" *ngIf="options.showWeekNumbers"><span>{{ month.weekNumbers[i] }}</span>
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
export class BsDatepickerMonthViewComponent {
  @Input() month: MonthViewModel;
  @Input() options: DatepickerRenderOptions;

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<DayHoverEvent>();

  selectDay(event: DayViewModel): void {
    this.onSelect.emit(event);
  }

  hoverDay(event: DayHoverEvent): void {
    this.onHover.emit(event);
  }
}

