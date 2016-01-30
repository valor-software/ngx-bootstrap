import { ElementRef } from 'angular2/core';
import { Typeahead } from './typeahead.directive';
import { TypeaheadOptions } from './typeahead-options.class';
export declare class TypeaheadContainer {
    element: ElementRef;
    parent: Typeahead;
    query: any;
    private _matches;
    private _field;
    private _active;
    private top;
    private left;
    private display;
    private placement;
    constructor(element: ElementRef, options: TypeaheadOptions);
    matches: Array<string>;
    field: string;
    position(hostEl: ElementRef): void;
    selectActiveMatch(): void;
    prevActiveMatch(): void;
    nextActiveMatch(): void;
    private selectActive(value);
    private isActive(value);
    private selectMatch(value, e?);
    private hightlight(item, query);
}
