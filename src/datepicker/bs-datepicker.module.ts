import { CommonModule } from '@angular/common';
import { isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { BsDatepickerActions } from './reducer/bs-datepicker.actions';
import { BsDatepickerStore } from './reducer/bs-datepicker.store';
import { BsDatepickerContainerComponent } from './themes/bs/bs-datepicker-container.component';
import { BsDatepickerMonthViewComponent } from './themes/bs/bs-datepicker-month-view.component';
import { BsDatepickerNavigationViewComponent } from './themes/bs/bs-datepicker-navigation-view.component';
import { BsDatepickerViewComponent } from './themes/bs/bs-datepicker-view.component';
import { BsDatepickerConfig } from './bs-datepicker-config';
import { BsDatepickerEffects } from './reducer/bs-datepicker.effects';
import { BsDaterangepickerContainerComponent } from './themes/bs/bs-daterangepicker-container.component';
import { BsDaterangepickerComponent } from './bs-daterangepicker.component';
import { BsDatepickerComponent } from './bs-datepicker.component';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { PositioningService } from '../positioning/positioning.service';
import { BsDatepickerDayDecoratorComponent } from './themes/bs/bs-datepicker-day-decorator.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BsDatepickerMonthViewComponent,
    BsDatepickerViewComponent,
    BsDatepickerNavigationViewComponent,
    BsDatepickerDayDecoratorComponent,
    BsDatepickerContainerComponent,
    BsDaterangepickerContainerComponent,
    BsDatepickerComponent,
    BsDaterangepickerComponent
  ],
  entryComponents: [BsDatepickerContainerComponent, BsDaterangepickerContainerComponent],
  exports: [BsDatepickerContainerComponent, BsDaterangepickerContainerComponent,
    BsDatepickerComponent, BsDaterangepickerComponent]
})
export class BsDatepickerModule {
  constructor() {
    if (isDevMode()) {
      console.warn(`BsDatepickerModule is under development,
      BREAKING CHANGES are possible,
      PLEASE, read changelog`);
    }
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BsDatepickerModule,
      providers: [
        ComponentLoaderFactory, PositioningService,
        BsDatepickerStore, BsDatepickerActions, BsDatepickerConfig, BsDatepickerEffects]
    };
  }
}
