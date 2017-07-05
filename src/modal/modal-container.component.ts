import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer } from '@angular/core';
import { ClassName, ModalOptions, TransitionDurations } from './modal-options.class';
import { BsModalService } from './bs-modal.service';
import { isBs3 } from '../utils/ng2-bootstrap-config';


@Component({
  selector: 'modal-container',
  template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')" role="document">
      <div class="modal-content"><ng-content></ng-content></div>
    </div>
  `,
  // tslint:disable-next-line
  host: {
    class: 'modal fade',
    role: 'dialog',
    style: 'display:block;',
    tabindex: '-1'
  }
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  public config: ModalOptions;
  protected _element: ElementRef;
  public isShown: boolean = false;
  public level: number;
  private isModalHiding: boolean = false;
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (this.config.ignoreBackdropClick || this.config.backdrop === 'static' || event.target !== this._element.nativeElement) {
      return;
    }
    this.hide();
  }
  @HostListener('window:keydown.esc')
  public onEsc(): void {
    if (this.config.keyboard && this.level === this.bsModalService.getModalsCount()) {
      this.hide();
    }
  }

  // @HostListener('window:focusin', ['$event'])
  // public enforceFocus($event:any): void {
  //   if (!(this._element.nativeElement === $event.target || this._element.nativeElement.contains($event.target))) {
  //     this._element.nativeElement.focus();
  //   }
  // }
  // @HostListener('focusout', ['$event'])
  // public preventFocusOut($event:any): void {
  //   if (!$event.relatedTarget) {
  //     this._element.nativeElement.focus();
  //   }
  // }

  public constructor(options: ModalOptions, _element: ElementRef, private bsModalService: BsModalService, private _renderer: Renderer) {
    this._element = _element;
    this.config = Object.assign({}, options);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isShown = true;
      this._renderer.setElementClass(this._element.nativeElement, isBs3() ? ClassName.IN : ClassName.SHOW, true);
    }, TransitionDurations.BACKDROP);
    if (document && document.body) {
      this._renderer.setElementClass(document.body, ClassName.OPEN, true);
    }
  }

  ngOnDestroy(): void {
    if (this.isShown) {
      this.hide();
    }
  }

  hide(): void {
    if (this.isModalHiding || !this.isShown) {
      return;
    }
    this.isModalHiding = true;
    this._renderer.setElementClass(this._element.nativeElement, isBs3() ? ClassName.IN : ClassName.SHOW, false);
    setTimeout(() => {
      this.isShown = false;
      if (document && document.body && this.bsModalService.getModalsCount() === 1) {
        this._renderer.setElementClass(document.body, ClassName.OPEN, false);
      }
      this.bsModalService.hide(this.level);
      this.isModalHiding = false;
    }, TransitionDurations.MODAL);
  }
}
