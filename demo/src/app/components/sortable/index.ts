import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';

import { SortableSectionComponent } from './sortable-section.component';
import { DEMO_COMPONENTS } from './demos';
import { SortableModule } from 'ng2-bootstrap/sortable';

@NgModule({
  declarations: [
    SortableSectionComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SortableModule.forRoot()
  ],
  exports: [SortableSectionComponent]
})
export class DemoSortableModule {
}
