import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonCheckboxDirective } from './button-checkbox.directive';
import { ButtonRadioDirective } from './button-radio.directive';

@NgModule({
  imports: [FormsModule],
  declarations: [ButtonCheckboxDirective, ButtonRadioDirective],
  exports: [ButtonCheckboxDirective, ButtonRadioDirective, FormsModule]
})
export class ButtonsModule {
}
