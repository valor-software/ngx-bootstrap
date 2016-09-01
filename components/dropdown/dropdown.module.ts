import { NgModule } from '@angular/core';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective],
  exports: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective]
})
export class DropdownModule {
}
