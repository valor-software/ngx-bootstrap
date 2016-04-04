import { OnInit, OnDestroy } from 'angular2/core';
import { Accordion } from './accordion.component';
export declare class AccordionPanel implements OnInit, OnDestroy {
    heading: string;
    panelClass: string;
    isDisabled: boolean;
    isOpen: boolean;
    private _isOpen;
    private accordion;
    constructor(accordion: Accordion);
    ngOnInit(): any;
    ngOnDestroy(): any;
    toggleOpen(event: MouseEvent): any;
}
