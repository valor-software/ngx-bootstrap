import { ModuleWithProviders, NgModule } from '@angular/core';

import { ButtonCheckboxDirective } from './button-checkbox.directive';
import { ButtonRadioDirective } from './button-radio.directive';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';

@NgModule({
    imports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective],
    exports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective]
})
export class ButtonsModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<ButtonsModule> {
    return {
      ngModule: ButtonsModule,
      providers: []
    };
  }
}
