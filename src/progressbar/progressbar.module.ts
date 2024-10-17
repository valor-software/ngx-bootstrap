import { ModuleWithProviders, NgModule } from '@angular/core';

import { BarComponent } from './bar.component';
import { ProgressbarComponent } from './progressbar.component';

@NgModule({
    imports: [BarComponent, ProgressbarComponent],
    exports: [BarComponent, ProgressbarComponent]
})
export class ProgressbarModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<ProgressbarModule> {
    return {
      ngModule: ProgressbarModule,
      providers: []
    };
  }
}
