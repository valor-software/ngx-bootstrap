import { DropdownMenuDirective } from './dropdown/dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown/dropdown-toggle.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';

export { DropdownMenuDirective } from './dropdown/dropdown-menu.directive';
export { DropdownToggleDirective } from './dropdown/dropdown-toggle.directive';
export { DropdownDirective } from './dropdown/dropdown.directive';
export { DropdownModule } from './dropdown/dropdown.module';

/** @deprecated */
export const DROPDOWN_DIRECTIVES:Array<any> = [DropdownDirective, DropdownToggleDirective, DropdownMenuDirective];
