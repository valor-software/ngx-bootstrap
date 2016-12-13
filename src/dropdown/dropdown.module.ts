import { NgModule, ModuleWithProviders } from '@angular/core';

import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownDirective } from './dropdown.directive';
import { DropdownConfig } from './dropdown.config';

@NgModule({
  declarations: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective],
  exports: [DropdownDirective, DropdownMenuDirective, DropdownToggleDirective]
})
export class DropdownModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: DropdownModule, providers: [DropdownConfig]};
  }
}
