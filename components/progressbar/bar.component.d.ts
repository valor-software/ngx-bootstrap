import { OnInit, OnDestroy } from 'angular2/core';
import { Progress } from './progress.directive';
export declare class Bar implements OnInit, OnDestroy {
    progress: Progress;
    type: string;
    value: number;
    percent: number;
    transition: string;
    private _value;
    constructor(progress: Progress);
    ngOnInit(): void;
    ngOnDestroy(): void;
    recalculatePercentage(): void;
}
