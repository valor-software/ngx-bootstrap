import {NgModule} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';
import {DropdownMenuDirective} from './dropdown-menu.directive';
import {DropdownToggleDirective} from './dropdown-toggle.directive';

@NgModule({
    declarations: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective],
    exports: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective]
})
export class DropdownModule {}
