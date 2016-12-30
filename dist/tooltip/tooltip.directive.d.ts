import { TemplateRef, ViewContainerRef, EventEmitter, Renderer, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from '../component-loader';
export declare class TooltipDirective implements OnInit, OnDestroy {
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
     * Emits an event when the tooltip is shown
     */
    onShown: EventEmitter<any>;
    /**
     * Emits an event when the tooltip is hidden
     */
    onHidden: EventEmitter<any>;
    /** @deprecated */
    htmlContent: string | TemplateRef<any>;
    /** @deprecated */
    _placement: string;
    /** @deprecated */
    _isOpen: boolean;
    /** @deprecated */
    _enable: boolean;
    /** @deprecated */
    _appendToBody: boolean;
    /** @deprecated */
    _animation: boolean;
    /** @deprecated */
    _popupClass: string;
    /** @deprecated */
    _tooltipContext: any;
    /** @deprecated */
    _delay: number;
    /** @deprecated */
    _fadeDuration: number;
    /** @deprecated */
    _tooltipTrigger: string | Array<string>;
    /** @deprecated */
    tooltipStateChanged: EventEmitter<boolean>;
    protected _delayTimeoutId: number;
    private _tooltip;
    constructor(_viewContainerRef: ViewContainerRef, _renderer: Renderer, _elementRef: ElementRef, cis: ComponentLoaderFactory, config: TooltipConfig);
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
