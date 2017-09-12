import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer
} from '@angular/core';
import {
  ClassName,
  DISMISS_REASONS,
  ModalOptions,
  TransitionDurations
} from './modal-options.class';
import { BsModalService } from './bs-modal.service';
import { isBs3 } from '../utils/theme-provider';

@Component({
  selector: 'modal-container',
  template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')" role="document">
      <div class="modal-content"><ng-content></ng-content></div>
    </div>
  `,
  host: {
    class: 'modal',
    role: 'dialog',
    tabindex: '-1'
  }
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  config: ModalOptions;
  isShown = false;
  level: number;
  isAnimated: boolean;
  protected _element: ElementRef;
  private isModalHiding = false;
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    if (
      this.config.ignoreBackdropClick ||
      this.config.backdrop === 'static' ||
      event.target !== this._element.nativeElement
    ) {
      return;
    }
    this.bsModalService.setDismissReason(DISMISS_REASONS.BACKRDOP);
    this.hide();
  }
  @HostListener('window:keydown.esc')
  onEsc(): void {
    if (
      this.config.keyboard &&
      this.level === this.bsModalService.getModalsCount()
    ) {
      this.bsModalService.setDismissReason(DISMISS_REASONS.ESC);
      this.hide();
    }
  }


  constructor(
    options: ModalOptions,
    _element: ElementRef,
    private bsModalService: BsModalService,
    private _renderer: Renderer
  ) {
    this._element = _element;
    this.config = Object.assign({}, options);
  }

  ngOnInit(): void {
    if (this.isAnimated) {
      this._renderer.setElementClass(
        this._element.nativeElement,
        ClassName.FADE,
        true
      );
    }
    this._renderer.setElementStyle(
      this._element.nativeElement,
      'display',
      'block'
    );
    setTimeout(() => {
      this.isShown = true;
      this._renderer.setElementClass(
        this._element.nativeElement,
        isBs3() ? ClassName.IN : ClassName.SHOW,
        true
      );
    }, this.isAnimated ? TransitionDurations.BACKDROP : 0);
    if (document && document.body) {
      if (this.bsModalService.getModalsCount() === 1) {
        this.bsModalService.checkScrollbar();
        this.bsModalService.setScrollbar();
      }
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
    this._renderer.setElementClass(
      this._element.nativeElement,
      isBs3() ? ClassName.IN : ClassName.SHOW,
      false
    );
    setTimeout(() => {
      this.isShown = false;
      if (
        document &&
        document.body &&
        this.bsModalService.getModalsCount() === 1
      ) {
        this._renderer.setElementClass(document.body, ClassName.OPEN, false);
      }
      this.bsModalService.hide(this.level);
      this.isModalHiding = false;
    }, this.isAnimated ? TransitionDurations.MODAL : 0);
  }
}
