import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TimepickerComponent } from './timepicker.component';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerConfig } from './timepicker.config';
import { TimepickerStore } from './reducer/timepicker.store';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TimepickerComponent],
  exports: [TimepickerComponent]
})
export class TimepickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimepickerModule,
      providers: [TimepickerConfig, TimepickerActions, TimepickerStore]
    };
  }
}
