import { NgModule } from '@angular/core';

import { ButtonCheckboxDirective } from './button-checkbox.directive';
import { ButtonRadioDirective } from './button-radio.directive';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';

@NgModule({
    imports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective],
    exports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective]
})
export class ButtonsModule {}
