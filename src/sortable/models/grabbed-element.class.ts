import { BsDraggableDirective } from '../directives';

export interface GrabbedElement {
  dropZoneContainerId: string;
  dropZoneGroup: string;
  index: number;
  element: BsDraggableDirective;
}
