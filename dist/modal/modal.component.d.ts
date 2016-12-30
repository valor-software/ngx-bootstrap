import { AfterViewInit, ComponentRef, ElementRef, EventEmitter, OnDestroy, Renderer, ViewContainerRef } from '@angular/core';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalOptions } from './modal-options.class';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
/** Mark any code with directive to show it's content in modal */
export declare class ModalDirective implements AfterViewInit, OnDestroy {
    /** allows to set modal configuration via element property */
    config: ModalOptions;
    /** This event fires immediately when the `show` instance method is called. */
    onShow: EventEmitter<ModalDirective>;
    /** This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete) */
    onShown: EventEmitter<ModalDirective>;
    /** This event is fired immediately when the hide instance method has been called. */
    onHide: EventEmitter<ModalDirective>;
    /** This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete). */
    onHidden: EventEmitter<ModalDirective>;
    isAnimated: boolean;
    readonly isShown: boolean;
    protected _config: ModalOptions;
    protected _isShown: boolean;
    protected isBodyOverflowing: boolean;
    protected originalBodyPadding: number;
    protected scrollbarWidth: number;
    protected timerHideModal: number;
    protected timerRmBackDrop: number;
    protected _element: ElementRef;
    protected _renderer: Renderer;
    protected backdrop: ComponentRef<ModalBackdropComponent>;
    private _backdrop;
    private _dialog;
    onClick(event: any): void;
    onEsc(): void;
    constructor(_element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer, clf: ComponentLoaderFactory);
    ngOnDestroy(): any;
    ngAfterViewInit(): any;
    /** Allows to manually toggle modal visibility */
    toggle(): void;
    /** Allows to manually open modal */
    show(): void;
    /** Allows to manually close modal */
    hide(event?: Event): void;
    protected setScrollbar(): void;
    protected resetScrollbar(): void;
    protected getScrollbarWidth(): number;
}
