import {
  Component,
  forwardRef,
  TemplateRef,
  input,
  output
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DraggableItem } from './draggable-item';
import { DraggableItemService } from './draggable-item.service';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'bs-sortable',
    exportAs: 'bs-sortable',
    template: `
<div
  [ngClass]="wrapperClass()"
  [ngStyle]="wrapperStyle()"
  (dragover)="cancelEvent($event)"
  (dragenter)="cancelEvent($event)"
  (drop)="resetActiveItem($event)"
  (mouseleave)="resetActiveItem($event)">
  @if (showPlaceholder) {
    <div
      [ngClass]="placeholderClass()"
      [ngStyle]="placeholderStyle()"
      (dragover)="onItemDragover($event, 0)"
      (dragenter)="cancelEvent($event)"
    >{{placeholderItem()}}</div>
  }
  @for (item of items; track item; let i = $index) {
    <div
      [ngClass]="[ itemClass(), i === activeItem ? itemActiveClass() : '' ]"
      [ngStyle]="getItemStyle(i === activeItem)"
      draggable="true"
      (dragstart)="onItemDragstart($event, item, i)"
      (dragend)="resetActiveItem($event)"
      (dragover)="onItemDragover($event, i)"
      (dragenter)="cancelEvent($event)"
      aria-dropeffect="move"
      [attr.aria-grabbed]="i === activeItem"
      ><ng-template [ngTemplateOutlet]="itemTemplate() || defItemTemplate"
    [ngTemplateOutletContext]="{item:item, index: i}"></ng-template></div>
  }
</div>

<ng-template #defItemTemplate let-item="item">{{item.value}}</ng-template>
`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SortableComponent),
            multi: true
        }
    ],
    standalone: true,
    imports: [NgClass, NgStyle, NgTemplateOutlet]
})
export class SortableComponent implements ControlValueAccessor {
  private static globalZoneIndex = 0;
  /** field name if input array consists of objects */
  fieldName = input<string | undefined>();

  /** class name for items wrapper */
  wrapperClass = input<string>('');

  /** style object for items wrapper */
  wrapperStyle = input<Record<string, string>>({});

  /** class name for item */
  itemClass = input<string>('');

  /** style object for item */
  itemStyle = input<Record<string, string>>({});

  /** class name for active item */
  itemActiveClass = input<string>('');

  /** style object for active item */
  itemActiveStyle = input<Record<string, string>>({});

  /** class name for placeholder */
  placeholderClass = input<string>('');

  /** style object for placeholder */
  placeholderStyle = input<Record<string, string>>({});

  /** placeholder item which will be shown if collection is empty */
  placeholderItem = input<string>('');

  /** used to specify a custom item template. Template variables: item and index; */
  itemTemplate = input<TemplateRef<unknown> | undefined>();

  /** fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
   *  Returns new items collection as a payload.
   */
  onChange = output<unknown[]>();

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
      const fieldNameValue = this.fieldName();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.items = value.map((x: any, i: number) => ({
        id: i,
        initData: x,
        value: fieldNameValue ? x[fieldNameValue] : x
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
      ? Object.assign({}, this.itemStyle(), this.itemActiveStyle())
      : this.itemStyle();
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
