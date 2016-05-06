import { ElementRef } from '@angular/core';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadOptions } from './typeahead-options.class';
export declare class TypeaheadContainerComponent {
    parent: TypeaheadDirective;
    query: any;
    element: ElementRef;
    isFocused: boolean;
    private _active;
    private _matches;
    private _field;
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
    protected selectActive(value: any): void;
    protected hightlight(item: any, query: string): string;
    protected focusLost(): void;
    isActive(value: any): boolean;
    private selectMatch(value, e?);
}
