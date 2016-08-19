import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TypeaheadContainerComponent} from './typeahead-container.component';
import {TypeaheadDirective} from './typeahead.directive';
import {ComponentsHelper} from '../utils/components-helper.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TypeaheadDirective, TypeaheadContainerComponent],
    exports: [TypeaheadDirective, TypeaheadContainerComponent],
    providers: [ComponentsHelper],
    entryComponents: [TypeaheadContainerComponent]
})
export class TypeaheadModule {}
