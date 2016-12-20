import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { PaginationDemoComponent } from './demos/pagination-demo.component';
import { PaginationSectionComponent } from './pagination-section.component';
import { PaginationModule } from 'ng2-bootstrap';
import { NgApiDocModule } from '../../api-docs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  declarations: [
    PaginationDemoComponent,
    PaginationSectionComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [PaginationSectionComponent]
})
export class DemoPaginationModule {

}
