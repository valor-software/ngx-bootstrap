import { NgModule, ModuleWithProviders } from '@angular/core';

import { ButtonCheckboxDirective } from './button-checkbox.directive';
import { ButtonRadioDirective } from './button-radio.directive';

@NgModule({
  declarations: [ButtonCheckboxDirective, ButtonRadioDirective],
  exports: [ButtonCheckboxDirective, ButtonRadioDirective]
})
export class ButtonsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ButtonsModule, providers: [] };
  }
}
