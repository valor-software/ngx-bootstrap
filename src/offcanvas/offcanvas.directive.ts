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

  @Input() offcanvas?: OffcanvasConfigType;


  @Output() isOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  @HostListener('body:click', ['$event'])
  onClickStop(event: Event): void {
    const nodeName = (event.target as HTMLElement).nodeName;

    if (this.isOpen && nodeName === BACKDROP_NODE_NAME) {
      this.hide();
    }
  }

  // toggle(): void {
  //   if (this.isOpen) {
  //     return this.hide();
  //   }
  //
  //   this.show();
  // }

  ngOnChanges({ offcanvas }: SimpleChanges) {
    if (!offcanvas.firstChange) return;
    this._config = Object.assign(OffcanvasConfig, offcanvas);

  }

  public show() {
    this.isOpen = true;
    if (this._config?.backdrop) {
      this.backdropService._showBackdrop();
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

    this.renderer.removeClass(this.el.nativeElement, 'show');
    this.isOpened.emit(false);
  }
}
