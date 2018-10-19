import { ComponentRef, TemplateRef, EventEmitter, RendererFactory2 } from '@angular/core';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalOptions } from './modal-options.class';
import { BsModalRef } from './bs-modal-ref.service';
export declare class BsModalService {
    private clf;
    config: ModalOptions;
    onShow: EventEmitter<any>;
    onShown: EventEmitter<any>;
    onHide: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    protected isBodyOverflowing: boolean;
    protected originalBodyPadding: number;
    protected scrollbarWidth: number;
    protected backdropRef: ComponentRef<ModalBackdropComponent>;
    private _backdropLoader;
    private modalsCount;
    private lastDismissReason;
    private loaders;
    private _renderer;
    constructor(rendererFactory: RendererFactory2, clf: ComponentLoaderFactory);
    /** Shows a modal */
    show(content: string | TemplateRef<any> | any, config?: ModalOptions): BsModalRef;
    hide(level: number): void;
    _showBackdrop(): void;
    _hideBackdrop(): void;
    _showModal(content: any): BsModalRef;
    _hideModal(level: number): void;
    getModalsCount(): number;
    setDismissReason(reason: string): void;
    removeBackdrop(): void;
    setScrollbar(): void;
    private resetScrollbar();
    private getScrollbarWidth();
    private _createLoaders();
    private removeLoaders(level);
    private copyEvent(from, to);
}
