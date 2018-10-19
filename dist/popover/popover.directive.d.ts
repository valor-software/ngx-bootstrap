import { ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { ComponentLoaderFactory } from '../component-loader/index';
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
export declare class PopoverDirective implements OnInit, OnDestroy {
    /**
     * Content to be displayed as popover.
     */
    popover: string | TemplateRef<any>;
    /**
     * Context to be used if popover is a template.
     */
    popoverContext: any;
    /**
     * Title of a popover.
     */
    popoverTitle: string;
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     */
    placement: 'top' | 'bottom' | 'left' | 'right' | 'auto';
    /**
     * Close popover on outside click
     */
    outsideClick: boolean;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * A selector specifying the element the popover should be appended to.
     * Currently only supports "body".
     */
    container: string;
    /**
     * Css class for popover container
     */
    containerClass: string;
    /**
     * Returns whether or not the popover is currently being shown
     */
    isOpen: boolean;
    /**
     * Emits an event when the popover is shown
     */
    onShown: EventEmitter<any>;
    /**
     * Emits an event when the popover is hidden
     */
    onHidden: EventEmitter<any>;
    private _popover;
    private _isInited;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, _config: PopoverConfig, cis: ComponentLoaderFactory);
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show(): void;
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide(): void;
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    toggle(): void;
    ngOnInit(): any;
    ngOnDestroy(): any;
}
