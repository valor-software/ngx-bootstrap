import { ProgressbarConfig } from './progressbar.config';
import { BarComponent } from './bar.component';
export declare class ProgressbarComponent {
    /** if `true` changing value of progress bar will be animated*/
    animate: boolean;
    /** If `true`, striped classes are applied */
    striped: boolean;
    /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
    type: string;
    /** current value of progress bar. Could be a number or array of objects
     * like {"value":15,"type":"info","label":"15 %"}
     */
    value: number | any[];
    isStacked: boolean;
    _value: number | any[];
    readonly isBs3: boolean;
    /** maximum total value of progress element */
    max: number;
    addClass: boolean;
    bars: any[];
    protected _max: number;
    constructor(config: ProgressbarConfig);
    addBar(bar: BarComponent): void;
    removeBar(bar: BarComponent): void;
}
