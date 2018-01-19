import {
  Component,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { ProgressDirective } from './progress.directive';
import { isBs3 } from '../utils/theme-provider';

// todo: number pipe
// todo: use query from progress?
@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  host: {
    '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
    'aria-valuemin': '0',
    '[attr.aria-valuenow]': 'value',
    '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
    '[attr.aria-valuemax]': 'max',
    '[attr.role]': '"progressbar"'
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

  @HostBinding('style.transition') transition: string;
  @HostBinding('class.progress-bar-striped') striped: boolean;
  percent = 0;
  progress: ProgressDirective;

  protected _value: number;

  constructor(@Host() progress: ProgressDirective) {
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
