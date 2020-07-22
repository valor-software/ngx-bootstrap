import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { BarComponent } from './bar.component';
import { ProgressbarComponent } from './progressbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BarComponent, ProgressbarComponent],
  exports: [BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {
  static forRoot(): ModuleWithProviders<ProgressbarModule> {
    return { ngModule: ProgressbarModule, providers: [] };
  }
}
