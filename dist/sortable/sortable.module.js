import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableComponent } from './sortable.component';
import { DraggableItemService } from './draggable-item.service';
var SortableModule = (function () {
    function SortableModule() {
    }
    SortableModule.forRoot = function () {
        return { ngModule: SortableModule, providers: [DraggableItemService] };
    };
    SortableModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [SortableComponent],
                    imports: [CommonModule],
                    exports: [SortableComponent]
                },] },
    ];
    /** @nocollapse */
    SortableModule.ctorParameters = function () { return []; };
    return SortableModule;
}());
export { SortableModule };
//# sourceMappingURL=sortable.module.js.map