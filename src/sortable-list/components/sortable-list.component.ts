import { Component, Input, Output, EventEmitter, forwardRef, animate, style, state, transition, keyframes, trigger } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import 'rxjs/add/operator/first';

import { DraggableItem } from '../models';
import { DraggableItemService } from '../services';

const nullCallback = (arg?: any): void => { return void 0; };

/* tslint:disable */
@Component({
    selector: 'ng2-sortable-list',
    templateUrl: './sortable-list.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SortableComponent), multi: true }],
    animations: [
        trigger('flyInOut', [
          state('in', style({ height: '*', width: '*' })),
          transition('void => *', [
            style({ height: 0, width: 0 }),
            animate('100ms ease-out')
          ]),
          transition('* => void', [
            style({ height: '*', width: '*' }),
            animate('100ms ease-out', style({ height: 0, width: 0 }))
          ])
        ])
    ]
})
/* tslint:enable */
export class SortableComponent implements ControlValueAccessor {
    private static globalZoneIndex: number = 0;

    @Input() public fieldName: string;
    @Input() public wrapperClass: string = '';
    @Input() public wrapperStyle: {} = {};
    @Input() public itemClass: string = '';
    @Input() public itemStyle: {} = {};
    @Input() public itemActiveClass: string = '';
    @Input() public itemActiveStyle: {} = {};
    @Input() public placeholderClass: string = '';
    @Input() public placeholderStyle: {} = {};
    @Input() public placeholderItem: string = '';

    @Output() public onChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    private _items: SortableItem[];

    private showPlaceholder: boolean = false;

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
    }

    public onZoneDragover(event: DragEvent): void {
        if (!this.transfer.getItem()) {
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
        }
        this.resetActiveItem();
    }

    public resetActiveItem(): void {
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
            console.log('items', this.items);
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
}

export declare interface SortableItem {
    id: number;
    value: string;
    initData: any;
}
