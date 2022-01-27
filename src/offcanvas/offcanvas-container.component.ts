import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { OffcanvasDirective } from "./offcanvas.directive";
import { OffcanvasConfig, OffcanvasConfigType } from "./offcanvas.config";

let id = 0;
const POSITION_CLASSNAME = {
  start: 'offcanvas-start',
  end: 'offcanvas-end',
  top: 'offcanvas-top',
  bottom: 'offcanvas-bottom'
};

@Component({
  selector: 'offcanvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div
        [className]="positionClass + ' offcanvas'"
        [attr.data-bs-scroll]="_config?.backdropScrolling"
        offcanvas
        [config]="_config"
        (isOpened)="isOpened.emit($event)"
        [attr.data-bs-backdrop]="_config?.backdrop"
        tabindex="-1"
        [id]="idNum"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" [id]="idNum">{{_config?.headerTitle}}</h5>
          <button (click)="hide()" type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ng-content></ng-content>
        </div>
      </div>
  `
})
export class OffcanvasContainerComponent {
  _config?: typeof OffcanvasConfig;
  id = id++;
  @ViewChild(OffcanvasDirective, {static: false}) public directive?: OffcanvasDirective;

  @Input() set config(value: OffcanvasConfigType | Partial<OffcanvasConfigType> ) {
    if (!value) {
      return;
    }

    this._config = this.assignConfig(value);
  }

  @Output() isOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  get idNum(): number {
    return this.id || 0;
  }

  get positionClass(): string {
    if (!this.directive?._config?.placement) {
      return POSITION_CLASSNAME.start;
    }

    return POSITION_CLASSNAME[this.directive._config?.placement];
  }

  hide() {
    this.directive?.hide();
    this.isOpened.emit(false);
  }

  show() {
    this.directive?.show();
    this.isOpened.emit(true);
  }

  assignConfig(value: OffcanvasConfigType | Partial<OffcanvasConfigType>): OffcanvasConfigType {
    return Object.assign({}, OffcanvasConfig, value);
  }
}
