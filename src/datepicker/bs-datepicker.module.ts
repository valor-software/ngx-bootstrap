import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BsDatepickerActions } from './reducer/bs-datepicker.actions';
import { BsDatepickerStore } from './reducer/bs-datepicker.store';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { BsDatepickerNavigationViewComponent } from './themes/bs/bs-datepicker-navigation-view.component';
import { BsDaysCalendarViewComponent } from './themes/bs/bs-days-calendar-view.component';
import { BsDatepickerEffects } from './reducer/bs-datepicker.effects';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';
import { BsDaterangepickerComponent } from './bs-daterangepicker.component';
import { BsDatepickerComponent } from './bs-datepicker.component';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { PositioningService } from '../positioning/positioning.service';
import { BsDatepickerDayDecoratorComponent } from './themes/bs/bs-datepicker-day-decorator.directive';
import { BsMonthCalendarViewComponent } from './themes/bs/bs-months-calendar-view.component';
import { BsYearsCalendarViewComponent } from './themes/bs/bs-years-calendar-view.component';
import { BsCustomDatesViewComponent } from './themes/bs/bs-custom-dates-view.component';
import { BsCurrentDateViewComponent } from './themes/bs/bs-current-date-view.component';
import { BsTimepickerViewComponent } from './themes/bs/bs-timepicker-view.component';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsCalendarLayoutComponent } from './themes/bs/bs-calendar-layout.component';
import { BsDatepickerInputDirective } from './bs-datepicker-input.directive';
import { BsDaterangepickerInputDirective } from './bs-daterangepicker-input.directive';

import { warnOnce } from '../utils/warn-once';

const _exports = [
  BsDatepickerContainerComponent,
  BsDaterangepickerContainerComponent,

  BsDatepickerComponent,
  BsDatepickerInputDirective,

  BsDaterangepickerInputDirective,
  BsDaterangepickerComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: [
    BsDatepickerDayDecoratorComponent,
    BsCurrentDateViewComponent,
    BsDatepickerNavigationViewComponent,
    BsTimepickerViewComponent,

    BsCalendarLayoutComponent,
    BsDaysCalendarViewComponent,
    BsMonthCalendarViewComponent,
    BsYearsCalendarViewComponent,

    BsCustomDatesViewComponent,

    ..._exports
  ],
  entryComponents: [
    BsDatepickerContainerComponent,
    BsDaterangepickerContainerComponent
  ],
  exports: _exports
})
export class BsDatepickerModule {
  constructor() {
    warnOnce(`BsDatepickerModule is under development,
      BREAKING CHANGES are possible,
      PLEASE, read changelog`);
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BsDatepickerModule,
      providers: [
        ComponentLoaderFactory,
        PositioningService,
        BsDatepickerStore,
        BsDatepickerActions,
        BsDatepickerConfig,
        BsDatepickerEffects
      ]
    };
  }
}
