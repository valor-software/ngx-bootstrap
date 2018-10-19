import { AfterViewInit } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
export declare class TooltipContainerComponent implements AfterViewInit {
    classMap: any;
    placement: string;
    containerClass: string;
    animation: boolean;
    readonly isBs3: boolean;
    constructor(config: TooltipConfig);
    ngAfterViewInit(): void;
}
