import { Component, ElementRef, OnInit, Renderer2, HostListener, HostBinding } from "@angular/core";
import { Utils } from "ngx-bootstrap/utils";
import { Subject } from "rxjs";

const CLASS_NAME = {
  BACKDROP: 'modal-backdrop',
  OFFCANVAS: 'offcanvas-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  SHOW: 'show'
};

/** This component will be added as background layout for modals if enabled */
@Component({
  selector: 'bs-modal-backdrop',
  template: ' '
})
export class BackdropComponent implements OnInit {
  public backdropIsClicked = new Subject<void>();
  @HostBinding('class') className = CLASS_NAME.BACKDROP;

  get isAnimated(): boolean {
    return this._isAnimated;
  }

  set isAnimated(value: boolean) {
    this._isAnimated = value;
  }

  get isShown(): boolean {
    return this._isShown;
  }

  set isShown(value: boolean) {
    this._isShown = value;
    if (value) {
      this.renderer.addClass(
        this.element.nativeElement,
        `${CLASS_NAME.SHOW}`
      );
    } else {
      this.renderer.removeClass(
        this.element.nativeElement,
        `${CLASS_NAME.SHOW}`
      );
    }
  }

  element: ElementRef;
  renderer: Renderer2;

  protected _isAnimated = false;
  protected _isShown = false;

  @HostListener('click')
  onClickStop(event: Event): void {
    console.log('backdrop clicked', event);
    this.backdropIsClicked.next();
  }

  constructor(element: ElementRef, renderer: Renderer2) {
    this.element = element;
    this.renderer = renderer;
  }

  ngOnInit(): void {
    if (this.isAnimated) {
      this.renderer.addClass(
        this.element.nativeElement,
        `${CLASS_NAME.FADE}`
      );
      Utils.reflow(this.element.nativeElement);
    }
    this.isShown = true;
  }
}
