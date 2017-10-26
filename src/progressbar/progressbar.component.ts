import { Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { isBs3 } from '../utils';

@Component({
  selector: 'progressbar',
  templateUrl: './progressbar.component.html',
  styles: [
    `
    :host {
      width: 100%;
    }
  `
  ]
})
export class ProgressbarComponent {
  /** if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) */
  @Input() animate: boolean;
  /** maximum total value of progress element */
  @Input() max: number;
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

  constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
}
