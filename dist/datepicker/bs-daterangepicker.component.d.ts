import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { BsDaterangepickerConfig } from './bs-daterangepicker.config';
import { Subscription } from 'rxjs/Subscription';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
export declare class BsDaterangepickerDirective implements OnInit, OnDestroy, OnChanges {
    _config: BsDaterangepickerConfig;
    /**
     * Placement of a daterangepicker. Accepts: "top", "bottom", "left", "right"
     */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * Close daterangepicker on outside click
     */
    outsideClick: boolean;
    /**
     * A selector specifying the element the daterangepicker should be appended
     * to. Currently only supports "body".
     */
    container: string;
    /**
     * Returns whether or not the daterangepicker is currently being shown
     */
    isOpen: boolean;
    /**
     * Emits an event when the daterangepicker is shown
     */
    onShown: EventEmitter<any>;
    /**
     * Emits an event when the daterangepicker is hidden
     */
    onHidden: EventEmitter<any>;
    _bsValue: Date[];
    /**
     * Initial value of daterangepicker
     */
    bsValue: Date[];
    /**
     * Config object for daterangepicker
     */
    bsConfig: Partial<BsDaterangepickerConfig>;
    /**
     * Indicates whether daterangepicker's content is enabled or not
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
     * Emits when daterangepicker value has been changed
     */
    bsValueChange: EventEmitter<Date[]>;
    protected _subs: Subscription[];
    private _datepicker;
    private _datepickerRef;
    constructor(_config: BsDaterangepickerConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    ngOnInit(): any;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    show(): void;
    /**
     * Set config for daterangepicker
     */
    setConfig(): void;
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
    ngOnDestroy(): any;
}
