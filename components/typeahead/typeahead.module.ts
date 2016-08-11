import {NgModule} from '@angular/core';
import {TypeaheadDirective} from './typeahead.directive';
import {TypeaheadContainerComponent} from './typeahead-container.component';

@NgModule({
    declarations: [TypeaheadDirective, TypeaheadContainerComponent],
    exports: [TypeaheadDirective, TypeaheadContainerComponent]
})
export class TypeaheadModule {}
