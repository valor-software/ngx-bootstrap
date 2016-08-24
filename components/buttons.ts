import { ButtonCheckboxDirective } from './buttons/button-checkbox.directive';
import { ButtonRadioDirective } from './buttons/button-radio.directive';

export { ButtonCheckboxDirective } from './buttons/button-checkbox.directive';
export { ButtonRadioDirective } from './buttons/button-radio.directive';
export { ButtonsModule } from './buttons/buttons.module';

/** @deprecated */
export const BUTTON_DIRECTIVES:Array<any> = [ButtonCheckboxDirective, ButtonRadioDirective];
