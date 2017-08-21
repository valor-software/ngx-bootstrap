import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from '@angular/core';
import {
  BsDatepickerViewMode, BsNavigationDirection, BsNavigationEvent,
  DatepickerRenderOptions, DayHoverEvent, DaysCalendarViewModel, DayViewModel
} from '../../models/index';

@Component({
  selector: 'bs-days-calendar-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bs-datepicker bs-timepicker theme-green">
      <div class="bs-datepicker-head">
        <bs-datepicker-navigation-view
          *ngFor="let month of calendars"
          [calendar]="month"
          (onNavigate)="navigateTo($event)"
          (onViewMode)="changeViewMode($event)"
        ></bs-datepicker-navigation-view>
      </div>
      <div class="bs-datepicker-body" *ngFor="let month of calendars">
        <bs-days-matrix-view
          [calendar]="month"
          [options]="options"
          (onHover)="hoverHandler($event)"
          (onSelect)="selectHandler($event)"
        ></bs-days-matrix-view>
      </div>
    </div>
  `
})
export class BsDaysCalendarViewComponent {
  @Input() calendars: DaysCalendarViewModel[];
  @Input() options: DatepickerRenderOptions;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onViewMode = new EventEmitter<BsDatepickerViewMode>();

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<DayHoverEvent>();

  navigateTo(event: BsNavigationDirection): void {
    const step = BsNavigationDirection.DOWN === event ? -1 : 1;
    this.onNavigate.emit({step: {month: step}});
  }

  changeViewMode(event: BsDatepickerViewMode): void {
    this.onViewMode.emit(event);
  }

  hoverHandler(event: DayHoverEvent): void {
    this.onHover.emit(event);
  }

  selectHandler(event: DayViewModel): void {
    this.onSelect.emit(event);
  }
}
