import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentLoaderFactory } from '../component-loader';
import { PositioningService } from '../positioning';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TypeaheadContainerComponent, TypeaheadDirective],
  exports: [FormsModule, TypeaheadContainerComponent, TypeaheadDirective],
  providers: [ComponentLoaderFactory, PositioningService],
  entryComponents: [TypeaheadContainerComponent]
})
export class TypeaheadModule {
}
