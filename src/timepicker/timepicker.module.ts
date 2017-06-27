import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TimepickerComponent } from './timepicker.component';
import { TimepickerConfig } from './timepicker.config';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TimepickerComponent],
  exports: [TimepickerComponent, FormsModule]
})
export class TimepickerModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimepickerModule,
      providers: [TimepickerConfig]
    };
  }
}
