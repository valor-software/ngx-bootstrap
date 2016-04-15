import { OnInit, ElementRef, Renderer } from 'angular2/core';
import { NgModel } from 'angular2/common';
import { Pagination } from './pagination.component';
export declare class Pager extends Pagination implements OnInit {
    config: any;
    constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
}
