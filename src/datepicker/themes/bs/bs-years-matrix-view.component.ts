import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonthViewModel, YearHoverEvent, YearsCalendarViewModel, YearViewModel } from '../../models/index';

@Component({
  selector: 'bs-years-matrix-view',
  template: `
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
  `
})
export class BsYearsMatrixViewComponent {
  @Input() calendar: YearsCalendarViewModel;

  @Output() onSelect = new EventEmitter<YearViewModel>();
  @Output() onHover = new EventEmitter<YearHoverEvent>();

  viewYear(year: MonthViewModel) {
    this.onSelect.emit(year);
  }

  hoverYear(year: MonthViewModel, isHovered: boolean) {
    this.onHover.emit({year, isHovered});
  }
}
