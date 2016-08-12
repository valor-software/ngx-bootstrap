import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination.component';
import {PagerComponent} from './pager.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PaginationComponent, PagerComponent],
    exports: [PaginationComponent, PagerComponent]
})
export class PaginationModule {}
