import {
  Directive, HostListener,
  Renderer2, ElementRef, Input, EventEmitter, Output, SimpleChanges
} from "@angular/core";
import { BackdropService } from "./backdrop.service";
import { OffcanvasConfig, OffcanvasConfigType } from "./offcanvas.config";

const BACKDROP_NODE_NAME = 'OFFCANVAS-BACKDROP';


@Directive({selector: '[offcanvas]', exportAs:'offcanvas'})
export class OffcanvasDirective {
  isOpen = false;
  delayValue = 300; // it is necessary for showing several elements
  _config?: OffcanvasConfigType;

  @Input() set config(value: OffcanvasConfigType) {
    if (!value) {
      return;
    }

    this._config = Object.assign({}, value);
  };

  @Output() isOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private backdropService: BackdropService
  ) {
    if (!this._config) {
      this.config = Object.assign({}, OffcanvasConfig);
    }
  }

  @HostListener('transitionend')
  transitionend() {
    if (!this.isOpen) {
      this.el.nativeElement.style.visibility = 'hidden';
    }
  }

  @HostListener('body:click', ['$event'])
  onClickStop(event: Event): void {
    const nodeName = (event.target as HTMLElement).nodeName;

    if (this.isOpen && nodeName === BACKDROP_NODE_NAME) {
      this.hide();
    }
  }

  public show() {
    this.isOpen = true;
    if (this._config?.backdrop) {
      this.backdropService._showBackdrop();
    }

    if (!this._config?.backdropScrolling) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }

    setTimeout(() => {
      this.el.nativeElement.style.visibility = 'visible';
      this.renderer.addClass(this.el.nativeElement, 'show');
      this.isOpened.emit(true);
    },this.delayValue);
  }

  hide() {
    this.isOpen = false;
    if (this._config?.backdrop) {
      this.backdropService._hideBackdrop();
    }

    if (!this._config?.backdropScrolling) {
      this.renderer.removeStyle(document.body, 'overflow');
    }

    this.renderer.removeClass(this.el.nativeElement, 'show');
    this.isOpened.emit(false);
  }
}
