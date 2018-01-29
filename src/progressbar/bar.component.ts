import {
  Component,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { ProgressbarComponent } from './progressbar.component';
import { isBs3 } from '../utils/theme-provider';

// todo: number pipe
// todo: use query from progress?
@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  host: {
    role: 'progressbar',
    'aria-valuemin': '0',
    '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
    '[class.progress-bar-animated]': '!isBs3 && animate',
    '[class.progress-bar-striped]': 'striped',
    '[class.active]': 'isBs3 && animate',
    '[attr.aria-valuenow]': 'value',
    '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
    '[attr.aria-valuemax]': 'max',
    '[style.height.%]': '"100"'
  }
})
export class BarComponent implements OnInit, OnDestroy {
  max: number;

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() type: string;

  /** current value of progress bar */
  @Input()
  get value(): number {
    return this._value;
  }

  set value(v: number) {
    if (!v && v !== 0) {
      return;
    }
    this._value = v;
    this.recalculatePercentage();
  }

  @HostBinding('style.width.%')
  get setBarWidth() {
    this.recalculatePercentage();

    return this.percent;
  }

  get isBs3(): boolean {
    return isBs3();
  }

  striped: boolean;
  animate: boolean;
  percent = 0;
  progress: ProgressbarComponent;

  protected _value: number;

  constructor(@Host() progress: ProgressbarComponent) {
    this.progress = progress;
  }

  ngOnInit(): void {
    this.progress.addBar(this);
  }

  ngOnDestroy(): void {
    this.progress.removeBar(this);
  }

  recalculatePercentage(): void {
    this.percent = +(this.value / this.progress.max * 100).toFixed(2);

    const totalPercentage = this.progress.bars
      .reduce(function (total: number, bar: BarComponent): number {
        return total + bar.percent;
      }, 0);

    if (totalPercentage > 100) {
      this.percent -= totalPercentage - 100;
    }
  }
}
