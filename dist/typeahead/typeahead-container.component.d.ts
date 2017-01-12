import { ElementRef, TemplateRef } from '@angular/core';
import { TypeaheadDirective } from './typeahead.directive';
import { TypeaheadMatch } from './typeahead-match.class';
export declare class TypeaheadContainerComponent {
    parent: TypeaheadDirective;
    query: any;
    element: ElementRef;
    isFocused: boolean;
    top: string;
    left: string;
    display: string;
    placement: string;
    readonly isBs4: boolean;
    protected _active: TypeaheadMatch;
    protected _matches: TypeaheadMatch[];
    constructor(element: ElementRef);
    matches: TypeaheadMatch[];
    readonly itemTemplate: TemplateRef<any>;
    selectActiveMatch(): void;
    prevActiveMatch(): void;
    nextActiveMatch(): void;
    selectActive(value: TypeaheadMatch): void;
    hightlight(match: TypeaheadMatch, query: any): string;
    focusLost(): void;
    isActive(value: TypeaheadMatch): boolean;
    selectMatch(value: TypeaheadMatch, e?: Event): boolean;
}
