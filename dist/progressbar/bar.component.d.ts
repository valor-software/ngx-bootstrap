import { OnDestroy, OnInit } from '@angular/core';
import { ProgressDirective } from './progress.directive';
export declare class BarComponent implements OnInit, OnDestroy {
    max: number;
    /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
    type: string;
    /** current value of progress bar */
    value: number;
    percent: number;
    transition: string;
    progress: ProgressDirective;
    protected _value: number;
    constructor(progress: ProgressDirective);
    ngOnInit(): void;
    ngOnDestroy(): void;
    recalculatePercentage(): void;
}
