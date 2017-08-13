import { ProgressbarConfig } from './progressbar.config';
export declare class ProgressbarComponent {
    /** if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) */
    animate: boolean;
    /** maximum total value of progress element */
    max: number;
    /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
    type: string;
    /** current value of progress bar. Could be a number or array of objects like {"value":15,"type":"info","label":"15 %"} */
    value: number | any[];
    isStacked: boolean;
    _value: number | any[];
    readonly isBs3: boolean;
    constructor(config: ProgressbarConfig);
}
