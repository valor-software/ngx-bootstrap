import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { BsDatepickerConfig } from './bs-datepicker.config';
export declare class BsDatepickerDirective implements OnInit, OnDestroy, OnChanges {
    _config: BsDatepickerConfig;
    /**
     * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
     */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * Close datepicker on outside click
     */
    outsideClick: boolean;
    /**
     * A selector specifying the element the datepicker should be appended to.
     * Currently only supports "body".
     */
    container: string;
    /**
     * Returns whether or not the datepicker is currently being shown
     */
    isOpen: boolean;
    /**
     * Emits an event when the datepicker is shown
     */
    onShown: EventEmitter<any>;
    /**
     * Emits an event when the datepicker is hidden
     */
    onHidden: EventEmitter<any>;
    _bsValue: Date;
    /**
     * Initial value of datepicker
     */
    bsValue: Date;
    /**
     * Config object for datepicker
     */
    bsConfig: Partial<BsDatepickerConfig>;
    /**
     * Indicates whether datepicker's content is enabled or not
     */
    isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    minDate: Date;
    /**
     * Maximum date which is available for selection
     */
    maxDate: Date;
    disableYearView: boolean;
    disableMonthView: boolean;
    /**
     * Emits when datepicker value has been changed
     */
    bsValueChange: EventEmitter<Date>;
    protected _subs: Subscription[];
    private _datepicker;
    private _datepickerRef;
    constructor(_config: BsDatepickerConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    ngOnInit(): any;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    show(): void;
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    hide(): void;
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     */
    toggle(): void;
    /**
     * Set config for datepicker
     */
    setConfig(): void;
    ngOnDestroy(): any;
}
