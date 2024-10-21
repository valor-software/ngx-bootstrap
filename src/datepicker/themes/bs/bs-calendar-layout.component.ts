import { Component } from '@angular/core';
import { BsTimepickerViewComponent } from './bs-timepicker-view.component';
import { BsCurrentDateViewComponent } from './bs-current-date-view.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'bs-calendar-layout',
    template: `
    <!-- current date, will be added in nearest releases -->
    <bs-current-date title="hey there" *ngIf="false"></bs-current-date>

    <!--navigation-->
    <div class="bs-datepicker-head">
      <ng-content select="bs-datepicker-navigation-view"></ng-content>
    </div>

    <div class="bs-datepicker-body">
      <ng-content></ng-content>
    </div>

    <!--timepicker-->
    <bs-timepicker *ngIf="false"></bs-timepicker>
  `,
    standalone: true,
    imports: [NgIf, BsCurrentDateViewComponent, BsTimepickerViewComponent]
})
export class BsCalendarLayoutComponent {}
