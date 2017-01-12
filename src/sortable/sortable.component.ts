import { Component, Input, Output, EventEmitter, Inject, forwardRef, animate, style, state, transition, keyframes, trigger } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import 'rxjs/add/operator/first';

import { DraggableItem } from './draggable-item';
import { DraggableItemService } from './draggable-item.service';

const nullCallback = (arg?: any): void => { return void 0; };

/* tslint:disable */
@Component({
    selector: 'bs-sortable',
    exportAs: 'bs-sortable',
    template: `
        <div
            [ngClass]="wrapperClass"
            [ngStyle]="wrapperStyle"
            [ngStyle]="wrapperStyle"
            (dragover)="cancelEvent($event)"
            (dragenter)="cancelEvent($event)"
            (drop)="resetActiveItem($event)"
            (mouseleave)="resetActiveItem()"
        >
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
            >{{item.value}}</div>
        </div>`,
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SortableComponent), multi: true }],
})
/* tslint:enable */
export class SortableComponent implements ControlValueAccessor {
    private static globalZoneIndex: number = 0;

    /** field name if input array consists of objects */
    @Input() public fieldName: string;

    /** class name for items wrapper */
    @Input() public wrapperClass: string = '';

    /** style object for items wrapper */
    @Input() public wrapperStyle: { [key: string]: string } = {};

    /** class name for item */
    @Input() public itemClass: string = '';

    /** style object for item */
    @Input() public itemStyle: { [key: string]: string } = {};

    /** class name for active item */
    @Input() public itemActiveClass: string = '';

    /** style object for active item */
    @Input() public itemActiveStyle: { [key: string]: string } = {};

    /** class name for placeholder */
    @Input() public placeholderClass: string = '';

    /** style object for placeholder */
    @Input() public placeholderStyle: { [key: string]: string } = {};

    /** placeholder item which will be shown if collection is empty */
    @Input() public placeholderItem: string = '';

    /** fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
     *  Returns new items collection as a payload.
     */
    @Output() public onChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    public showPlaceholder: boolean = false;

    private _items: SortableItem[];

    private get items(): SortableItem[] {
        return this._items;
    }

    private set items(value: SortableItem[]) {
        this._items = value;
        let out = this.items.map((x: SortableItem) => x.initData);
        this.onChanged(out);
        this.onChange.emit(out);
    }

    private onTouched: () => void = nullCallback;
    private onChanged: (_: any) => void = nullCallback;

    private transfer: DraggableItemService;
    private currentZoneIndex: number;
    private activeItem: number = -1;

    public constructor(transfer: DraggableItemService) {
        this.transfer = transfer;
        this.currentZoneIndex = SortableComponent.globalZoneIndex++;
        this.transfer.onCaptureItem().subscribe((item: DraggableItem) => this.onDrop(item));
    }

    public onItemDragstart(event: DragEvent, item: SortableItem, i: number): void {
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

    public onItemDragover(event: DragEvent, i: number): void {
        if (!this.transfer.getItem()) {
            return;
        }
        event.preventDefault();
        let dragItem = this.transfer.captureItem(this.currentZoneIndex, this.items.length);
        let newArray: any[] = [];
        if (!this.items.length) {
            newArray = [ dragItem.item ];
        } else if (dragItem.i > i) {
            newArray = [
                ...this.items.slice(0, i),
                dragItem.item,
                ...this.items.slice(i, dragItem.i),
                ...this.items.slice(dragItem.i + 1)
            ];
        } else { // this.draggedItem.i < i
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

    public cancelEvent(event: DragEvent): void {
        if (!this.transfer.getItem() || !event) {
            return;
        }
        event.preventDefault();
    }

    public onDrop(item: DraggableItem): void {
        if (item &&
            item.overZoneIndex !== this.currentZoneIndex &&
            item.lastZoneIndex === this.currentZoneIndex
        ) {
            this.items = this.items.filter((x: SortableItem, i: number) => i !== item.i);
            this.updatePlaceholderState();
        }
        this.resetActiveItem(undefined);
    }

    public resetActiveItem(event: DragEvent): void {
        this.cancelEvent(event);
        this.activeItem = -1;
    }

    public registerOnChange(callback: (_: any) => void): void {
        this.onChanged = callback;
    }

    public registerOnTouched(callback: () => void): void {
        this.onTouched = callback;
    }

    public writeValue(value: any[]): void {
        if (value) {
            this.items = value.map((x: any, i: number) => ({ id: i, initData: x, value: this.fieldName ? x[this.fieldName] : x }));
        } else {
            this.items = [];
        }
        this.updatePlaceholderState();
    }

    public updatePlaceholderState(): void {
        this.showPlaceholder = !this._items.length;
    }

    public getItemStyle(isActive: boolean): {} {
        return isActive ? Object.assign({}, this.itemStyle, this.itemActiveStyle) : this.itemStyle;
    }

    private initDragstartEvent(event: DragEvent): void {
        // it is necessary for mozilla
        // data type should be 'Text' instead of 'text/plain' to keep compatibility with IE
        event.dataTransfer.setData('Text', 'placeholder');
    }
}

export declare interface SortableItem {
    id: number;
    value: string;
    initData: any;
}
