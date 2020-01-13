export interface DraggableItem {
  event: DragEvent;
  /* tslint:disable-next-line: no-any */
  item: any;
  i: number;
  initialIndex: number;
  lastZoneIndex: number;
  overZoneIndex: number;
}
