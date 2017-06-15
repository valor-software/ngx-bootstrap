import {ComponentRef, ElementRef, Injectable, Renderer, TemplateRef, ViewContainerRef} from '@angular/core';
import { ComponentLoader } from '../component-loader/component-loader.class';
import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalContainerComponent } from './modal-container.component';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { Utils } from '../utils/utils.class';
import { modalConfigDefaults, ModalOptions } from './modal-options.class';

const TRANSITION_DURATION = 300;
const BACKDROP_TRANSITION_DURATION = 150;

@Injectable()
export class BsModalService {
  // constructor props
  public isAnimated: boolean = true;
  public config: ModalOptions = modalConfigDefaults;
  protected _isShown: boolean = false;
  protected timerRmBackDrop: number = 0;
  private _backdrop: ComponentLoader<ModalBackdropComponent>;
  protected backdrop: ComponentRef<ModalBackdropComponent>;
  private _modal: ComponentLoader<ModalContainerComponent>;
  public constructor(private clf: ComponentLoaderFactory) {}

  public create(_element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer) {
    this._backdrop = this.clf.createLoader<ModalBackdropComponent>(_element, _viewContainerRef, _renderer);
    this._modal = this.clf
      .createLoader<ModalContainerComponent>(_element, _viewContainerRef, _renderer);
    return this;
  }

  public show(content: string | TemplateRef<any> | any, config: any = {}): ModalContainerComponent {
    this.config = Object.assign({}, modalConfigDefaults, config);
    clearTimeout(this.timerRmBackDrop);
    this._isShown = true;
    this.showBackdrop();
    const modalContainer = this._modal
      .provide({provide: ModalOptions, useValue: this.config})
      .attach(ModalContainerComponent)
      .to('body')
      .show({content});
    return modalContainer.instance;
  }

  public hide() {
    this._isShown = false;
    if (this.backdrop && this.backdrop.instance) {
      this.backdrop.instance.isShown = false;
    }
    setTimeout(() => {
      this.removeBackdrop();
      if (this._modal) {
        this._modal.hide();
      }
      this.backdrop = null;
    }, BACKDROP_TRANSITION_DURATION);
  }
  /** @internal */
  protected showBackdrop(callback?: Function): void {
    if (this._isShown && (this.config.backdrop || this.config.backdrop === 'static') && (!this.backdrop || !this.backdrop.instance.isShown)) {
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
