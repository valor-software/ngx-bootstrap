import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PagerComponent } from './pager.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [CommonModule, PagerComponent, PaginationComponent],
    exports: [PagerComponent, PaginationComponent]
})
export class PaginationModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<PaginationModule> {
    return {
      ngModule: PaginationModule,
      providers: []
    };
  }
}
