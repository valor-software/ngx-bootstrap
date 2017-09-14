import { Component, EventEmitter, Input, Output } from '@angular/core';
import { yearsPerCalendar } from '../../engine/format-years-calendar';
import {
  BsDatepickerViewMode,
  BsNavigationDirection,
  BsNavigationEvent,
  CalendarCellViewModel,
  CellHoverEvent,
  YearsCalendarViewModel
} from '../../models/index';

@Component({
  selector: 'bs-years-calendar-view',
  template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="years">
        <tbody>
        <tr *ngFor="let row of calendar.years">
          <td *ngFor="let year of row" role="gridcell"
              (click)="viewYear(year)"
              (mouseenter)="hoverYear(year, true)"
              (mouseleave)="hoverYear(year, false)"
              [class.disabled]="year.isDisabled"
              [class.is-highlighted]="year.isHovered">
            <span>{{ year.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `
})
export class BsYearsCalendarViewComponent {
  @Input() calendar: YearsCalendarViewModel;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<CalendarCellViewModel>();
  @Output() onHover = new EventEmitter<CellHoverEvent>();

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({ step: { year: step * yearsPerCalendar } });
  }

  viewYear(year: CalendarCellViewModel) {
    this.onSelect.emit(year);
  }

  hoverYear(cell: CalendarCellViewModel, isHovered: boolean) {
    this.onHover.emit({ cell, isHovered });
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }
}
