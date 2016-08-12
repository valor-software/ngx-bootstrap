import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeaheadDirective} from './typeahead.directive';
import {TypeaheadContainerComponent} from './typeahead-container.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TypeaheadDirective, TypeaheadContainerComponent],
    exports: [TypeaheadDirective, TypeaheadContainerComponent]
})
export class TypeaheadModule {}
