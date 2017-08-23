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
    <!--current date-->
    <bs-current-date title="hey there"></bs-current-date>
    
    <div class="bs-datepicker-head">
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>
    </div>
    <div class="bs-datepicker-body">
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
    </div>
  `
})
export class BsYearsCalendarViewComponent {
  @Input() calendar: YearsCalendarViewModel;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<YearViewModel>();
  @Output() onHover = new EventEmitter<YearHoverEvent>();

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({step: {year: step * yearsPerCalendar}});
  }

  viewYear(year: MonthViewModel) {
    this.onSelect.emit(year);
  }

  hoverYear(year: MonthViewModel, isHovered: boolean) {
    this.onHover.emit({year, isHovered});
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }
}
