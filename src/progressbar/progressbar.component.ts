import { Component, HostBinding, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { isBs3 } from '../utils/index';
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
  /** if `true` changing value of progress bar will be animated*/
  @Input() animate: boolean;
  /** If `true`, striped classes are applied */
  @Input() striped: boolean;
  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() type: string;
  /** current value of progress bar. Could be a number or array of objects
   * like {"value":15,"type":"info","label":"15 %"}
   */
  @Input()
  set value(value: number | any[]) {
    this.isStacked = Array.isArray(value);
    this._value = value;
  }
  isStacked = false;
  _value: number | any[];
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

  bars: any[] = [];

  protected _max = 100;

  constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
  addBar(bar: BarComponent): void {
    bar.animate = this.animate;
    bar.striped = this.striped;

    this.bars.push(bar);
  }

  removeBar(bar: BarComponent): void {
    this.bars.splice(this.bars.indexOf(bar), 1);
  }
}
