import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { BarComponent } from './bar.component';
import { ProgressbarComponent } from './progressbar.component';
import { ProgressbarConfig } from './progressbar.config';

@NgModule({
  imports: [CommonModule],
  declarations: [BarComponent, ProgressbarComponent],
  exports: [BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ProgressbarModule, providers: [ProgressbarConfig] };
  }
}
