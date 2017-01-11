import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SortableComponent } from './sortable.component';
import { DraggableItemService } from './draggable-item.service';

@NgModule({
    declarations: [
        SortableComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        BrowserModule,
        SortableComponent
    ]
})
export class SortableModule {
    public static forRoot(): ModuleWithProviders {
        return {ngModule: SortableModule, providers: [DraggableItemService]};
    }
}
