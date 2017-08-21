import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BsNavigationEvent, DatepickerRenderOptions, DayHoverEvent, DayViewModel,
  MonthViewModel
} from '../../models/index';

@Component({
  selector: 'bs-datepicker-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bs-datepicker bs-timepicker label-success">
      <div class="bs-datepicker-head label-success">
        <bs-datepicker-navigation-view
          *ngFor="let month of months"
          [month]="month"
          (onNavigate)="navigateTo($event)"></bs-datepicker-navigation-view>
      </div>
      <div class="bs-datepicker-body" *ngFor="let month of months">
        <bs-datepicker-month-view
          [month]="month"
          [options]="options"
          (onHover)="hoverHandler($event)"
          (onSelect)="selectHandler($event)"
        ></bs-datepicker-month-view>
      </div>
    </div>
  `
})
export class BsDatepickerViewComponent {
  @Input() months: MonthViewModel[];

  @Input() options: DatepickerRenderOptions;

  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();
  @Output() onSelect = new EventEmitter<DayViewModel>();
  @Output() onHover = new EventEmitter<DayHoverEvent>();

  navigateTo(event: BsNavigationEvent): void {
    this.onNavigate.emit(event);
  }

  hoverHandler(event: DayHoverEvent): void {
    this.onHover.emit(event);
  }

  selectHandler(event: DayViewModel): void {
    this.onSelect.emit(event);
  }
}
