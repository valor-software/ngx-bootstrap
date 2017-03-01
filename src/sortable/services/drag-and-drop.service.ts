import { Injectable, EventEmitter } from '@angular/core';

import { DraggableElementDirective } from '../directives';
import { DropZoneContainer, Point, DropZone, GrabbedElement } from '../models';
import { PointHelper } from '../point.helper';

@Injectable()
export class DragAndDropService {
  public dragend: EventEmitter<any> = new EventEmitter<any>();

  private containers: DropZoneContainer[] = [];
  private grabbedElement: GrabbedElement;
  private grabbedElementGhost: HTMLElement;
  private touchOffset: Point;
  private touchId: number;

  public registerContainer(dropZoneContainer: DropZoneContainer): void {
    if (this.containers.find((x: DropZoneContainer) => x.id === dropZoneContainer.id)) {
      throw new Error(`drop zone container with id '${dropZoneContainer.id}' already exists`);
    }
    this.containers.push(dropZoneContainer);
  }

  public updateGrabbedElement(grabbedElement: DraggableElementDirective): void {
    this.grabbedElement.element = grabbedElement;
  }

  public getGrabbedElement(): GrabbedElement {
    return this.grabbedElement;
  }

  public captureGrabbedElement(dropZoneContainerId: string): void {
    if (this.grabbedElement.dropZoneContainerId && dropZoneContainerId && dropZoneContainerId !== this.grabbedElement.dropZoneContainerId) {
      this.containers.find((x: DropZoneContainer) => x.id === this.grabbedElement.dropZoneContainerId).dropZone.removeGrabbedItem(this.grabbedElement);
      this.grabbedElement.dropZoneContainerId = undefined;
    }
  }

  public startDragElement(grabbedElement: GrabbedElement, touch: Touch = undefined, ghostClassName: string = ''): void {
    this.stopDragElement();
    if (touch) {
      this.grabbedElementGhost = this.createGhost(
        grabbedElement.element.host.nativeElement,
        ghostClassName,
        { x: touch.clientX, y: touch.clientY }
      );
      document.children[0].appendChild(this.grabbedElementGhost);
      this.touchId = touch.identifier;
    }
    this.grabbedElement = grabbedElement;
  }

  public stopDragElement(): void {
    this.grabbedElement = undefined;
    this.dragend.emit();
    if (this.grabbedElementGhost) {
      this.grabbedElementGhost.remove();
      this.grabbedElementGhost = undefined;
      this.touchOffset = undefined;
    }
  }

  public onTouchmove(event: TouchEvent): void {
    const grabbedElement = this.getGrabbedElement();
    if (!grabbedElement || !grabbedElement.element) {
      return;
    }
    const touch = this.getTouchById(this.touchId, event.changedTouches);
    if (!touch) {
      return;
    }
    event.preventDefault();
    const point = { x: touch.clientX, y: touch.clientY };
    this.drag(point);
  }

  public containsCurrentTouch(touches: TouchList): boolean {
    return !!this.getTouchById(this.touchId, touches);
  }

  private createGhost(element: HTMLElement, className: string, touchPoint: Point): HTMLElement {
    const ghost = element.cloneNode(true) as HTMLElement;
    const rect = element.getBoundingClientRect();
    ghost.style.position = 'fixed';
    ghost.style.top = `${rect.top}px`;
    ghost.style.left = `${rect.left}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.boxSizing = `border-box`;
    // ghost.style.transform = 'scale(1.0)';
    ghost.style.opacity = '0.9';
    if (className) {
      ghost.classList.add(className);
    }

    this.touchOffset = { x: rect.left + rect.width / 2 - touchPoint.x, y: rect.top + rect.height / 2 - touchPoint.y };
    return ghost;
  }

  private drag(point: Point): void {
    const rectangle = this.grabbedElementGhost.getBoundingClientRect();
    this.grabbedElementGhost.style.top = `${point.y - rectangle.height / 2 + this.touchOffset.y}px`;
    this.grabbedElementGhost.style.left = `${point.x - rectangle.width / 2 + this.touchOffset.x}px`;
    this.fireDragover(point);
  }

  private fireDragover(point: Point): void {
    for (const container of this.containers) {
      if (PointHelper.isPointInRectangle(point, container.nativeElement.getBoundingClientRect())) {
          container.dropZone.dragoverPoint(point, this.getGrabbedElement());
          return;
      }
    }
  }

  private getTouchById(touchId: number, touches: TouchList): Touch {
    let touch: Touch;
    for (let i = 0; i < touches.length; i++) {
      if (touches[i].identifier === this.touchId) {
        touch = touches[i];
      }
    }
    return touch;
  }
}
