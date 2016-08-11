import {NgModule} from '@angular/core';
import {PaginationComponent} from './pagination.component';
import {PagerComponent} from './pager.component';

@NgModule({
    declarations: [PaginationComponent, PagerComponent],
    exports: [PaginationComponent, PagerComponent]
})
export class PaginationModule {}
