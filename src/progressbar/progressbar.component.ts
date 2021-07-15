import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BarValue, ProgressbarType } from './progressbar-type.interface';
import { ProgressbarConfig } from './progressbar.config';

@Component({
  selector: 'progressbar',
  templateUrl: './progressbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[class.progress]': 'true',
    '[attr.max]': 'max'
  },
  styles: [`
    :host {
      width: 100%;
      display: flex;
    } `]
})
export class ProgressbarComponent {
  /** maximum total value of progress element */
  @Input() max = 100;

  /** if `true` changing value of progress bar will be animated */
  @Input() animate = false;

  /** If `true`, striped classes are applied */
  @Input() striped = false;

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
  _value?: number;
  _values?: BarValue[];

  constructor(config: ProgressbarConfig) {
    Object.assign(this, config);
  }
}
