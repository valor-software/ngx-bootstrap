import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DraggableItem } from './draggable-item';

@Injectable()
export class DraggableItemService {
  private draggableItem?: DraggableItem;

  private onCapture: Subject<DraggableItem> = new Subject<DraggableItem>();

  dragStart(item: DraggableItem): void {
    this.draggableItem = item;
  }

  getItem(): DraggableItem | undefined {
    return this.draggableItem;
  }

  captureItem(overZoneIndex: number, newIndex: number): DraggableItem | undefined {
    if (this.draggableItem && this.draggableItem.overZoneIndex !== overZoneIndex) {
      this.draggableItem.lastZoneIndex = this.draggableItem.overZoneIndex;
      this.draggableItem.overZoneIndex = overZoneIndex;
      this.onCapture.next(this.draggableItem);
      this.draggableItem = Object.assign({}, this.draggableItem, {
        overZoneIndex,
        i: newIndex
      });
    }

    return this.draggableItem;
  }

  onCaptureItem(): Subject<DraggableItem> {
    return this.onCapture;
  }
}
