import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [CommonModule, PagerComponent, PaginationComponent],
    exports: [PagerComponent, PaginationComponent]
})
export class PaginationModule {}
