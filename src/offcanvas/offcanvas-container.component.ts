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
import { getBsVer, IBsVersion } from "ngx-bootstrap/utils";

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
        offcanvas
        [config]="_config"
        (isOpened)="isOpened.emit($event)"
        tabindex="-1"
        [id]="id"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" [id]="idLabel">{{_config?.headerTitle}}</h5>
          <button *ngIf="bsVersion.isBs5" (click)="hide()" type="button" class="btn-close text-reset" aria-label="Close"></button>
          <button *ngIf="bsVersion.isBs4" (click)="hide()" type="button" aria-label="Close" class="btn-close close pull-right"><span aria-hidden="true" class="visually-hidden">×</span></button>
        </div>
        <div class="offcanvas-body">
          <ng-content></ng-content>
        </div>
      </div>
  `
})
export class OffcanvasContainerComponent {
  _config?: OffcanvasConfigType;
  id = `offcanvas-${id++}`;
  idLabel = `offcanvasLabel-${id++}`;
  @ViewChild(OffcanvasDirective, {static: false}) public offcanvasDirective?: OffcanvasDirective;
  /** allows to set offcanvas configuration via element property */
  @Input() set config(value: OffcanvasConfigType | Partial<OffcanvasConfigType> ) {
    if (!value) {
      return;
    }

    this.setConfig(value);
  }
  /** Emits when the opened state changes */
  @Output() isOpened: EventEmitter<boolean> = new EventEmitter<boolean>();

  get positionClass(): string {
    if (!this.offcanvasDirective?._config?.placement) {
      return POSITION_CLASSNAME.start;
    }

    return POSITION_CLASSNAME[this.offcanvasDirective._config?.placement];
  }

  get bsVersion(): IBsVersion {
    return getBsVer();
  }

  constructor(
    private offcanvasConfig: OffcanvasConfig
  ) {
    if (!this._config) {
      this._config = Object.assign({}, this.offcanvasConfig);
    }
  }

  hide() {
    this.offcanvasDirective?.hide();
    this.isOpened.emit(false);
  }

  show() {
    this.offcanvasDirective?.show();
    this.isOpened.emit(true);
  }

  setConfig(value: Partial<OffcanvasConfigType>) {
    this._config = Object.assign({}, this.offcanvasConfig, value);
  }
}
