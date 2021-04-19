import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DraggableItem } from './draggable-item';
import { DraggableItemService } from './draggable-item.service';

@Component({
  selector: 'bs-sortable',
  exportAs: 'bs-sortable',
  template: `
<div
    [ngClass]="wrapperClass"
    [ngStyle]="wrapperStyle"
    (dragover)="cancelEvent($event)"
    (dragenter)="cancelEvent($event)"
    (drop)="resetActiveItem($event)"
    (mouseleave)="resetActiveItem($event)">
  <div
        *ngIf="showPlaceholder"
        [ngClass]="placeholderClass"
        [ngStyle]="placeholderStyle"
        (dragover)="onItemDragover($event, 0)"
        (dragenter)="cancelEvent($event)"
    >{{placeholderItem}}</div>
    <div
        *ngFor="let item of items; let i=index;"
        [ngClass]="[ itemClass, i === activeItem ? itemActiveClass : '' ]"
        [ngStyle]="getItemStyle(i === activeItem)"
        draggable="true"
        (dragstart)="onItemDragstart($event, item, i)"
        (dragend)="resetActiveItem($event)"
        (dragover)="onItemDragover($event, i)"
        (dragenter)="cancelEvent($event)"
        aria-dropeffect="move"
        [attr.aria-grabbed]="i === activeItem"
    ><ng-template [ngTemplateOutlet]="itemTemplate || defItemTemplate"
  [ngTemplateOutletContext]="{item:item, index: i}"></ng-template></div>
</div>

<ng-template #defItemTemplate let-item="item">{{item.value}}</ng-template>
`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SortableComponent),
      multi: true
    }
  ]
})
export class SortableComponent implements ControlValueAccessor {
  private static globalZoneIndex = 0;
  /** field name if input array consists of objects */
  @Input() fieldName?: string;

  /** class name for items wrapper */
  @Input() wrapperClass = '';

  /** style object for items wrapper */
  @Input() wrapperStyle: Record<string, string> = {};

  /** class name for item */
  @Input() itemClass = '';

  /** style object for item */
  @Input() itemStyle: Record<string, string> = {};

  /** class name for active item */
  @Input() itemActiveClass = '';

  /** style object for active item */
  @Input() itemActiveStyle: Record<string, string> = {};

  /** class name for placeholder */
  @Input() placeholderClass = '';

  /** style object for placeholder */
  @Input() placeholderStyle: Record<string, string> = {};

  /** placeholder item which will be shown if collection is empty */
  @Input() placeholderItem = '';

  /** used to specify a custom item template. Template variables: item and index; */
  @Input() itemTemplate?: TemplateRef<unknown>;

  /** fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
   *  Returns new items collection as a payload.
   */
  @Output() onChange: EventEmitter<unknown[]> = new EventEmitter<unknown[]>();

  showPlaceholder = false;
  activeItem = -1;

  get items(): SortableItem[] {
    return this._items;
  }

  set items(value: SortableItem[]) {
    this._items = value;
    const out = this.items.map((x: SortableItem) => x.initData);
    this.onChanged(out);
    this.onChange.emit(out);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTouched: any = Function.prototype;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChanged: any = Function.prototype;

  private transfer: DraggableItemService;
  private currentZoneIndex: number;
  private _items: SortableItem[] = [];

  constructor(transfer: DraggableItemService) {
    this.transfer = transfer;
    this.currentZoneIndex = SortableComponent.globalZoneIndex++;
    this.transfer
      .onCaptureItem()
      .subscribe((item: DraggableItem) => this.onDrop(item));
  }

  onItemDragstart(
    event: DragEvent,
    item: SortableItem,
    i: number
  ): void {
    this.initDragstartEvent(event);
    this.onTouched();
    this.transfer.dragStart({
      event,
      item,
      i,
      initialIndex: i,
      lastZoneIndex: this.currentZoneIndex,
      overZoneIndex: this.currentZoneIndex
    });
  }

  onItemDragover(event: DragEvent, i: number): void {
    if (!this.transfer.getItem()) {
      return;
    }
    event.preventDefault();
    const dragItem = this.transfer.captureItem(
      this.currentZoneIndex,
      this.items.length
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newArray: any[] = [];

    if (!dragItem) {
      return;
    }

    if (!this.items.length) {
      newArray = [dragItem.item];
    } else if (dragItem.i > i) {
      newArray = [
        ...this.items.slice(0, i),
        dragItem.item,
        ...this.items.slice(i, dragItem.i),
        ...this.items.slice(dragItem.i + 1)
      ];
    } else {
      // this.draggedItem.i < i
      newArray = [
        ...this.items.slice(0, dragItem.i),
        ...this.items.slice(dragItem.i + 1, i + 1),
        dragItem.item,
        ...this.items.slice(i + 1)
      ];
    }
    this.items = newArray;
    dragItem.i = i;
    this.activeItem = i;
    this.updatePlaceholderState();
  }

  cancelEvent(event?: DragEvent|MouseEvent): void {
    if (!this.transfer.getItem() || !event) {
      return;
    }
    event.preventDefault();
  }

  onDrop(item: DraggableItem): void {
    if (
      item &&
      item.overZoneIndex !== this.currentZoneIndex &&
      item.lastZoneIndex === this.currentZoneIndex
    ) {
      this.items = this.items.filter(
        (x: SortableItem, i: number) => i !== item.i
      );
      this.updatePlaceholderState();
    }
    this.resetActiveItem();
  }

  resetActiveItem(event?: DragEvent|MouseEvent): void {
    this.cancelEvent(event);
    this.activeItem = -1;
  }

  registerOnChange(callback: () => void): void {
    this.onChanged = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any[]): void {
    if (value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.items = value.map((x: any, i: number) => ({
        id: i,
        initData: x,
        value: this.fieldName ? x[this.fieldName] : x
      }));
    } else {
      this.items = [];
    }
    this.updatePlaceholderState();
  }

  updatePlaceholderState(): void {
    this.showPlaceholder = !this._items.length;
  }

  getItemStyle(isActive: boolean) {
    return isActive
      ? Object.assign({}, this.itemStyle, this.itemActiveStyle)
      : this.itemStyle;
  }

  private initDragstartEvent(event: DragEvent): void {
    // it is necessary for mozilla
    // data type should be 'Text' instead of 'text/plain' to keep compatibility
    // with IE
    event.dataTransfer?.setData('Text', 'placeholder');
  }
}

export declare interface SortableItem {
  id: number;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initData: any;
}
