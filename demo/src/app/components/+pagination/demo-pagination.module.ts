import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { DocsModule } from '../../docs';
import { PaginationSectionComponent } from './pagination-section.component';
import { DEMO_COMPONENTS } from './demos';
import { routes } from './demo-pagination.routes';

@NgModule({
  declarations: [
    PaginationSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    PaginationModule.forRoot(),
    CommonModule,
    FormsModule,
    DocsModule,
    RouterModule.forChild(routes)
  ],
  exports: [PaginationSectionComponent],
  entryComponents: [...DEMO_COMPONENTS]
})
export class DemoPaginationModule {}
