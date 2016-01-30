import { OnInit, OnDestroy } from 'angular2/core';
import { Accordion } from './accordion.component';
export declare class AccordionPanel implements OnInit, OnDestroy {
    private accordion;
    heading: string;
    panelClass: string;
    isDisabled: boolean;
    isOpen: boolean;
    private _isOpen;
    constructor(accordion: Accordion);
    ngOnInit(): void;
    ngOnDestroy(): void;
    toggleOpen(event: MouseEvent): void;
}
