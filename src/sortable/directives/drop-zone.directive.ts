import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ContentChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  Renderer
} from '@angular/core';

import { DraggableElementDirective } from './draggable-element.directive';
import { DragAndDropService } from '../services';
import { GrabbedElement, Point, DropZone } from '../models';
import { PointHelper } from '../point.helper';
import { ArrayHelper } from '../array.helper';

@Directive({
  selector: '[bsDropZone]',
  exportAs: 'bsDropZone'
})
export class DropZoneDirective implements AfterViewInit, OnInit, DropZone {
  @ContentChildren(DraggableElementDirective) public draggableItems: QueryList<DraggableElementDirective>;

  public activeItemIndex: number = -1;

  /** fired when items array is changed */
  @Output() public itemsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  /** fired when active item index is changed */
  @Output() public activeItemIndexChange: EventEmitter<number> = new EventEmitter<number>();

  /** drop zone name, should be unique for all the Sortable components and dropZone directives on the page */
  @Input() public bsDropZone: string;

  /** if true disabled items won't move during sorting, doesn't affect case if an item was removed or inserted into the conteiner */
  @Input() public fixDisabledItems: boolean;

  /** data which is handled by the drop zone */
  @Input() public items: any[];

  /** names of drop zones from which elements could be dragged */
  @Input() public acceptFromZones: string[] = [];

  /** name of drop zone group from which elements could be dragged */
  @Input() public dropZoneGroup: string;

  /** class for element which will be rendered under the touch during drag and drop on touch device */
  @Input() public ghostClassName: string;

  private host: ElementRef;
  private renderer: Renderer;
  private dragAndDropService: DragAndDropService;
  private draggableItemsElements: DraggableElementDirective[];

  public constructor(
    host: ElementRef,
    dragAndDropService: DragAndDropService,
    renderer: Renderer
  ) {
    this.host = host;
    this.renderer = renderer;
    this.dragAndDropService = dragAndDropService;
  }

  public ngOnInit(): void {
    this.dragAndDropService.registerContainer({
      id: this.bsDropZone,
      nativeElement: this.host.nativeElement,
      dropZone: this
    });
    this.dragAndDropService.dragend.subscribe(() => {
      this.setActiveIndex(-1);
    });
  }

  public ngAfterViewInit(): void {
    this.updateDraggableItems(this.draggableItems.toArray());
    this.draggableItems.changes.subscribe((items: QueryList<DraggableElementDirective>) => {
      this.updateDraggableItems(items.toArray());
    });
  }

  @HostListener('dragover', ['$event']) public onDragover(event: DragEvent): void {
    const grabbedElement = this.dragAndDropService.getGrabbedElement();
    if (!this.cancelEvent(event, grabbedElement)) {
      return;
    }

    const point = { x: event.clientX, y: event.clientY };
    this.dragoverPoint(point, grabbedElement);
  }

  @HostListener('dragenter', ['$event']) public onDragenter(event: DragEvent): void {
    this.cancelEvent(event, this.dragAndDropService.getGrabbedElement());
  }

  @HostListener('touchstart', ['$event']) public onTouchstart(event: TouchEvent): void {
    if (this.dragAndDropService.getGrabbedElement()) {
      return;
    }
    const touch = event.changedTouches[0];
    const itemIndex = this.draggableItemsElements.findIndex(
      (x: DraggableElementDirective) => PointHelper.isPointInRectangle(
        { x: touch.clientX, y: touch.clientY },
        x.host.nativeElement.getBoundingClientRect()
      )
    );
    if (itemIndex > -1) {
      // event.preventDefault();
      this.setActiveIndex(itemIndex);
      // FR https://github.com/angular/angular/issues/10834
      // Bug https://github.com/angular/angular/issues/9864
      // when ngFor updates DOM (removes some element which was a target for touchstart) touchmove events fires
      // on this element only without bubbling, so we need to attach listeners to this element directly
      const eventListeners = [
        this.renderer.listen(event.target, 'touchmove', (e: TouchEvent) => this.dragAndDropService.onTouchmove(e)),
        this.renderer.listen(event.target, 'touchend', (e: TouchEvent) => this.onDrop(e, eventListeners)),
        this.renderer.listen(event.target, 'touchcancel', (e: TouchEvent) => this.onDrop(e, eventListeners))
      ];
      this.dragAndDropService.startDragElement(this.createGrabbedElement(itemIndex), touch, this.ghostClassName);
    }
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent | TouchEvent, listeners: Function[]): void {
    if ((event as TouchEvent).changedTouches && !this.dragAndDropService.containsCurrentTouch((event as TouchEvent).changedTouches)) {
      return;
    }
    if (listeners) {
      listeners.forEach((x: Function) => x());
    }
    this.finalizeDrag();
  }

  public dragoverPoint(
    point: Point,
    grabbedElement: GrabbedElement
  ): void {
    if (grabbedElement.dropZoneContainerId === this.bsDropZone) {
      grabbedElement.element = this.draggableItemsElements[grabbedElement.index];
    }
    if (!grabbedElement.element || !this.canAcceptElement(grabbedElement)) {
      return;
    }
    let i = 0;
    do {
      if (
        !this.draggableItemsElements.length
        || this.draggableItemsElements[i] !== grabbedElement.element
        && PointHelper.isPointInRectangle(point, this.draggableItemsElements[i].host.nativeElement.getBoundingClientRect())
        && (!this.fixDisabledItems || !this.draggableItemsElements[i].disabled)
      ) {
        this.dragAndDropService.captureGrabbedElement(this.bsDropZone);
        let result: any[] = [];
        if (grabbedElement.dropZoneContainerId !== this.bsDropZone) {
          result = ArrayHelper.insertElement(i, grabbedElement.element.draggableElementData, this.items);
        } else if (this.fixDisabledItems) {
          result = ArrayHelper.moveElementThroughFixed(grabbedElement.index, i, this.items, this.getDisabledItems());
        } else {
          result = ArrayHelper.moveElement(grabbedElement.index, i, this.items);
        }
        this.itemsChange.emit(result);
        grabbedElement.dropZoneContainerId = this.bsDropZone;
        grabbedElement.index = i;
        this.setActiveIndex(i);
        return;
      }
    } while (++i < this.draggableItemsElements.length);
  }

  public finalizeDrag(): void {
    this.dragAndDropService.stopDragElement();
  }

  public removeGrabbedItem(grabbedItem: GrabbedElement): void {
    const result = [...this.items];
    this.draggableItemsElements = [];
    result.splice(grabbedItem.index, 1);
    this.itemsChange.emit(result);
    this.setActiveIndex(-1);
  }

  private cancelEvent(event: DragEvent | TouchEvent, item: GrabbedElement): boolean {
    if (item && this.canAcceptElement(item)) {
      event.preventDefault();
      return true;
    }
    return false;
  }

  private canAcceptElement(item: GrabbedElement): boolean {
    const result = item &&
      (item.dropZoneContainerId === this.bsDropZone ||
      (this.dropZoneGroup && item.dropZoneGroup === this.dropZoneGroup) ||
      (this.acceptFromZones && !!this.acceptFromZones.find((x: string) => x === item.dropZoneContainerId)));
    return !!result;
  }

  private updateDraggableItems(items: DraggableElementDirective[]): void {
    items.forEach((item: DraggableElementDirective, index: number) => {
      item.draggableElementData = this.items[index];
      item.onDragStart = (event: DragEvent) => {
        this.setActiveIndex(index);
        this.dragAndDropService.startDragElement(this.createGrabbedElement(index));
        const listener = this.renderer.listen(event.target, 'dragend', () => {
          this.finalizeDrag();
          listener();
        });
      };
      item.onDragEnd = () => this.dragAndDropService.stopDragElement();
    });
    this.draggableItemsElements = items;
  }

  private getDisabledItems(): number[] {
    return this.draggableItemsElements
      .map((x: DraggableElementDirective, i: number) => ({ index: i, disabled: x.disabled }))
      .filter((x: any) => x.disabled)
      .map((x: any) => x.index);
  }

  private setActiveIndex(index: number): void {
    this.activeItemIndexChange.emit(index);
    this.activeItemIndex = index;
  }

  private createGrabbedElement(index: number): GrabbedElement {
    return {
      dropZoneContainerId: this.bsDropZone,
      dropZoneGroup: this.dropZoneGroup,
      index,
      element: this.draggableItemsElements[index]
    };
  }
}
