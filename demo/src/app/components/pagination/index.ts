import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { PaginationDemoComponent } from './demos/pagination-demo.component';
import { PaginationSectionComponent } from './pagination-section.component';
import { PaginationModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    PaginationDemoComponent,
    PaginationSectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule
  ],
  exports: [PaginationSectionComponent]
})
export class DemoPaginationModule {

}
