import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusTrapDirective } from './focus-trap';

@NgModule({
    imports: [CommonModule, FocusTrapDirective],
    exports: [FocusTrapDirective]
})
export class FocusTrapModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<FocusTrapModule> {
    return {
      ngModule: FocusTrapModule,
      providers: []
    };
  }
}
