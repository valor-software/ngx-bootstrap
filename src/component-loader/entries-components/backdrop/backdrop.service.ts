import {
  ComponentRef,
  Injectable,
  Renderer2,
  RendererFactory2,
} from "@angular/core";

import { ComponentLoader } from '../../component-loader.class';
import { ComponentLoaderFactory } from '../../component-loader.factory';
import { BackdropComponent } from "./backdrop.component";
import { Subject, Subscription } from "rxjs";

const CLASS_NAME = {
  BACKDROP: 'modal-backdrop',
  OFFCANVAS: 'offcanvas-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  SHOW: 'show'
};

@Injectable({providedIn: 'platform'})
export class BackdropService {
  protected backdropRef?: ComponentRef<BackdropComponent>;
  private _backdropLoader: ComponentLoader<BackdropComponent>;
  public backDropIsCLicked = new Subject<void>();
  public backdropSub?: Subscription;
  private _renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private clf: ComponentLoaderFactory) {
    this._backdropLoader = this.clf.createLoader<BackdropComponent>();
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  _showBackdrop(isAnimated: boolean, className: 'OFFCANVAS' | 'BACKDROP' = 'BACKDROP'): void {
    const isBackdropInDOM =
      !this.backdropRef || !this.backdropRef.instance.isShown;

    if (isBackdropInDOM) {
      this._backdropLoader
        .attach(BackdropComponent)
        .to('body')
        .show({ isAnimated });
      this.backdropRef = this._backdropLoader._componentRef;
      if (this.backdropRef) {
        this.backdropRef.instance.className = CLASS_NAME[className];
        this.backdropSub = this.backdropRef.instance.backdropIsClicked.subscribe(() => {
          this.backDropIsCLicked.next();
        });
      }

    }
  }

  _hideBackdrop(isAnimated: boolean): void {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.isShown = false;
    const duration = isAnimated ? 150 : 0;
    setTimeout(() => this.removeBackdrop(), duration);
  }


  removeBackdrop(): void {
    this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
    this._renderer.setStyle(document.body, 'overflow-y', '');
    this._backdropLoader.hide();
    this.backdropRef = void 0;
  }
}
