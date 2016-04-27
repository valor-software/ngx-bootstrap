import { OnInit, ElementRef, Renderer } from 'angular2/core';
import { NgModel } from 'angular2/common';
import { PaginationComponent } from './pagination.component';
export declare class PagerComponent extends PaginationComponent implements OnInit {
    config: any;
    constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
}
