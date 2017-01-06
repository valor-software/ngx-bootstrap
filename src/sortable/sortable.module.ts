import { NgModule } from '@angular/core';
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
    ],
    providers: [
        DraggableItemService
    ]
})
export class SortableModule { }
