import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MonthsCalendarViewModel, MonthHoverEvent, MonthViewModel,
  DatepickerRenderOptions
} from '../../models/index';

@Component({
  selector: 'bs-month-matrix-view',
  template: `
    <table role="grid" class="months">
      <tbody>
      <tr *ngFor="let row of calendar.months">
        <td *ngFor="let month of row" role="gridcell"
            (click)="viewMonth(month)"
            (mouseenter)="hoverMonth(month, true)"
            (mouseleave)="hoverMonth(month, false)"
            [class.disabled]="month.isDisabled"
            [class.is-highlighted]="month.isHovered">
          <span>{{ month.label }}</span>
        </td>
      </tr>
      </tbody>
    </table>
  `
})
export class BsMonthsMatrixViewComponent {
  @Input() calendar: MonthsCalendarViewModel;

  @Output() onSelect = new EventEmitter<MonthViewModel>();
  @Output() onHover = new EventEmitter<MonthHoverEvent>();

  viewMonth(month: MonthViewModel) {
    this.onSelect.emit(month);
  }

  hoverMonth(month: MonthViewModel, isHovered: boolean) {
    this.onHover.emit({month, isHovered});
  }
}
