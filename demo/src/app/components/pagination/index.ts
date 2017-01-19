import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { PaginationSectionComponent } from './pagination-section.component';
import { PaginationModule } from 'ng2-bootstrap';

import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    PaginationSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    PaginationModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [PaginationSectionComponent]
})
export class DemoPaginationModule {

}
