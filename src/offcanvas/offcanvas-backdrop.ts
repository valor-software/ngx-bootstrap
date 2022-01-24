import { Component, HostListener, OnInit, Renderer2, ElementRef } from "@angular/core";
import { Utils } from 'ngx-bootstrap/utils';

const CLASS_NAME = {
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  SHOW: 'show'
};

/** This component will be added as background layout for modals if enabled */
@Component({
  selector: 'offcanvas-backdrop',
  template: ' ',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: CLASS_NAME.BACKDROP,
  },
  styles: [`
      :host {
        z-index: 1000;
      }
  `]
})
export class OffcanvasBackdropComponent implements OnInit {

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
  protected _isShown = false;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.renderer.addClass(
      this.element.nativeElement,
      `fade`
    );
    Utils.reflow(this.element.nativeElement);
    this.isShown = true;
  }
}
