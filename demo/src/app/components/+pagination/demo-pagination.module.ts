import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared';
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
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [PaginationSectionComponent]
})
export class DemoPaginationModule {

}
