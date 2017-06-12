import { Component, ElementRef, HostBinding, HostListener, OnInit, Renderer } from '@angular/core';
import { ModalOptions } from './modal-options.class';
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
export class ModalContainerComponent implements OnInit {
  public config: ModalOptions;
  protected _element: ElementRef;

  @HostBinding('class.in') public isShown: boolean = false;
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this._element.nativeElement) {
      return;
    }

    this.hide();
  }
  public constructor(options: ModalOptions, _element: ElementRef, private bsModalService: BsModalService, private renderer: Renderer) {
    this._element = _element;
    this.config = Object.assign({}, options);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isShown = true;
    }, 50);
    const closeButtons = this._element.nativeElement.querySelectorAll('[data-bsmodal-close="true"]');
    closeButtons.forEach((btn: any) => {
      btn.addEventListener('click', () => {this.hide();});
    });
  }

  hide(): void {
    this.isShown = false;
    setTimeout(() => {
      this.bsModalService.hide();
    }, TRANSITION_DURATION);
  }
}
