import { OnInit, ElementRef, Renderer } from '@angular/core';
import { NgModel } from '@angular/common';
import { PaginationComponent } from './pagination.component';
export declare class PagerComponent extends PaginationComponent implements OnInit {
    config: any;
    constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
}
