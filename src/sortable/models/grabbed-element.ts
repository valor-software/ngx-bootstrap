import { DraggableElementDirective } from '../directives';

export interface GrabbedElement {
  dropZoneContainerId: string;
  dropZoneGroup: string;
  index: number;
  element: DraggableElementDirective;
}
