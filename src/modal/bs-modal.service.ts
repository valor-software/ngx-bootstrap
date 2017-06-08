import { ComponentRef, ElementRef, Injectable, Input, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { Utils } from '../utils/utils.class';
import { modalConfigDefaults, ModalOptions } from './modal-options.class';
import { ModalDirective } from './modal.component';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Injectable()
export class BsModalService {
  /** Template for modal */
  @Input() public template: TemplateRef<any>;
  // constructor props
  public isAnimated: boolean = true;
  public config: ModalOptions = modalConfigDefaults;
  protected _isShown: boolean = false;
  protected timerRmBackDrop: number = 0;
  protected _element: ElementRef;
  protected _renderer: Renderer;
  private _backdrop: ComponentLoader<ModalBackdropComponent>;
  protected backdrop: ComponentRef<ModalBackdropComponent>;
  private _modal: ComponentLoader<ModalContainerComponent>;
  private modal: ModalDirective;
  public constructor(private clf: ComponentLoaderFactory) {}

  public show(template: string | TemplateRef<any>, _element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer): ModalContainerComponent {
    this._backdrop = this.clf.createLoader<ModalBackdropComponent>(_element, _viewContainerRef, _renderer);
    this._modal = this.clf
      .createLoader<ModalContainerComponent>(_element, _viewContainerRef, _renderer)
      .provide({provide: ModalOptions, useValue: modalConfigDefaults});
    clearTimeout(this.timerRmBackDrop);
    this._isShown = true;
    this.showBackdrop();
    this._modal
      .attach(ModalContainerComponent)
      .to('body')
      .show({
        content: template
      });
    return this._modal._componentRef.instance;
  }

  public hide() {
    this._isShown = false;
    this.backdrop.instance.isShown = false;
    setTimeout(() => {
      this.removeBackdrop();
      this._modal.hide();
      this.backdrop = null;
      this._modal = null;
    }, BACKDROP_TRANSITION_DURATION);
  }
  /** @internal */
  protected showBackdrop(callback?: Function): void {
    if (this._isShown && this.config.backdrop && (!this.backdrop || !this.backdrop.instance.isShown)) {
      this.removeBackdrop();
      this._backdrop
        .attach(ModalBackdropComponent)
        .to('body')
        .show({isAnimated: false});
      this.backdrop = this._backdrop._componentRef;

      if (this.isAnimated) {
        this.backdrop.instance.isAnimated = this.isAnimated;
        Utils.reflow(this.backdrop.instance.element.nativeElement);
      }

      this.backdrop.instance.isShown = true;
      if (!callback) {
        return;
      }

      if (!this.isAnimated) {
        callback();
        return;
      }

      setTimeout(callback, BACKDROP_TRANSITION_DURATION);
    } else if (!this._isShown && this.backdrop) {
      this.backdrop.instance.isShown = false;

      let callbackRemove = () => {
        this.removeBackdrop();
        if (callback) {
          callback();
        }
      };

      if (this.backdrop.instance.isAnimated) {
        this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
      } else {
        callbackRemove();
      }
    } else if (callback) {
      callback();
    }
  }
  protected removeBackdrop(): void {
    this._backdrop.hide();
  }
}
