import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [SortableComponent, DropZoneDirective, BsDraggableDirective],
    imports: [CommonModule],
    exports: [SortableComponent, DropZoneDirective, BsDraggableDirective]
})
export class BsSortableModule {
    public static forRoot(): ModuleWithProviders {
        return {ngModule: BsSortableModule, providers: [DragAndDropService]};
    }
}
