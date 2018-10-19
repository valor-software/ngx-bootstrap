import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var DraggableItemService = (function () {
    function DraggableItemService() {
        this.onCapture = new Subject();
    }
    DraggableItemService.prototype.dragStart = function (item) {
        this.draggableItem = item;
    };
    DraggableItemService.prototype.getItem = function () {
        return this.draggableItem;
    };
    DraggableItemService.prototype.captureItem = function (overZoneIndex, newIndex) {
        if (this.draggableItem.overZoneIndex !== overZoneIndex) {
            this.draggableItem.lastZoneIndex = this.draggableItem.overZoneIndex;
            this.draggableItem.overZoneIndex = overZoneIndex;
            this.onCapture.next(this.draggableItem);
            this.draggableItem = Object.assign({}, this.draggableItem, {
                overZoneIndex: overZoneIndex,
                i: newIndex
            });
        }
        return this.draggableItem;
    };
    DraggableItemService.prototype.onCaptureItem = function () {
        return this.onCapture;
    };
    DraggableItemService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DraggableItemService.ctorParameters = function () { return []; };
    return DraggableItemService;
}());
export { DraggableItemService };
//# sourceMappingURL=draggable-item.service.js.map