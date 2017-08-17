import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DayHoverEvent, DayViewModel } from '../../models/index';

@Component({
  selector: 'bs-datepicker-day-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      (click)="selectDay(day)"
      (mouseenter)="hoverDay(day, true)"
      (mouseleave)="hoverDay(day, false)"
      [class.disabled]="day.isDisabled"
      [class.is-highlighted]="day.isHovered"
      [class.is-other-month]="day.isOtherMonth"
      [class.in-range]="day.isInRange"
      [class.select-start]="day.isSelectionStart"
      [class.select-end]="day.isSelectionEnd"
      [class.selected]="day.isSelected"
    >{{day.label}}</span>
  `
})
export class BsDatepickerDayViewComponent {
  @Input() day: DayViewModel;

  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<DayHoverEvent>();

  selectDay(day: DayViewModel): void {
    this.onSelect.emit(day);
  }

  hoverDay(day: DayViewModel, isHovered: boolean): void {
    this.onHover.emit({day, isHovered});
  }
}
