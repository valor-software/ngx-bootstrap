import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';

@NgModule({
    imports: [CommonModule, TypeaheadContainerComponent, TypeaheadDirective],
    exports: [TypeaheadContainerComponent, TypeaheadDirective]
})
export class TypeaheadModule {}
