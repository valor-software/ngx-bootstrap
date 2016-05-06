import { OnInit } from '@angular/core';
import { BarComponent } from './bar.component';
export declare class ProgressDirective implements OnInit {
    animate: boolean;
    max: number;
    addClass: boolean;
    bars: Array<any>;
    private _max;
    ngOnInit(): void;
    addBar(bar: BarComponent): void;
    removeBar(bar: BarComponent): void;
}
