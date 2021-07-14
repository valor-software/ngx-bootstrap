import {
  Component,
  HostBinding,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit, ContentChildren
} from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import { BarValue, ProgressbarType } from './progressbar-type.interface';
import { isBs3 } from 'ngx-bootstrap/utils';
import { Subscription } from 'rxjs';
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
export class ProgressbarComponent implements AfterViewInit {
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
  }

  @HostBinding('class.progress') addClass = true;

  bars: Set<BarComponent> = new Set();
  @ViewChildren('barElement')
  public barElements?: QueryList<ElementRef>;
  constructor(
    config: ProgressbarConfig
    ) {
    Object.assign(this, config);
  }

  addBar(bar: BarComponent): void {
    this.bars.add(bar);
  }

  removeBar(bar: BarComponent): void {
    if (this.bars?.has(bar)) {
      this.bars.delete(bar);
    }
  }

  ngAfterViewInit(): void {
    this.barElements?.changes.subscribe(res => {
      this.bars = res;
    });
  }
}
