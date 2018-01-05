import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  forwardRef, ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PageChangedEvent } from './pagination.component';
import { PaginationConfig } from './pagination.config';

export const PAGER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => PagerComponent),
  multi: true
};

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  providers: [PAGER_CONTROL_VALUE_ACCESSOR]
})
export class PagerComponent implements ControlValueAccessor, OnInit {
  config: any;
  /** if `true` aligns each link to the sides of pager */
  @Input() align: boolean;
  /** limit number for page links in pager */
  @Input() maxSize: number;
  /** if false first and last buttons will be hidden */
  @Input() boundaryLinks: boolean;
  /** if false previous and next buttons will be hidden */
  @Input() directionLinks: boolean;
  // labels
  /** first button text */
  @Input() firstText: string;
  /** previous button text */
  @Input() previousText: string;
  /** next button text */
  @Input() nextText: string;
  /** last button text */
  @Input() lastText: string;
  /** if true current page will in the middle of pages list */
  @Input() rotate: boolean;
  // css
  /** add class to <li> */
  @Input() pageBtnClass: string;

  /** if true pagination component will be disabled */
  @Input() disabled: boolean;

  /** fired when total pages count changes, $event:number equals to total pages count */
  @Output() numPages: EventEmitter<number> = new EventEmitter<number>();
  /** fired when page was changed, $event:{page, itemsPerPage} equals to
   * object with current page index and number of items per page
   */
  @Output()
  pageChanged: EventEmitter<PageChangedEvent> = new EventEmitter<PageChangedEvent>();

  /** maximum number of items per page. If value less than 1 will display all items on one page */
  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(v: number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  /** total number of items in all pages */
  @Input()
  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(v: number) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(v: number) {
    this._totalPages = v;
    this.numPages.emit(v);
    if (this.inited) {
      this.selectPage(this.page);
    }
  }

  set page(value: number) {
    const _previous = this._page;
    this._page = value > this.totalPages ? this.totalPages : value || 1;
    this.changeDetection.markForCheck();

    if (_previous === this._page || typeof _previous === 'undefined') {
      return;
    }

    this.pageChanged.emit({
      page: this._page,
      itemsPerPage: this.itemsPerPage
    });
  }

  get page(): number {
    return this._page;
  }

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  classMap: string;
  pages: any[];

  protected _itemsPerPage: number;
  protected _totalItems: number;
  protected _totalPages: number;
  protected inited = false;
  protected _page = 1;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              paginationConfig: PaginationConfig,
              private changeDetection: ChangeDetectorRef) {
    this.renderer = renderer;
    this.elementRef = elementRef;
    if (!this.config) {
      this.configureOptions(
        Object.assign({}, paginationConfig.main, paginationConfig.pager)
      );
    }
  }

  configureOptions(config: any): void {
    this.config = Object.assign({}, config);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
    }
    // watch for maxSize
    this.maxSize =
      typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
    this.rotate =
      typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
    this.boundaryLinks =
      typeof this.boundaryLinks !== 'undefined'
        ? this.boundaryLinks
        : this.config.boundaryLinks;
    this.directionLinks =
      typeof this.directionLinks !== 'undefined'
        ? this.directionLinks
        : this.config.directionLinks;
    this.pageBtnClass =
      typeof this.pageBtnClass !== 'undefined'
        ? this.pageBtnClass
        : this.config.pageBtnClass;

    // base class
    this.itemsPerPage =
      typeof this.itemsPerPage !== 'undefined'
        ? this.itemsPerPage
        : this.config.itemsPerPage;
    this.totalPages = this.calculateTotalPages();
    // this class
    this.pages = this.getPages(this.page, this.totalPages);
    this.inited = true;
  }

  writeValue(value: number): void {
    this.page = value;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  getText(key: string): string {
    return (this as any)[`${key}Text`] || this.config[`${key}Text`];
  }

  noPrevious(): boolean {
    return this.page === 1;
  }

  noNext(): boolean {
    return this.page === this.totalPages;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  selectPage(page: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.disabled) {
      if (event && event.target) {
        const target: any = event.target;
        target.blur();
      }
      this.writeValue(page);
      this.onChange(this.page);
    }
  }

  // Create page object used in template
  protected makePage(num: number,
                     text: string,
                     active: boolean): { number: number; text: string; active: boolean } {
    return {text, number: num, active};
  }

  protected getPages(currentPage: number, totalPages: number): any[] {
    const pages: any[] = [];

    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    const isMaxSized =
      typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

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
        startPage =
          (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (let num = startPage; num <= endPage; num++) {
      const page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && !this.rotate) {
      if (startPage > 1) {
        const previousPageSet = this.makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }

      if (endPage < totalPages) {
        const nextPageSet = this.makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
    }

    return pages;
  }

  // base class
  protected calculateTotalPages(): number {
    const totalPages =
      this.itemsPerPage < 1
        ? 1
        : Math.ceil(this.totalItems / this.itemsPerPage);

    return Math.max(totalPages || 0, 1);
  }
}
