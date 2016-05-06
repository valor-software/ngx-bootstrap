import { OnInit, OnDestroy } from '@angular/core';
import { AccordionComponent } from './accordion.component';
export declare class AccordionPanelComponent implements OnInit, OnDestroy {
    heading: string;
    panelClass: string;
    isDisabled: boolean;
    isOpen: boolean;
    private _isOpen;
    private accordion;
    constructor(accordion: AccordionComponent);
    ngOnInit(): any;
    ngOnDestroy(): any;
    toggleOpen(event: MouseEvent): any;
}
