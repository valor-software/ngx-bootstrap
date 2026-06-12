import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  Provider,
  TemplateRef,
  input,
  output,
  effect
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ConfigModel, PagesModel, PaginationLinkContext, PaginationNumberLinkContext } from './models';

import { PaginationConfig } from './pagination.config';
import { NgClass, NgTemplateOutlet } from '@angular/common';

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
    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR],
    standalone: true,
    imports: [NgClass, NgTemplateOutlet]
})
export class PaginationComponent implements ControlValueAccessor, OnInit {
  config?: Partial<ConfigModel>;
  /** if `true` aligns each link to the sides of pager */
  align = input<boolean>(true);
  /** limit number for page links in pager */
  maxSize = input<number | undefined>();
  /** if false first and last buttons will be hidden */
  boundaryLinks = input<boolean>(false);
  /** if false previous and next buttons will be hidden */
  directionLinks = input<boolean>(true);
  // labels
  /** first button text */
  firstText = input<string | undefined>();
  /** previous button text */
  previousText = input<string | undefined>();
  /** next button text */
  nextText = input<string | undefined>();
  /** last button text */
  lastText = input<string | undefined>();
  /** if true current page will in the middle of pages list */
  rotate = input<boolean>(true);
  // css
  /** add class to <code><li\></code> */
  pageBtnClass = input<string>('');
  /** if true pagination component will be disabled */
  disabled = input<boolean>(false);
  /** custom template for page link */
  customPageTemplate = input<TemplateRef<PaginationNumberLinkContext> | undefined>();
  /** custom template for next link */
  customNextTemplate = input<TemplateRef<PaginationLinkContext> | undefined>();
  /** custom template for previous link */
  customPreviousTemplate = input<TemplateRef<PaginationLinkContext> | undefined>();
  /** custom template for first link */
  customFirstTemplate = input<TemplateRef<PaginationLinkContext> | undefined>();
  /** custom template for last link */
  customLastTemplate = input<TemplateRef<PaginationLinkContext> | undefined>();

  /** maximum number of items per page. If value less than 1 will display all items on one page */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  itemsPerPageInput = input<number>(10, { alias: 'itemsPerPage' });
  /** total number of items in all pages */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  totalItemsInput = input<number>(0, { alias: 'totalItems' });

  /** fired when total pages count changes, $event:number equals to total pages count */
  numPages = output<number>();
  /** fired when page was changed, $event:{page, itemsPerPage} equals to object
   * with current page index and number of items per page
   */
  pageChanged = output<PageChangedEvent>();
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

    // Watch for itemsPerPage changes
    effect(() => {
      this._itemsPerPage = this.itemsPerPageInput();
      this.totalPages = this.calculateTotalPages();
    });

    // Watch for totalItems changes
    effect(() => {
      this._totalItems = this.totalItemsInput();
      this.totalPages = this.calculateTotalPages();
    });

    // Watch for rotate/maxSize changes
    effect(() => {
      const rotateVal = this.rotate();
      const maxSizeVal = this.maxSize();
      this._rotate = typeof rotateVal === 'undefined' ? !!this.config?.rotate : rotateVal;
      this._maxSize = typeof maxSizeVal === 'undefined' ? this.config?.maxSize || 0 : maxSizeVal;
      if (this.inited) {
        this.pages = this.getPages(this.page, this.totalPages);
        this.changeDetection.markForCheck();
      }
    });
  }

  protected _itemsPerPage = 10;

  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  protected _totalItems = 0;

  get totalItems(): number {
    return this._totalItems;
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
    const maxSizeVal = this.maxSize();
    const _maxSize = typeof maxSizeVal === 'undefined' ? this.config?.maxSize || 0 : maxSizeVal;

    const rotateVal = this.rotate();
    const _rotate = typeof rotateVal === 'undefined' ? !!this.config?.rotate : rotateVal;

    const boundaryLinksVal = this.boundaryLinks();
    const _boundaryLinks = typeof boundaryLinksVal === 'undefined' ? !!this.config?.boundaryLinks : boundaryLinksVal;

    const directionLinksVal = this.directionLinks();
    const _directionLinks = typeof directionLinksVal === 'undefined' ? !!this.config?.directionLinks : directionLinksVal;

    const pageBtnClassVal = this.pageBtnClass();
    const _pageBtnClass = typeof pageBtnClassVal === 'undefined' ? this.config?.pageBtnClass || '' : pageBtnClassVal;

    // Store resolved values for use
    this._maxSize = _maxSize;
    this._rotate = _rotate;
    this._boundaryLinks = _boundaryLinks;
    this._directionLinks = _directionLinks;
    this._pageBtnClass = _pageBtnClass;

    // base class
    if (typeof this.itemsPerPage === 'undefined') {
      this._itemsPerPage = this.config?.itemsPerPage || 0;
    }

    this.totalPages = this.calculateTotalPages();
    // this class
    this.pages = this.getPages(this.page, this.totalPages);
    this.inited = true;
  }

  // Resolved configuration values
  protected _maxSize = 0;
  protected _rotate = true;
  protected _boundaryLinks = false;
  protected _directionLinks = true;
  protected _pageBtnClass = '';

  writeValue(value: number): void {
    this.page = value;
    this.pages = this.getPages(this.page, this.totalPages);
  }

  getText(key: string): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputVal = (this as any)[`${key}Text`]?.();
    return inputVal || (this as any).config[`${key}Text`];
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

    if (!this.disabled()) {
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
    const maxSize = this._maxSize;
    const rotate = this._rotate;


    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    const isMaxSized =
      typeof maxSize !== 'undefined' && maxSize < totalPages;

    // recompute if maxSize
    if (isMaxSized && maxSize) {
      if (rotate) {
        // Current page is displayed in the middle of the visible ones
        startPage = Math.max(currentPage - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;

        // Adjust if limit is exceeded
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - maxSize + 1;
        }
      } else {
        // Visible pages are paginated with maxSize
        startPage =
          (Math.ceil(currentPage / maxSize) - 1) * maxSize + 1;

        // Adjust last page if limit is exceeded
        endPage = Math.min(startPage + maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (let num = startPage; num <= endPage; num++) {
      const page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && !rotate) {
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
