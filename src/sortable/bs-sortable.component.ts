import {
  Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
    [ngStyle]="wrapperStyle"
    [ngStyle]="wrapperStyle"
    [ghostClassName]="ghostClassName"
  >
    <div
      *ngIf="showPlaceholder"
      [ngClass]="placeholderClass"
      [ngStyle]="placeholderStyle"
    >{{placeholderItem}}</div>
    <div
      bsDraggable
      *ngFor="let item of items; let i = index;"
      [disabled]="isCurrentItemDisabled(item)"
      [ngClass]="[ itemClass, isItemActive(i) ? itemActiveClass : '', isCurrentItemDisabled(item) ? itemDisabledClass : '' ]"
      [ngStyle]="getItemStyle(isItemActive(i))"
    >
      <template
        [ngTemplateOutlet]="itemTemplate || defItemTemplate"
        [ngOutletContext]="{item: item, index: i}"
      ></template>
    </div>
  </div>

  <template #defItemTemplate let-item="item">{{ fieldName ? item[fieldName] : item }}</template>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsSortableComponent),
    multi: true
  }]
})
export class BsSortableComponent implements ControlValueAccessor {
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

  /** style object for items wrapper */
  @Input() public wrapperStyle: {[key: string]: string} = {};

  /** class name for item */
  @Input() public itemClass: string = '';

  /** style object for item */
  @Input() public itemStyle: {[key: string]: string} = {};

  /** class name for active item */
  @Input() public itemActiveClass: string = '';

  /** style object for active item */
  @Input() public itemActiveStyle: {[key: string]: string} = {};

  /** class name for disabled item */
  @Input() public itemDisabledClass: string = '';

  /** class name for ghost item (applicable for touch only) */
  @Input() public ghostClassName: string = '';

  /** class name for placeholder */
  @Input() public placeholderClass: string = '';

  /** style object for placeholder */
  @Input() public placeholderStyle: {[key: string]: string} = {};

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

  public onTouched: any = Function.prototype;
  public onChanged: any = Function.prototype;

  private _items: any[];
  private defaultZoneIndex: string;

  public get items(): any[] {
    return this._items;
  }

  public set items(value: any[]) {
    this._items = value;
    this.onChanged(value);
    this.onChange.emit(value);
    this.updatePlaceholderState();
  }

  public get currentDropZoneId(): string {
    if (!this.dropZoneId && !this.defaultZoneIndex) {
      this.defaultZoneIndex = `sortableZone${BsSortableComponent.globalZoneIndex++}`;
    }
    return this.dropZoneId || this.defaultZoneIndex;
  }

  public registerOnChange(callback: (_: any) => void): void {
    this.onChanged = callback;
  }

  public registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  public writeValue(value: any[]): void {
    this.items = value || [];
  }

  public updatePlaceholderState(): void {
    this.showPlaceholder = !this._items.length;
  }

  public onActiveItemChange(index: number): void {
    this.activeItem = index;
  }

  public getItemStyle(isActive: boolean): {} {
    return isActive
      ? Object.assign({}, this.itemStyle, this.itemActiveStyle)
      : this.itemStyle;
  }

  public isItemActive(index: number): boolean {
    return index === this.activeItem;
  }

  public isCurrentItemDisabled(item: any): boolean {
    return this.isItemDisabled && this.isItemDisabled(item);
  }
}
