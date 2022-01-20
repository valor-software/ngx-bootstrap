import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Provider,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfigModel, PagesModel, PaginationLinkContext, PaginationNumberLinkContext } from './models';

import { PaginationConfig } from './pagination.config';

export interface PageChangedEvent {
  itemsPerPage: number;
  page: number;
}

export const PAGINATION_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationComponent),
  multi: true
};

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
})
export class PaginationComponent implements ControlValueAccessor, OnInit {
  config?: Partial<ConfigModel>;
  /** if `true` aligns each link to the sides of pager */
  @Input() align = true;
  /** limit number for page links in pager */
  @Input() maxSize?: number;
  /** if false first and last buttons will be hidden */
  @Input() boundaryLinks = false;
  /** if false previous and next buttons will be hidden */
  @Input() directionLinks = true;
  // labels
  /** first button text */
  @Input() firstText?: string;
  /** previous button text */
  @Input() previousText?: string;
  /** next button text */
  @Input() nextText?: string;
  /** last button text */
  @Input() lastText?: string;
  /** if true current page will in the middle of pages list */
  @Input() rotate = true;
  // css
  /** add class to <code><li\></code> */
  @Input() pageBtnClass = '';
  /** if true pagination component will be disabled */
  @Input() disabled = false;
  /** custom template for page link */
  @Input() customPageTemplate?: TemplateRef<PaginationNumberLinkContext>;
  /** custom template for next link */
  @Input() customNextTemplate?: TemplateRef<PaginationLinkContext>;
  /** custom template for previous link */
  @Input() customPreviousTemplate?: TemplateRef<PaginationLinkContext>;
  /** custom template for first link */
  @Input() customFirstTemplate?: TemplateRef<PaginationLinkContext>;
  /** custom template for last link */
  @Input() customLastTemplate?: TemplateRef<PaginationLinkContext>;

  /** fired when total pages count changes, $event:number equals to total pages count */
  @Output() numPages = new EventEmitter<number>();
  /** fired when page was changed, $event:{page, itemsPerPage} equals to object
   * with current page index and number of items per page
   */
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  onChange = Function.prototype;
  onTouched = Function.prototype;
  classMap = '';
  pages?: PagesModel[];
  protected inited = false;

  constructor(
    private elementRef: ElementRef,
    paginationConfig: PaginationConfig,
    private changeDetection: ChangeDetectorRef
  ) {
    this.elementRef = elementRef;
    if (!this.config) {
      this.configureOptions(paginationConfig.main);
    }
  }

  protected _itemsPerPage = 10;

  /** maximum number of items per page. If value less than 1 will display all items on one page */
  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(v: number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  protected _totalItems = 0;

  /** total number of items in all pages */
  @Input()
  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(v: number) {
    this._totalItems = v;
    this.totalPages = this.calculateTotalPages();
  }

  protected _totalPages = 0;

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

  protected _page = 1;

  get page(): number {
    return this._page;
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

  configureOptions(config: Partial<ConfigModel>): void {
    this.config = Object.assign({}, config);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
    }

    // watch for maxSize
    if (typeof this.maxSize === 'undefined') {
      this.maxSize = this.config?.maxSize || 0;
    }

    if (typeof this.rotate === 'undefined') {
      this.rotate = !!this.config?.rotate;
    }

    if (typeof this.boundaryLinks === 'undefined') {
      this.boundaryLinks = !!this.config?.boundaryLinks;
    }


    if (typeof this.directionLinks === 'undefined') {
      this.directionLinks = !!this.config?.directionLinks;
    }

    if (typeof this.pageBtnClass === 'undefined') {
      this.pageBtnClass = this.config?.pageBtnClass || '';
    }

    // base class
    if (typeof this.itemsPerPage === 'undefined') {
      this.itemsPerPage = this.config?.itemsPerPage || 0;
    }

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any)[`${key}Text`] || (this as any).config[`${key}Text`];
  }

  noPrevious(): boolean {
    return this.page === 1;
  }

  noNext(): boolean {
    return this.page === this.totalPages;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectPage(page: number, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.disabled) {
      if (event && event.target) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target: any = event.target;
        target.blur();
      }
      this.writeValue(page);
      this.onChange(this.page);
    }
  }

  // Create page object used in template
  protected makePage(
    num: number,
    text: string,
    active: boolean
  ): { number: number; text: string; active: boolean } {
    return { text, number: num, active };
  }

  protected getPages(currentPage: number, totalPages: number): PagesModel[] {
    const pages: PagesModel[] = [];

    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    const isMaxSized =
      typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized && this.maxSize) {
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
