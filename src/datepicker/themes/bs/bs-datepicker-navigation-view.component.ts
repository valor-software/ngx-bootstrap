import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BsNavigationEvent, MonthViewModel, TimeUnit } from '../../models/index';

@Component({
  selector: 'bs-datepicker-navigation-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="previous"
            [style.visibility]="month.hideLeftArrow ? 'hidden' : 'visible'"
            (click)="navTo({month: -1})"><span>&lsaquo;</span>
    </button>
    <button class="current" (click)="viewMode('months')"><span>{{month.monthTitle}}</span>
    </button>
    <button class="current" (click)="viewMode('years')"><span>{{month.yearTitle}}</span>
    </button>
    <button class="next"
            [style.visibility]="month.hideRightArrow ? 'hidden' : 'visible'"
            (click)="navTo({month: 1})"><span>&rsaquo;</span>
    </button>
  `
})
export class BsDatepickerNavigationViewComponent {
  @Input() month: MonthViewModel;
  @Output() onNavigate = new EventEmitter<BsNavigationEvent>();

  navTo(step: TimeUnit): void {
    this.onNavigate.emit({step});
  }

  viewMode(v: string) {}
}
