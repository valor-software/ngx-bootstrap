import { OnInit, OnDestroy } from 'angular2/core';
import { Progress } from './progress.directive';
export declare class Bar implements OnInit, OnDestroy {
    type: string;
    value: number;
    percent: number;
    transition: string;
    progress: Progress;
    private _value;
    constructor(progress: Progress);
    ngOnInit(): void;
    ngOnDestroy(): void;
    recalculatePercentage(): void;
}
