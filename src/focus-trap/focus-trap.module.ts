import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusTrapManager } from './focus-trap-manager';
import { InteractivityChecker } from './interactivity-checker';
import { FocusTrapDirective } from './focus-trap';
import { Platform } from './platform';

@NgModule({
  imports: [CommonModule],
  declarations: [FocusTrapDirective],
  exports: [FocusTrapDirective]
})
export class FocusTrapModule {
  static forRoot(): ModuleWithProviders<FocusTrapModule> {
    return {
      ngModule: FocusTrapModule,
      providers: [
        FocusTrapManager,
        Platform,
        InteractivityChecker
      ]
    };
  }
}
