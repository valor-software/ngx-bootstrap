import { Observable } from 'rxjs/Observable';
import { DraggableItem } from './draggable-item';
export declare class DraggableItemService {
    private draggableItem;
    private onCapture;
    dragStart(item: DraggableItem): void;
    getItem(): DraggableItem;
    captureItem(overZoneIndex: number, newIndex: number): DraggableItem;
    onCaptureItem(): Observable<DraggableItem>;
}
