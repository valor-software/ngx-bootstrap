import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaginationComponent, PagerComponent],
  exports: [PaginationComponent, PagerComponent]
})
export class PaginationModule {
}
