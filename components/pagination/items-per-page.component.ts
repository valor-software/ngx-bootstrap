import {Component, OnInit, Input, Output, ElementRef, EventEmitter} from 'angular2/core';
import {NgFor, NgModel} from 'angular2/common';
import {IAttribute} from '../common';

export interface IItemsPerPageConfig extends IAttribute {
  label: string;
  options: Array<any>;
  itemsPerPage: number;
}

const itemsPerPageConfig:IItemsPerPageConfig = {
  label: 'Items per page',
  options: [10, 25, 50, 100],
  itemsPerPage: 10
};

const ITEMS_PER_PAGE_TEMPLATE = `
  <div class="items-per-page pagination" [ngClass]="classMap">
    {{label}}
    <select (change)="selectItemsPerPage($event.target.value)">
      <option *ngFor="#current of options" [selected]="current == itemsPerPage">{{current}}</option>
    </select>
  </div>
  `;

@Component({
  selector: 'items-per-page',
  template: ITEMS_PER_PAGE_TEMPLATE,
  directives: [NgFor]
})
export class ItemsPerPage implements OnInit, IItemsPerPageConfig, IAttribute {
  @Input() public label:string;
  @Input() public options:Array<any>;

  @Output() private selectedItemsPerPage:EventEmitter<number> = new EventEmitter();

  @Input() public get itemsPerPage() {
    return this._itemsPerPage;
  }

  public set itemsPerPage(v:number) {
    this._itemsPerPage = v;
  }

  public config:any;
  private classMap:string;

  private _itemsPerPage:number;
  private inited:boolean = false;

  constructor(public elementRef:ElementRef) {
    this.config = this.config || itemsPerPageConfig;
  }

  ngOnInit() {
    this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';

    this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : itemsPerPageConfig.itemsPerPage;
    this.label = typeof this.label !== 'undefined' ? this.label : itemsPerPageConfig.label;
    this.options = typeof this.options !== 'undefined' ? this.options : itemsPerPageConfig.options;

    this.inited = true;
  }

  private selectItemsPerPage(selectedItemsPerPage:number) {
    this.selectedItemsPerPage.emit(selectedItemsPerPage);
  }

}
