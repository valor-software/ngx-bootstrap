import { EventEmitter, Injectable, TemplateRef } from '@angular/core';
import { ComponentLoader } from '../component-loader';
import { ModalContainerComponent } from './modal-container.component';
import { ModalOptions } from './modal-options.class';
import { BsModalService } from './bs-modal.service';

@Injectable()
export class BsModalRef {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: any | null;
  _modalService: BsModalService;
  onShow: EventEmitter<any> = new EventEmitter();
  onShown: EventEmitter<any> = new EventEmitter();
  onHide: EventEmitter<any> = new EventEmitter();
  onHidden: EventEmitter<any> = new EventEmitter();
  constructor(private _modalContainerRef: ComponentLoader<ModalContainerComponent>, private _config: ModalOptions) {
    this._modalContainerRef
      .provide({ provide: ModalOptions, useValue: this._config })
      .provide({ provide: BsModalRef, useValue: this })
      .attach(ModalContainerComponent)
      .to('body');
  }
  /**
   * Shows the modal
   */
  show(content: string | TemplateRef<any> | any) {
    this._modalService.config = Object.assign({}, this._config);
    this._modalService.modalsCount++;
    this._modalService.loaders.push(this._modalContainerRef);
    this._modalService._showBackdrop();
    this._modalService.lastDismissReason = null;
    this._modalContainerRef.show({content, isAnimated: this._config.animated, bsModalService: this._modalService});
    this._modalContainerRef.instance.level = this._modalService.getModalsCount();
    this.content = this._modalContainerRef.getInnerComponent() || null;

    return this;
  }
  /**
   * Hides the modal
   */
  hide(dismissReason?: any): void {
    this._modalContainerRef.instance.hide(dismissReason);
  }
}

