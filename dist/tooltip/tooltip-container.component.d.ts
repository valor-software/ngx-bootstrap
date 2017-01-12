import { AfterViewInit } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
export declare class TooltipContainerComponent implements AfterViewInit {
    classMap: any;
    placement: string;
    popupClass: string;
    animation: boolean;
    constructor(config: TooltipConfig);
    ngAfterViewInit(): void;
}
