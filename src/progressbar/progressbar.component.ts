import { Component, HostBinding, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { BarValue, ProgressbarType } from './progressbar-type.interface';
import { isBs3 } from 'ngx-bootstrap/utils';
import { BarComponent } from './bar.component';

@Component({
  selector: 'progressbar',
  templateUrl: './progressbar.component.html',
  styles: [
    `
    :host {
      width: 100%;
      display: flex;
    }
  `
  ]
})
export class ProgressbarComponent {
  /** if `true` changing value of progress bar will be animated */
  @Input()
  set animate(value: boolean) {
    this._animate = value;
    this.bars.forEach((b: BarComponent) => {
      b.animate = value;
    });
  }
  /** If `true`, striped classes are applied */
  @Input()
  set striped(value: boolean) {
    this._striped = value;
    this.bars.forEach((b: BarComponent) => {
      b.striped = value;
    });
  }

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() type?: ProgressbarType;
  /** current value of progress bar. Could be a number or array of objects
   * like {"value":15,"type":"info","label":"15 %"}
   */
  @Input()
  set value(value: number | BarValue[]) {
    this.isStacked = Array.isArray(value);
    if (typeof value === 'number') {
      this._value = value;
      this._values = void 0;
    } else {
      this._value = void 0;
      this._values = value;
    }
  }
  isStacked = false;
  _striped?: boolean;
  _animate = false;
  _max = 100;

  _value?: number;
  _values?: BarValue[];

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
    this.bars.forEach((bar: BarComponent) => {
      bar.recalculatePercentage();
    });
  }

  @HostBinding('class.progress') addClass = true;

  bars: BarComponent[] = [];
  constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
  addBar(bar: BarComponent): void {
    bar.animate = this._animate;
    bar.striped = this._striped;

    this.bars.push(bar);
  }

  removeBar(bar: BarComponent): void {
    this.bars.splice(this.bars.indexOf(bar), 1);
  }
}
