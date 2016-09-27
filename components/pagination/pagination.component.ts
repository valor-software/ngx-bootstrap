import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, Self
} from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';

import { KeyAttribute } from '../common';

// todo: extract base functionality classes
// todo: expose an option to change default configuration
export interface PaginationConfig extends KeyAttribute {
  maxSize:number;
  itemsPerPage:number;
  // is navigation buttons visible
  boundaryLinks:boolean;
  directionLinks:boolean;
  // labels
  firstText:string;
  previousText:string;
  nextText:string;
  lastText:string;

  rotate:boolean;
}
export interface PageChangedEvent {
  itemsPerPage:number;
  page:number;
}

const paginationConfig:PaginationConfig = {
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
      <a class="page-link" href (click)="selectPage(1, $event)" [innerHTML]="getText('first')"></a>
    </li>

    <li class="pagination-prev page-item"
        *ngIf="directionLinks"
        [class.disabled]="noPrevious()||disabled">
      <a class="page-link" href (click)="selectPage(page - 1, $event)" [innerHTML]="getText('previous')"></a>
      </li>

    <li *ngFor="let pg of pages"
        [class.active]="pg.active"
        [class.disabled]="disabled&&!pg.active"
        class="pagination-page page-item">
      <a class="page-link" href (click)="selectPage(pg.number, $event)" [innerHTML]="pg.text"></a>
    </li>

    <li class="pagination-next page-item"
        *ngIf="directionLinks"
        [class.disabled]="noNext()">
      <a class="page-link" href (click)="selectPage(page + 1, $event)" [innerHTML]="getText('next')"></a></li>

    <li class="pagination-last page-item"
        *ngIf="boundaryLinks"
        [class.disabled]="noNext()">
      <a class="page-link" href (click)="selectPage(totalPages, $event)" [innerHTML]="getText('last')"></a></li>
  </ul>
  `;

/* tslint:disable */
@Component({
  selector: 'pagination[ngModel]',
  template: PAGINATION_TEMPLATE,
  providers: [NgModel]
})
/* tslint:enable */
export class PaginationComponent implements ControlValueAccessor, OnInit, PaginationConfig, KeyAttribute {
  public config:any;
  @Input() public align:boolean;
  @Input() public maxSize:number;

  @Input() public boundaryLinks:boolean;
  @Input() public directionLinks:boolean;
  // labels
  @Input() public firstText:string;
  @Input() public previousText:string;
  @Input() public nextText:string;
  @Input() public lastText:string;
  @Input() public rotate:boolean;

  @Input() public disabled:boolean;

  @Output() public numPages:EventEmitter<number> = new EventEmitter<number>(false);
  @Output() public pageChanged:EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>(false);

  @Input()
  public get itemsPerPage():number {
    return this._itemsPerPage;
  }

  public set itemsPerPage(v:number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  @Input()
  public get totalItems():number {
    return this._totalItems;
  }

  public set totalItems(v:number) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  public get totalPages():number {
    return this._totalPages;
  }

  public set totalPages(v:number) {
    this._totalPages = v;
    this.numPages.emit(v);
    if (this.inited) {
      this.selectPage(this.page);
    }
  }

  public set page(value:number) {
    const _previous = this._page;
    this._page = (value > this.totalPages) ? this.totalPages : (value || 1);

    if (_previous === this._page || typeof _previous === 'undefined') {
      return;
    }

    this.pageChanged.emit({
      page: this._page,
      itemsPerPage: this.itemsPerPage
    });
  }

  public get page():number {
    return this._page;
  }

  public onChange:any = Function.prototype;
  public onTouched:any = Function.prototype;

  public cd:NgModel;
  public renderer:Renderer;
  public elementRef:ElementRef;

  public classMap:string;
  public pages:Array<any>;

  private _itemsPerPage:number;
  private _totalItems:number;
  private _totalPages:number;
  private inited:boolean = false;
  private _page:number;

  public constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    this.cd = cd;
    this.renderer = renderer;
    this.elementRef = elementRef;
    cd.valueAccessor = this;
    this.config = this.config || paginationConfig;
  }

  public ngOnInit():void {
    this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
    // watch for maxSize
    this.maxSize = typeof this.maxSize !== 'undefined'
      ? this.maxSize
      : paginationConfig.maxSize;
    this.rotate = typeof this.rotate !== 'undefined'
      ? this.rotate
      : paginationConfig.rotate;
    this.boundaryLinks = typeof this.boundaryLinks !== 'undefined'
      ? this.boundaryLinks
      : paginationConfig.boundaryLinks;
    this.directionLinks = typeof this.directionLinks !== 'undefined'
      ? this.directionLinks
      : paginationConfig.directionLinks;

    // base class
    this.itemsPerPage = typeof this.itemsPerPage !== 'undefined'
      ? this.itemsPerPage
      : paginationConfig.itemsPerPage;
    this.totalPages = this.calculateTotalPages();
    // this class
    this.pages = this.getPages(this.page, this.totalPages);
    this.page = this.cd.value;
    this.inited = true;
  }

  public writeValue(value:number):void {
    this.page = value;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  public getText(key:string):string {
    return (this as KeyAttribute)[key + 'Text'] || paginationConfig[key + 'Text'];
  }

  public noPrevious():boolean {
    return this.page === 1;
  }

  public noNext():boolean {
    return this.page === this.totalPages;
  }

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }

  public selectPage(page:number, event?:MouseEvent):void {
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

  // Create page object used in template
  private makePage(num:number, text:string, isActive:boolean):{number:number, text:string, active:boolean} {
    return {
      number: num,
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
    for (let num = startPage; num <= endPage; num++) {
      let page = this.makePage(num, num.toString(), num === currentPage);
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
    let totalPages = this.itemsPerPage < 1
      ? 1
      : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }
}
