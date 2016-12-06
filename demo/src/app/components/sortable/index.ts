import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';

import { SortableSectionComponent } from './sortable.component';
import { SortableDemoComponent } from './demos/sortable-demo.component';
import { SortableModule } from 'ng2-bootstrap/sortable';

@NgModule({
  declarations: [
    SortableSectionComponent,
    SortableDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SortableModule
  ],
  exports: [SortableSectionComponent]
})
export class DemoSortableModule {
}
