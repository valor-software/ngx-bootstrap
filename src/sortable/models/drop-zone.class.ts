import { Point } from './point.class';
import { GrabbedElement } from './grabbed-element.class';

export interface DropZone {
  dragoverPoint(point: Point, grabbedElement: GrabbedElement): void;
  finalizeDrag(): void;
  removeGrabbedItem(grabbedItem: GrabbedElement): void;
}
