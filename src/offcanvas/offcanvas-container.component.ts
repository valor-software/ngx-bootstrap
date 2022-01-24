import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { OffcanvasDirective } from "./offcanvas.directive";
import { getBsVer, IBsVersion } from 'ngx-bootstrap/utils';
import { OffcanvasConfig, OffcanvasConfigType } from "./offcanvas.config";

const BACKDROP_NODE_NAME = 'OFFCANVAS-BACKDROP';
let id = 0;
const POSITION_CLASSNAME = {
  start: 'offcanvas-start',
  end: 'offcanvas-end',
  top: 'offcanvas-top',
  bottom: 'offcanvas-bottom'
}


@Component({
  selector: 'offcanvas',
  template: `
    <ng-container *ngIf="!bsVer.isBs5">
      <p>Element is available only for bootstrap 5</p>
    </ng-container>

    <ng-container *ngIf="bsVer.isBs5">
      <div
        [className]="positionClass + ' offcanvas'"
        offcanvas
        [config]="_config"
        data-bs-scroll="false"
        [attr.data-bs-backdrop]="_config.backdrop"
        tabindex="-1"
        [id]="id"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" [id]="id">{{_config.headerTitle}}</h5>
          <button (click)="hide()" type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-container>
  `
})
export class OffcanvasContainerComponent {
  @ViewChild(OffcanvasDirective, {static: false}) private directive?: OffcanvasDirective;

  @Input() set config(value: OffcanvasConfigType | Partial<OffcanvasConfigType> ) {
    this._config = this.assignConfig(value);
  }

  @Output() isOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('body:click', ['$event'])
  onClickStop(event: Event): void {
    const nodeName = (event.target as HTMLElement).nodeName;

    if (this._isOpen && nodeName === BACKDROP_NODE_NAME) {
      this.hide();
    }

  }
  _config?: typeof OffcanvasConfig;
  _isOpen?: boolean;

  get bsVer(): IBsVersion {
    return getBsVer();
  }

  get id(): number {
    return id;
  }

  get positionClass(): string {
    if (!this._config?.placement) {
      return POSITION_CLASSNAME.start;
    }
    return POSITION_CLASSNAME[this._config?.placement];
  }

  constructor(
  ) {
    if (!this._config) {
      this._config = Object.assign(OffcanvasConfig);
    }
    id++;
    console.log(this._config);
  }

  hide() {
    this._isOpen = false;
    this.directive?.hide();
    this.isOpen.emit(false);
  }

  show() {
    this._isOpen = true;
    this.directive?.show();
    this.isOpen.emit(true);
  }

  assignConfig(value: OffcanvasConfigType | Partial<OffcanvasConfigType>): OffcanvasConfigType {
    return Object.assign(OffcanvasConfig, value);
  }
}
