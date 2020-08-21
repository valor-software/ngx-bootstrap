import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2, SimpleChanges
} from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { ProgressbarType } from './progressbar-type.interface';
import { isBs3 } from 'ngx-bootstrap/utils';

@Component({
  selector: 'progressbar',
  template: `
  <div [class.progress]="!isArray">
  <ng-container *ngIf="!isArray">
    <ng-content></ng-content>
  </ng-container>
  </div>
  `,
  styles: [
    `
    :host {
      width: 100%;
      display: flex;
    }
  `
  ],
  host: {
    'aria-valuemin': '0',
    '[attr.aria-valuenow]': 'numberValue',
    '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
    '[attr.aria-valuemax]': 'max',
    '[style.height.%]': 'isBs3 ? "" : "100"'
  }
})
export class ProgressbarComponent implements OnInit, OnChanges {
  _striped: boolean;
  _animate: boolean;
  isArray: boolean;
  _type: ProgressbarType;
  /* tslint:disable-next-line:no-any */
  _value: number | any[];

  /* tslint:disable-next-line:no-any */
  arrayValue: any = [];
  numberValue: number;
  percent = 0;

  @HostBinding('class.progress') addClass = true;

  /** set it to  `true` if you want to use stacked bars in one progressbar */
  @Input() isStacked: boolean;

  /** if `true` changing value of progress bar will be animated */
  @Input()
  set animate(value: boolean) {
    this._animate = value;
  }
  /** If `true`, striped classes are applied */
  @Input()
  set striped(value: boolean) {
    this._striped = value;
  }

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input()
  set type(v: ProgressbarType) {
    this._type = v;
  }

  /** current value of progress bar. Could be a number or array of objects
   * like {"value":15,"type":"info","label":"15 %"}
   */
  @Input()
  /* tslint:disable-next-line:no-any */
  set value(value: number | any[]) {
    this.isArray = Array.isArray(value);
    this._value = value;

    if (!this.isArray) {
      this.numberValue = Number(value);
      this.recalculatePercentage();
    } else {
      this.arrayValue = value;
      this.arrayValue.forEach((a: any) => {
        this.numberValue = Number(a.value);
        this.recalculatePercentage();
      });
    }
  }

  get isBs3(): boolean {
    return isBs3();
  }

  /** maximum total value of progress element */
  @HostBinding('attr.max')
  @Input()
  get max(): number {
    return this._max;
  }

  set max(v: number) {
    this._max = v;
    this.recalculatePercentage();
  }

  @HostBinding('style.display')
  get setDisplayForStackedItems() {
    if (this.isStacked) {
      return 'contents';
    } else {
      return 'block';
    }
  }

  protected _max = 100;
  private _prevType: string;

  constructor(config: ProgressbarConfig,
              private el: ElementRef,
              private renderer: Renderer2) {
    Object.assign(this, config);
  }

  recalculatePercentage(): void {
    this.percent = +(this.numberValue / this._max * 100).toFixed(2);
  }

  ngOnInit(): void {
    this.applyTypeClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this._type = changes.type.currentValue;
      this.applyTypeClasses();
    }

    if (changes.value) {
      this.numberValue = changes.value.currentValue;
      this.renderer.addClass(this.el.nativeElement.firstChild, 'progress-bar');
      this.renderer.setStyle(this.el.nativeElement.firstChild, 'width', `${this.percent}%`);
    }
  }

  private applyTypeClasses(): void {
    this.renderer.addClass(this.el.nativeElement.firstChild, 'progress-bar');
    this.renderer.setStyle(this.el.nativeElement.firstChild, 'width', `${this.percent}%`);

    if (this._prevType) {
      const barTypeClass = `progress-bar-${this._prevType}`;
      const bgClass = `bg-${this._prevType}`;
      this.renderer.removeClass(this.el.nativeElement.firstChild, barTypeClass);
      this.renderer.removeClass(this.el.nativeElement.firstChild, bgClass);
      this._prevType = null;
    }

    if (this._type) {
      const barTypeClass = `progress-bar-${this._type}`;
      const bgClass = `bg-${this._type}`;
      this.renderer.addClass(this.el.nativeElement.firstChild, barTypeClass);
      this.renderer.addClass(this.el.nativeElement.firstChild, bgClass);
      this._prevType = this._type;
    }

    if (!this.isBs3 && this._animate) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'progress-bar-animated');
    }

    if (this.isBs3 && this._animate) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'active');
    }

    if (this._striped) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'progress-bar-striped');
    }
  }
}
