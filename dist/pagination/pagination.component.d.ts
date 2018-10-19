import { ElementRef, EventEmitter, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PaginationConfig } from './pagination.config';
export interface PageChangedEvent {
    itemsPerPage: number;
    page: number;
}
export declare const PAGINATION_CONTROL_VALUE_ACCESSOR: any;
export declare class PaginationComponent implements ControlValueAccessor, OnInit {
    private renderer;
    private elementRef;
    private changeDetection;
    config: any;
    /** if `true` aligns each link to the sides of pager */
    align: boolean;
    /** limit number for page links in pager */
    maxSize: number;
    /** if false first and last buttons will be hidden */
    boundaryLinks: boolean;
    /** if false previous and next buttons will be hidden */
    directionLinks: boolean;
    /** first button text */
    firstText: string;
    /** previous button text */
    previousText: string;
    /** next button text */
    nextText: string;
    /** last button text */
    lastText: string;
    /** if true current page will in the middle of pages list */
    rotate: boolean;
    /** add class to <code><li\></code>*/
    pageBtnClass: string;
    /** if true pagination component will be disabled */
    disabled: boolean;
    /** fired when total pages count changes, $event:number equals to total pages count */
    numPages: EventEmitter<number>;
    /** fired when page was changed, $event:{page, itemsPerPage} equals to object
     * with current page index and number of items per page
     */
    pageChanged: EventEmitter<PageChangedEvent>;
    /** maximum number of items per page. If value less than 1 will display all items on one page */
    itemsPerPage: number;
    /** total number of items in all pages */
    totalItems: number;
    totalPages: number;
    page: number;
    onChange: any;
    onTouched: any;
    classMap: string;
    pages: any[];
    protected _itemsPerPage: number;
    protected _totalItems: number;
    protected _totalPages: number;
    protected inited: boolean;
    protected _page: number;
    constructor(renderer: Renderer2, elementRef: ElementRef, paginationConfig: PaginationConfig, changeDetection: ChangeDetectorRef);
    configureOptions(config: any): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    getText(key: string): string;
    noPrevious(): boolean;
    noNext(): boolean;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    selectPage(page: number, event?: Event): void;
    protected makePage(num: number, text: string, active: boolean): {
        number: number;
        text: string;
        active: boolean;
    };
    protected getPages(currentPage: number, totalPages: number): any[];
    protected calculateTotalPages(): number;
}
