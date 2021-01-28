import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { BsDatepickerInputDirective } from './bs-datepicker-input.directive';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsDaterangepickerInputDirective } from './bs-daterangepicker-input.directive';
import { BsDaterangepickerDirective } from './bs-daterangepicker.component';

import { BsDatepickerInlineDirective } from './bs-datepicker-inline.component';

import { BsLocaleService } from './bs-locale.service';
import { BsDatepickerActions } from './reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from './reducer/bs-datepicker.effects';
import { BsDatepickerStore } from './reducer/bs-datepicker.store';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';

import { BsDatepickerInlineContainerComponent } from './themes/bs/bs-datepicker-inline-container.component';
import { BsDaterangepickerInlineContainerComponent } from './themes/bs/bs-daterangepicker-inline-container.component';

import { BsDaterangepickerInlineDirective } from './bs-daterangepicker-inline.component';

import { BsCalendarLayoutComponent } from './themes/bs/bs-calendar-layout.component';
import { BsCurrentDateViewComponent } from './themes/bs/bs-current-date-view.component';
import { BsCustomDatesViewComponent } from './themes/bs/bs-custom-dates-view.component';
import { BsDatepickerDayDecoratorComponent } from './themes/bs/bs-datepicker-day-decorator.directive';
import { BsDatepickerNavigationViewComponent } from './themes/bs/bs-datepicker-navigation-view.component';
import { BsDaysCalendarViewComponent } from './themes/bs/bs-days-calendar-view.component';
import { BsMonthCalendarViewComponent } from './themes/bs/bs-months-calendar-view.component';
import { BsTimepickerViewComponent } from './themes/bs/bs-timepicker-view.component';
import { BsYearsCalendarViewComponent } from './themes/bs/bs-years-calendar-view.component';

@NgModule({
  imports: [CommonModule, TooltipModule.forRoot()],
  declarations: [
    BsCalendarLayoutComponent,
    BsCurrentDateViewComponent,
    BsCustomDatesViewComponent,
    BsDatepickerDayDecoratorComponent,
    BsDatepickerNavigationViewComponent,
    BsDaysCalendarViewComponent,
    BsMonthCalendarViewComponent,
    BsTimepickerViewComponent,
    BsYearsCalendarViewComponent,
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
    BsDatepickerInlineContainerComponent,
    BsDatepickerInlineDirective,
    BsDatepickerInputDirective,
    BsDaterangepickerContainerComponent,
    BsDaterangepickerDirective,
    BsDaterangepickerInlineContainerComponent,
    BsDaterangepickerInlineDirective,
    BsDaterangepickerInputDirective
  ],
  entryComponents: [
    BsDatepickerContainerComponent,
    BsDaterangepickerContainerComponent,
    BsDatepickerInlineContainerComponent,
    BsDaterangepickerInlineContainerComponent
  ],
  exports: [
    BsDatepickerContainerComponent,
    BsDatepickerDirective,
    BsDatepickerInlineContainerComponent,
    BsDatepickerInlineDirective,
    BsDatepickerInputDirective,
    BsDaterangepickerContainerComponent,
    BsDaterangepickerDirective,
    BsDaterangepickerInlineContainerComponent,
    BsDaterangepickerInlineDirective,
    BsDaterangepickerInputDirective
  ]
})
export class BsDatepickerModule {
  static forRoot(): ModuleWithProviders<BsDatepickerModule> {
    return {
      ngModule: BsDatepickerModule,
      providers: [
        ComponentLoaderFactory,
        PositioningService,
        BsDatepickerStore,
        BsDatepickerActions,
        BsDatepickerEffects,
        BsLocaleService
      ]
    };
  }
}
