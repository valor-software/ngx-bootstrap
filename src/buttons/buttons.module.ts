import { NgModule, ModuleWithProviders } from '@angular/core';

import { ButtonCheckboxDirective } from './button-checkbox.directive';
import { ButtonRadioDirective } from './button-radio.directive';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';

@NgModule({
  declarations: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective],
  exports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective]
})
export class ButtonsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ButtonsModule, providers: [] };
  }
}
