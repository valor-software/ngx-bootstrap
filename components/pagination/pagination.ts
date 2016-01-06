import {
  Component,
  OnInit, Input, Output,
  ElementRef, EventEmitter,
  Self, Renderer
} from 'angular2/core';
import { NgFor, NgIf, NgClass, ControlValueAccessor, NgModel } from 'angular2/common';
import { IAttribute } from '../common';

// todo: extract base functionality classes
// todo: use lodash#default for configuration
// todo: expose an option to change default configuration
// todo: solve problem with .pagination-sm>li:first-child>a and <template/> from ngIf >.<
export interface IPaginationConfig extends IAttribute {
  maxSize: number;
  itemsPerPage: number;
  // is navigation buttons visible
  boundaryLinks: boolean;
  directionLinks: boolean;
  // labels
  firstText: string;
  previousText: string;
  nextText: string;
  lastText: string;

  rotate: boolean;
}
export interface IPageChangedEvent {
  itemsPerPage: number;
  page: number;
}

const paginationConfig:IPaginationConfig = {
  maxSize: void 0,
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
};

const PAGINATION_TEMPLATE = `
  <ul class="pagination" [ngClass]="classMap">
    <li class="pagination-first page-item"
        *ngIf="boundaryLinks"
        [class.disabled]="noPrevious()||disabled">
      <a class="page-link" href (click)="selectPage(1, $event)">{{getText('first')}}</a>
    </li>

    <li class="pagination-prev page-item"
        *ngIf="directionLinks"
        [class.disabled]="noPrevious()||disabled">
      <a class="page-link" href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>

    <li *ngFor="#pg of pages"
        [class.active]="pg.active"
        [class.disabled]="disabled&&!pg.active"
        class="pagination-page page-item">
      <a class="page-link" href (click)="selectPage(pg.number, $event)">{{pg.text}}</a>
    </li>

    <li class="pagination-next page-item"
        *ngIf="directionLinks"
        [class.disabled]="noNext()">
      <a class="page-link" href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a></li>

    <li class="pagination-last page-item"
        *ngIf="boundaryLinks"
        [class.disabled]="noNext()">
      <a class="page-link" href (click)="selectPage(totalPages, $event)">{{getText('last')}}</a></li>
  </ul>
  `;

@Component({
  selector: 'pagination[ngModel]',
  template: PAGINATION_TEMPLATE,
  directives: [NgFor, NgIf]
})
export class Pagination implements ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {
  @Input() public maxSize:number;

  @Input() public boundaryLinks:boolean;
  @Input() public directionLinks:boolean;
  // labels
  @Input() public firstText:string;
  @Input() public previousText:string;
  @Input() public nextText:string;
  @Input() public lastText:string;
  @Input() public rotate:boolean;

  @Input() private disabled:boolean;

  @Output() private numPages:EventEmitter<number> = new EventEmitter();
  @Output() private pageChanged:EventEmitter<IPageChangedEvent> = new EventEmitter();

  @Input() public get itemsPerPage() {
    return this._itemsPerPage;
  }

  public set itemsPerPage(v:number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  @Input() private get totalItems():number {
    return this._totalItems;
  }

  private set totalItems(v:number) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  public config:any;
  private classMap:string;

  private _itemsPerPage:number;
  private _totalItems:number;
  private _totalPages:number;

  private inited:boolean = false;

  private get totalPages() {
    return this._totalPages;
  }

  private set totalPages(v:number) {
    this._totalPages = v;
    this.numPages.emit(v);
    if (this.inited) {
      this.selectPage(this.page);
    }
  }

  public set page(value) {
    this._page = (value > this.totalPages) ? this.totalPages : (value || 1);

    this.pageChanged.emit({
      page: this._page,
      itemsPerPage: this.itemsPerPage
    });
  }

  public get page() {
    return this._page;
  }

  // ??
  private _page:number;
  private pages:Array<any>;

  constructor(@Self() public cd:NgModel, public renderer:Renderer, public elementRef:ElementRef) {
    cd.valueAccessor = this;
    this.config = this.config || paginationConfig;
  }

  ngOnInit() {
    this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
    // watch for maxSize
    this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
    this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
    this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
    this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;

    // base class
    this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
    this.totalPages = this.calculateTotalPages();
    // this class
    this.pages = this.getPages(this.page, this.totalPages);
    this.page = this.cd.value;
    this.inited = true;
  }

  writeValue(value:number) {
    this.page = value;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  private selectPage(page:number, event?:MouseEvent) {
    if (event) {
      event.preventDefault();
    }

    if (!this.disabled) {
      if (event && event.target) {
        let target:any = event.target;
        target.blur();
      }
      this.writeValue(page);
      this.cd.viewToModelUpdate(this.page);
    }
  }

  private getText(key:string):string {
    return (<IAttribute>this)[key + 'Text'] || paginationConfig[key + 'Text'];
  }

  private noPrevious():boolean {
    return this.page === 1;
  }

  private noNext():boolean {
    return this.page === this.totalPages;
  }

  // Create page object used in template
  private makePage(number:number, text:string, isActive:boolean):{number: number, text: string, active: boolean} {
    return {
      number: number,
      text: text,
      active: isActive
    };
  }

  private getPages(currentPage:number, totalPages:number):Array<any> {
    let pages:any[] = [];

    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    let isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized) {
      if (this.rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
        endPage = startPage + this.maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - this.maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (var number = startPage; number <= endPage; number++) {
      let page = this.makePage(number, number.toString(), number === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && !this.rotate) {
      if (startPage > 1) {
        let previousPageSet = this.makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }

      if (endPage < totalPages) {
        let nextPageSet = this.makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
    }

    return pages;
  }

  // base class
  private calculateTotalPages():number {
    let totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }

  onChange = (_:any) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}


const pagerConfig = {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
};

const PAGER_TEMPLATE = `
    <ul class="pager">
      <li [class.disabled]="noPrevious()" [class.previous]="align" [ngClass]="{'pull-right': align}">
        <a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>
      <li [class.disabled]="noNext()" [class.next]="align" [ngClass]="{'pull-right': align}">
        <a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a>
      </li>
  </ul>
`;

@Component({
  selector: 'pager[ngModel]',
  properties: [
    'align',
    'totalItems', 'itemsPerPage',
    'previousText', 'nextText',
  ],
  template: PAGER_TEMPLATE,
  directives: [NgClass]
})
export class Pager extends Pagination implements OnInit {
  public config = pagerConfig;

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }
}

export const PAGINATION_DIRECTIVES:Array<any> = [Pagination, Pager];
/**
 * @deprecated - use PAGINATION_DIRECTIVES instead
 * @type {Pagination|Pager[]}
 */
export const pagination:Array<any> = [Pagination, Pager];
