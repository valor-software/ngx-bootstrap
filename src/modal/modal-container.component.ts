import { Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, Renderer } from '@angular/core';
import { ClassName, ModalOptions } from './modal-options.class';
import { BsModalService } from './bs-modal.service';

const TRANSITION_DURATION = 300;

@Component({
  selector: 'modal-container',
  template: `<ng-content></ng-content>`,
  // tslint:disable-next-line
  host: {
    class: 'modal fade',
    role: 'dialog',
    style: 'display:block;'
  }
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  public config: ModalOptions;
  protected _element: ElementRef;
  @HostBinding('class.in') public isShown: boolean = false;
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (!this.checkCloseAttr(event.target) && (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this._element.nativeElement)) {
      return;
    }

    this.hide();
  }
  @HostListener('window:keydown.esc')
  public onEsc(): void {
    if (this.config.keyboard) {
      this.hide();
    }
  }

  public constructor(options: ModalOptions, _element: ElementRef, private bsModalService: BsModalService, private _renderer: Renderer) {
    this._element = _element;
    this.config = Object.assign({}, options);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isShown = true;
    }, 0);
    if (document && document.body) {
      this._renderer.setElementClass(document.body, ClassName.OPEN, true);
    }
  }

  ngOnDestroy(): void {
    if (document && document.body) {
      this._renderer.setElementClass(document.body, ClassName.OPEN, false);
    }
  }

  hide(): void {
    this.isShown = false;
    setTimeout(() => {
      this.bsModalService.hide();
    }, TRANSITION_DURATION);
  }
  private checkCloseAttr(node: any): boolean {
    if (node.hasAttribute('data-bsmodal-close') && node.getAttribute('data-bsmodal-close') === 'true') {
      return true;
    } else {
      return node.parentNode && node.parentNode.tagName !== 'BODY' ? this.checkCloseAttr(node.parentNode) : false;
    }
  }
}
