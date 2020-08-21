import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProgressbarComponent } from './progressbar.component';
import { ProgressbarConfig } from './progressbar.config';

@NgModule({
  imports: [CommonModule],
  declarations: [ProgressbarComponent],
  exports: [ProgressbarComponent]
})
export class ProgressbarModule {
  static forRoot(): ModuleWithProviders<ProgressbarModule> {
    return { ngModule: ProgressbarModule, providers: [ProgressbarConfig] };
  }
}
