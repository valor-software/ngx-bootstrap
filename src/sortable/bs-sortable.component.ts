import {
  Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, TemplateRef, OnInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// placeholderItem - could be an element, not just text

@Component({
  selector: 'bs-sortable',
  exportAs: 'bs-sortable',
  template: `
    <div
      [bsDropZone]="currentDropZoneId"
      [dropZoneGroup]="dropZoneGroup"
      [acceptFromZones]="acceptFromZones"
      [fixDisabledItems]="fixDisabledItems"
      [(items)]="items"
      (activeItemIndexChange)="onActiveItemChange($event)"
      [ngClass]="wrapperClass"
      [ghostClassName]="ghostClassName">
      <div *ngIf="isEmpty" class="bs-sortable-placeholder">{{placeholderItem}}</div>
      <div bsDraggable class="bs-sortable-item"
           *ngFor="let item of items; let i = index;"
           [class.bs-active]="index === activeItem"
           [attr.disabled]="isCurrentItemDisabled(item)">
        <template [ngTemplateOutlet]="itemTemplate || defItemTemplate" [ngOutletContext]="{item: item, index: i}">
        </template>
      </div>
    </div>

    <template #defItemTemplate let-item="item">{{ fieldName ? item[fieldName] : item }}</template>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsSortableComponent),
    multi: true
  }]
})
export class BsSortableComponent implements ControlValueAccessor, OnInit {
  private static globalZoneIndex: number = 0;

  /** name of sortable, should be unique for all the Sortable components and dropZone directives on the page */
  @Input() public dropZoneId: string;

  /** names of sortables from which elements could be dragged */
  @Input() public acceptFromZones: string;

  /** name of sortable group from which elements could be dragged */
  @Input() public dropZoneGroup: string;

  /** should return true if item should be disabled */
  @Input() public isItemDisabled: (item: any) => boolean;

  /** if true disabled items won't move during sorting, doesn't affect case if an item was removed or inserted into the conteiner */
  @Input() public fixDisabledItems: boolean;

  /** field name if input array consists of objects */
  @Input() public fieldName: string;

  /** class name for items wrapper */
  @Input() public wrapperClass: string = '';

  /** class name for ghost item (applicable for touch only) */
  @Input() public ghostClassName: string = '';

  /** placeholder item which will be shown if collection is empty */
  @Input() public placeholderItem: string = '';

  /** used to specify a custom item template. Template variables: item and index; */
  @Input() public itemTemplate: TemplateRef<any>;

  /** fired on array change (reordering, insert, remove), same as <code>ngModelChange</code>.
   *  Returns new items collection as a payload.
   */
  @Output() public onChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  public showPlaceholder: boolean = false;
  public activeItem: number = -1;

  // ControlValueAccessor
  public onTouched: any = Function.prototype;
  public onChanged: any = Function.prototype;

  private _items: any[];

  public get items(): any[] {
    return this._items;
  }

  public set items(value: any[]) {
    this._items = value;
    this.onChanged(value);
    this.onChange.emit(value);
  }

  public ngOnInit(): void {
    this.dropZoneId = this.dropZoneId || `bs-sortable-zone-id-${BsSortableComponent.globalZoneIndex++}`;
  }

  public get isEmpty(): void {
    return !this._items || !this._items.length;
  }

  public onActiveItemChange(index: number): void {
    this.activeItem = index;
  }

  public isCurrentItemDisabled(item: any): boolean {
    return this.isItemDisabled && this.isItemDisabled(item);
  }

  // ControlValueAccessor
  public registerOnChange(callback: (_: any) => void): void {
    this.onChanged = callback;
  }

  public registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  public writeValue(value: any[]): void {
    this.items = value || [];
  }
}
