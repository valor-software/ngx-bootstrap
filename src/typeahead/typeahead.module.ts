import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentLoaderModule } from 'ngx-bootstrap/component-loader';

@NgModule({
  imports: [CommonModule, ComponentLoaderModule],
  declarations: [TypeaheadContainerComponent, TypeaheadDirective],
  exports: [TypeaheadContainerComponent, TypeaheadDirective],
  entryComponents: [TypeaheadContainerComponent]
})
export class TypeaheadModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TypeaheadModule,
      providers: []
    };
  }
}
