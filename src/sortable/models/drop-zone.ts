import { Point } from './point';
import { GrabbedElement } from './grabbed-element';

export interface DropZone {
  dragoverPoint(point: Point, grabbedElement: GrabbedElement): void;
  finalizeDrag(): void;
  removeGrabbedItem(grabbedItem: GrabbedElement): void;
}
