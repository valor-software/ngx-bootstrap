import { OnInit, OnDestroy } from '@angular/core';
import { ProgressDirective } from './progress.directive';
export declare class BarComponent implements OnInit, OnDestroy {
    type: string;
    value: number;
    percent: number;
    transition: string;
    progress: ProgressDirective;
    private _value;
    constructor(progress: ProgressDirective);
    ngOnInit(): void;
    ngOnDestroy(): void;
    recalculatePercentage(): void;
}
