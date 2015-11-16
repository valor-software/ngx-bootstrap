import {
  Component, View, Directive,
  OnInit, EventEmitter,
  ElementRef,
  ControlValueAccessor,
  CORE_DIRECTIVES, NgClass,
  Self, NgModel, Renderer,
  ViewEncapsulation, ViewRef,
  ViewContainerRef, TemplateRef, NgFor, ComponentRef
} from 'angular2/angular2';

import {IAttribute} from '../common';

// todo: extract base functionality classes
// todo: use lodash#default for configuration
// todo: expose an option to change default configuration
// todo: solve problem with .pagination-sm>li:first-child>a and <template/> from ng-if >.<
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
interface IPageChangedEvent {
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

@Component({
  selector: 'pagination[ng-model], [pagination][ng-model]',
  properties: [
    'rotate', 'disabled',
    'totalItems', 'itemsPerPage', 'maxSize',
    'boundaryLinks', 'directionLinks',
    'firstText', 'previousText', 'nextText', 'lastText'
  ],
  events: ['numPages', 'pageChanged']
})
@View({
  template: `
  <ul class="pagination" [ng-class]="classMap">
    <li class="pagination-first"
        [ng-class]="{disabled: noPrevious()||disabled, hidden: !boundaryLinks}"
        [hidden]="!boundaryLinks">
      <a href (click)="selectPage(1, $event)">{{getText('first')}}</a>
    </li>

    <li class="pagination-prev"
        [ng-class]="{disabled: noPrevious()||disabled, hidden: !directionLinks}"
        [hidden]="!directionLinks">
      <a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>

    <li *ng-for="#pg of pages"
    [ng-class]="{active: pg.active, disabled: disabled&&!pg.active}"
    class="pagination-page">
      <a href (click)="selectPage(pg.number, $event)">{{pg.text}}</a>
    </li>

    <li class="pagination-next"
        [ng-class]="{disabled: noNext()||disabled, hidden: !directionLinks}"
        [hidden]="!directionLinks">
      <a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a></li>

    <li class="pagination-last"
        [ng-class]="{disabled: noNext()||disabled, hidden: !boundaryLinks}"
        [hidden]="!boundaryLinks">
      <a href (click)="selectPage(totalPages, $event)">{{getText('last')}}</a></li>
  </ul>
  `,
  directives: [CORE_DIRECTIVES, NgClass],
  encapsulation: ViewEncapsulation.None
})
export class Pagination implements ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {
  public config: any;

  public maxSize:number;

  public boundaryLinks:boolean;
  public directionLinks:boolean;
  // labels
  public firstText:string;
  public previousText:string;
  public nextText:string;
  public lastText:string;
  public rotate:boolean;

  private classMap:string;

  private disabled:boolean;
  private numPages:EventEmitter<number> = new EventEmitter();
  private pageChanged:EventEmitter<IPageChangedEvent> = new EventEmitter();

  private _itemsPerPage:number;
  private _totalItems:number;
  private _totalPages:number;

  private inited: boolean = false;

  public get itemsPerPage() {
    return this._itemsPerPage;
  }

  public set itemsPerPage(v:number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  private get totalItems():number {
    return this._totalItems;
  }

  private set totalItems(v:number) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  private get totalPages() {
    return this._totalPages;
  }

  private set totalPages(v:number) {
    this._totalPages = v;
    this.numPages.next(v);
    if (this.inited) {
      this.selectPage(this.page);
    }
  }

  public set page(value) {
    this._page = (value > this.totalPages) ? this.totalPages : (value || 1);

    this.pageChanged.next({
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

  onInit() {
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
        let target: any = event.target;
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
  private makePage(number:number, text:string, isActive:boolean):
   {number: number, text: string, active: boolean} {
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

  onChange = (_:any) => {};
  onTouched = () => {};

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

@Component({
  selector: 'pager[ng-model], [pager][ng-model]',
  properties: [
    'align',
    'totalItems', 'itemsPerPage',
    'previousText', 'nextText',
  ]
})
@View({
  template: `
    <ul class="pager">
      <li [ng-class]="{disabled: noPrevious(), previous: align, 'pull-left': align}"><a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a></li>
      <li [ng-class]="{disabled: noNext(), next: align, 'pull-right': align}"><a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a></li>
  </ul>
  `,
  directives: [NgClass]
})
export class Pager extends Pagination implements OnInit {
  private align: boolean = pagerConfig.align;
  public config = pagerConfig;
  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }
}

export const pagination:Array<any> = [Pagination, Pager];
