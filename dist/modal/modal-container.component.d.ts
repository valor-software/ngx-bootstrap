import { ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';
import { ModalOptions } from './modal-options.class';
import { BsModalService } from './bs-modal.service';
export declare class ModalContainerComponent implements OnInit, OnDestroy {
    private bsModalService;
    private _renderer;
    config: ModalOptions;
    isShown: boolean;
    level: number;
    isAnimated: boolean;
    protected _element: ElementRef;
    private isModalHiding;
    onClick(event: any): void;
    onEsc(): void;
    constructor(options: ModalOptions, _element: ElementRef, bsModalService: BsModalService, _renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
    hide(): void;
}
