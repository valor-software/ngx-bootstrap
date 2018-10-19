import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from '../component-loader/index';
import 'rxjs/add/observable/timer';
export declare class TooltipDirective implements OnInit, OnDestroy {
    private _renderer;
    private _elementRef;
    /**
     * Content to be displayed as tooltip.
     */
    tooltip: string | TemplateRef<any>;
    /** Fired when tooltip content changes */
    tooltipChange: EventEmitter<string | TemplateRef<any>>;
    /**
     * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
     */
    placement: string;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     */
    container: string;
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    isOpen: boolean;
    /**
     * Allows to disable tooltip
     */
    isDisabled: boolean;
    /**
     * Css class for tooltip container
     */
    containerClass: string;
    /**
     * Delay before showing the tooltip
     */
    delay: number;
    /**
     * Emits an event when the tooltip is shown
     */
    onShown: EventEmitter<any>;
    /**
     * Emits an event when the tooltip is hidden
     */
    onHidden: EventEmitter<any>;
    /** @deprecated - please use `tooltip` instead */
    htmlContent: string | TemplateRef<any>;
    /** @deprecated - please use `placement` instead */
    _placement: string;
    /** @deprecated - please use `isOpen` instead*/
    _isOpen: boolean;
    /** @deprecated - please use `isDisabled` instead */
    _enable: boolean;
    /** @deprecated - please use `container="body"` instead */
    _appendToBody: boolean;
    /** @deprecated - removed, will be added to configuration */
    _animation: boolean;
    /** @deprecated - will replaced with customClass */
    _popupClass: string;
    /** @deprecated - removed */
    _tooltipContext: any;
    /** @deprecated */
    _tooltipPopupDelay: number;
    /** @deprecated */
    _fadeDuration: number;
    /** @deprecated -  please use `triggers` instead */
    _tooltipTrigger: string | string[];
    /** @deprecated */
    tooltipStateChanged: EventEmitter<boolean>;
    protected _delayTimeoutId: number | any;
    protected _tooltipCancelShowFn: Function;
    private _tooltip;
    constructor(_viewContainerRef: ViewContainerRef, _renderer: Renderer2, _elementRef: ElementRef, cis: ComponentLoaderFactory, config: TooltipConfig);
    ngOnInit(): void;
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    toggle(): void;
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    show(): void;
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    hide(): void;
    ngOnDestroy(): void;
}
