import { OnInit, ElementRef, EventEmitter, Renderer } from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';
import { KeyAttribute } from '../common';
export interface PaginationConfig extends KeyAttribute {
    maxSize: number;
    itemsPerPage: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    previousText: string;
    nextText: string;
    lastText: string;
    rotate: boolean;
}
export interface PageChangedEvent {
    itemsPerPage: number;
    page: number;
}
export declare class Pagination implements ControlValueAccessor, OnInit, PaginationConfig, KeyAttribute {
    config: any;
    maxSize: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    previousText: string;
    nextText: string;
    lastText: string;
    rotate: boolean;
    disabled: boolean;
    numPages: EventEmitter<number>;
    pageChanged: EventEmitter<PageChangedEvent>;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    page: number;
    onChange: any;
    onTouched: any;
    cd: NgModel;
    renderer: Renderer;
    elementRef: ElementRef;
    private classMap;
    private _itemsPerPage;
    private _totalItems;
    private _totalPages;
    private inited;
    private _page;
    private pages;
    constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
    ngOnInit(): void;
    writeValue(value: number): void;
    getText(key: string): string;
    noPrevious(): boolean;
    noNext(): boolean;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    private selectPage(page, event?);
    private makePage(num, text, isActive);
    private getPages(currentPage, totalPages);
    private calculateTotalPages();
}
