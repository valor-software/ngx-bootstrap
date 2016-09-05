import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PaginationComponent, PagerComponent],
  exports: [PaginationComponent, PagerComponent]
})
export class PaginationModule {
}
