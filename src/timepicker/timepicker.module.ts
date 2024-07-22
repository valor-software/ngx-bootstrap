import { NgModule } from '@angular/core';

import { TimepickerComponent } from './timepicker.component';

@NgModule({
    imports: [TimepickerComponent],
    exports: [TimepickerComponent],
})
export class TimepickerModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return TimepickerModule;
  }
}
