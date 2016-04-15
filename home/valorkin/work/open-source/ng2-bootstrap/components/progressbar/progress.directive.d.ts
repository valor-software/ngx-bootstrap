import { OnInit } from 'angular2/core';
import { Bar } from './bar.component';
export declare class Progress implements OnInit {
    animate: boolean;
    max: number;
    addClass: boolean;
    bars: Array<any>;
    private _max;
    constructor();
    ngOnInit(): void;
    addBar(bar: Bar): void;
    removeBar(bar: Bar): void;
}
