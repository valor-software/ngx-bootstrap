import { OnDestroy, OnInit } from '@angular/core';
import { AccordionComponent } from './accordion.component';
export declare class AccordionPanelComponent implements OnInit, OnDestroy {
    /** Clickable text in accordion's group header, check `accordion heading` below for using html in header */
    heading: string;
    /** Provides an ability to use Bootstrap's contextual panel classes (`panel-primary`, `panel-success`, `panel-info`, etc...). List of all available classes [available here](http://getbootstrap.com/components/#panels-alternatives) */
    panelClass: string;
    /** if <code>true</code> — disables accordion group */
    isDisabled: boolean;
    /** Is accordion group open or closed */
    isOpen: boolean;
    readonly isBs3: boolean;
    protected _isOpen: boolean;
    protected accordion: AccordionComponent;
    constructor(accordion: AccordionComponent);
    ngOnInit(): any;
    ngOnDestroy(): any;
    toggleOpen(event: Event): any;
}
