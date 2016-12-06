import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SortableComponent } from './components';
import { DraggableItemService } from './services';

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
