import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortableComponent } from './sortable.component';
import { DraggableItemService } from './draggable-item.service';

@NgModule({
  declarations: [SortableComponent],
  imports: [CommonModule],
  exports: [SortableComponent]
})
export class SortableModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SortableModule, providers: [DraggableItemService] };
  }
}
