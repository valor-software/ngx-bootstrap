import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortableComponent } from './components';
import { DropZoneDirective, DraggableElementDirective } from './directives';
import { DragAndDropService } from './services';

@NgModule({
    declarations: [SortableComponent, DropZoneDirective, DraggableElementDirective],
    imports: [CommonModule],
    exports: [SortableComponent, DropZoneDirective, DraggableElementDirective]
})
export class SortableModule {
    public static forRoot(): ModuleWithProviders {
        return {ngModule: SortableModule, providers: [DragAndDropService]};
    }
}
