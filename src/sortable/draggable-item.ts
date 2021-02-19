export interface DraggableItem {
  event: DragEvent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  i: number;
  initialIndex: number;
  lastZoneIndex: number;
  overZoneIndex: number;
}
