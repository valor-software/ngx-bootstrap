export interface DraggableItem {
    event: DragEvent;
    item: any;
    i: number;
    initialIndex: number;
    lastZoneIndex: number;
    overZoneIndex: number;
}
