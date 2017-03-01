import { DropZone } from './drop-zone.class';

export interface DropZoneContainer {
  id: string;
  nativeElement: HTMLElement;
  dropZone: DropZone;
}
