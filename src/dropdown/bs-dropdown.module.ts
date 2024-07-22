import { NgModule } from '@angular/core';

import { BsDropdownContainerComponent } from './bs-dropdown-container.component';
import { BsDropdownMenuDirective } from './bs-dropdown-menu.directive';
import { BsDropdownToggleDirective } from './bs-dropdown-toggle.directive';

import { BsDropdownDirective } from './bs-dropdown.directive';

@NgModule({
    imports: [
      BsDropdownDirective,
      BsDropdownContainerComponent,
      BsDropdownMenuDirective,
      BsDropdownToggleDirective
    ],
    exports: [
        BsDropdownMenuDirective,
        BsDropdownToggleDirective,
        BsDropdownDirective
    ]
})
export class BsDropdownModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot() {
    return BsDropdownModule;
  }
}
