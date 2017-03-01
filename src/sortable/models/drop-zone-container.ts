import { DropZone } from './drop-zone';

export interface DropZoneContainer {
  id: string;
  nativeElement: HTMLElement;
  dropZone: DropZone;
}
