import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { PaginationConfig } from './pagination.config';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PagerComponent, PaginationComponent],
  exports: [PagerComponent, PaginationComponent]
})
export class PaginationModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PaginationModule, providers: [PaginationConfig] };
  }
}
