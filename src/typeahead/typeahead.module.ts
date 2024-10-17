import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';

@NgModule({
    imports: [CommonModule, TypeaheadContainerComponent, TypeaheadDirective],
    exports: [TypeaheadContainerComponent, TypeaheadDirective]
})
export class TypeaheadModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<TypeaheadModule> {
    return {
      ngModule: TypeaheadModule,
      providers: []
    };
  }
}
