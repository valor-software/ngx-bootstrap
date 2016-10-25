import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TypeaheadContainerComponent,TestComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentsHelper } from '../utils/components-helper.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TypeaheadContainerComponent, TypeaheadDirective,TestComponent],
  exports: [FormsModule, TypeaheadContainerComponent, TypeaheadDirective,TestComponent],
  providers: [ComponentsHelper],
  entryComponents: [TypeaheadContainerComponent]
})
export class TypeaheadModule {
}
