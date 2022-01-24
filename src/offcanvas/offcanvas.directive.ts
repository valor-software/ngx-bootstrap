import {
  Directive, HostListener,
  Renderer2, ElementRef, Input
} from "@angular/core";
import { BackdropService } from "./backdrop.service";
import { OffcanvasConfigType } from "./offcanvas.config";

@Directive({selector: '[offcanvas]', exportAs:'offcanvas'})
export class OffcanvasDirective {
  isOpen = false;
  @Input() set config(value: OffcanvasConfigType) {
    this._config = Object.assign({}, value);
  };

  _config?: OffcanvasConfigType;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private backdropService: BackdropService
  ) {
  }

  @HostListener('transitionend')
  transitionend() {
    if (!this.isOpen) {
      this.el.nativeElement.style.visibility = 'hidden';
    }
  }

  toggle(): void {
    if (this.isOpen) {
      return this.hide();
    }

    this.show();
  }

  show() {
    this.isOpen = true;
    if (this._config?.backdrop) {
      this.backdropService._showBackdrop();
    }

    this.el.nativeElement.style.visibility = 'visible';
    this.renderer.addClass(this.el.nativeElement, 'show');
  }

  hide() {
    this.isOpen = false;
    if (this._config?.backdrop) {
      this.backdropService._hideBackdrop();
    }

    this.renderer.removeClass(this.el.nativeElement, 'show');
  }
}
