import {
  ComponentRef,
  Injectable,
  TemplateRef,
  EventEmitter,
  Renderer2,
  RendererFactory2,
  Inject,
  Optional,
} from "@angular/core";
import { ComponentLoader, ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OffcanvasBackdropComponent } from "./offcanvas-backdrop";

@Injectable({providedIn: 'root'})
export class BackdropService {
  protected backdropRef?: ComponentRef<OffcanvasBackdropComponent>;
  private _backdropLoader?: ComponentLoader<OffcanvasBackdropComponent>;

  constructor(
    private clf: ComponentLoaderFactory,
  ) {
    this._backdropLoader = this.clf.createLoader<OffcanvasBackdropComponent>();
  }

  _showBackdrop(): void {
    if (this._backdropLoader) {
      this._backdropLoader
        .attach(OffcanvasBackdropComponent)
        .to('body')
        .show({ isAnimated: true });
      this.backdropRef = this._backdropLoader._componentRef;
    }
  }

  _hideBackdrop(): void {
    if (!this.backdropRef) {
      return;
    }
    this.backdropRef.instance.isShown = false;
    const duration = 100;
    setTimeout(() => this.removeBackdrop(), duration);

    if (this._backdropLoader) {
      this._backdropLoader
        .attach(OffcanvasBackdropComponent)
        .to('body')
        .show({ isAnimated: true });
      this.backdropRef = this._backdropLoader._componentRef;
    }
  }

  removeBackdrop(): void {
    this._backdropLoader?.hide();
    this.backdropRef = void 0;
  }
}
