import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {
  CLASS_NAME,
  DISMISS_REASONS,
  ModalOptions,
  TRANSITION_DURATIONS
} from './modal-options.class';
import { BsModalService } from './bs-modal.service';
import { isBs3 } from '../utils/theme-provider';

@Component({
  selector: 'modal-container',
  template: `
    <div [class]="'modal-dialog' + (config.class ? ' ' + config.class : '')" role="document">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
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
  private isModalHiding = false;

  constructor(options: ModalOptions,
              protected _element: ElementRef,
              private bsModalService: BsModalService,
              private _renderer: Renderer2) {
    this.config = Object.assign({}, options);
  }

  ngOnInit(): void {
    if (this.isAnimated) {
      this._renderer.addClass(
        this._element.nativeElement,
        CLASS_NAME.FADE
      );
    }
    this._renderer.setStyle(
      this._element.nativeElement,
      'display',
      'block'
    );
    setTimeout(() => {
      this.isShown = true;
      this._renderer.addClass(
        this._element.nativeElement,
        isBs3() ? CLASS_NAME.IN : CLASS_NAME.SHOW
      );
    }, this.isAnimated ? TRANSITION_DURATIONS.BACKDROP : 0);
    if (document && document.body) {
      if (this.bsModalService.getModalsCount() === 1) {
        this.bsModalService.checkScrollbar();
        this.bsModalService.setScrollbar();
      }
      this._renderer.addClass(document.body, CLASS_NAME.OPEN);
    }
  }

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
    this._renderer.removeClass(
      this._element.nativeElement,
      isBs3() ? CLASS_NAME.IN : CLASS_NAME.SHOW
    );
    setTimeout(() => {
      this.isShown = false;
      if (
        document &&
        document.body &&
        this.bsModalService.getModalsCount() === 1
      ) {
        this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
      }
      this.bsModalService.hide(this.level);
      this.isModalHiding = false;
    }, this.isAnimated ? TRANSITION_DURATIONS.MODAL : 0);
  }
}
