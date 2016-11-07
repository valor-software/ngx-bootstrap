import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationConfig } from './config';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PagerComponent, PaginationComponent],
  exports: [FormsModule, PagerComponent, PaginationComponent],
  providers: [PaginationConfig]
})
export class PaginationModule {
}
