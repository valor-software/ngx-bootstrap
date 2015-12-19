import {
  Component, Directive,
  OnInit, OnDestroy,
  Host, Input, HostBinding
} from 'angular2/core';
import { NgClass, NgStyle } from 'angular2/common';

const progressConfig = {
  animate: true,
  max: 100
};

// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
@Directive({ selector: 'bs-progress, [progress]' })
export class Progress implements OnInit {
  @Input() public animate:boolean;

  @HostBinding('attr.max')
  @Input() public get max():number {
    return this._max;
  }

  @HostBinding('class') private addClass = 'progress';

  public set max(v:number) {
    this._max = v;
    this.bars.forEach((bar:Bar) => {
      bar.recalculatePercentage();
    });
  }

  public bars:Array<any> = [];

  private _max:number;

  constructor() {
  }

  ngOnInit() {
    this.animate = this.animate !== false;
    this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
  }


  public addBar(bar:Bar) {
    if (!this.animate) {
      bar.transition = 'none';
    }
    this.bars.push(bar);
  }

  public removeBar(bar:Bar) {
    this.bars.splice(this.bars.indexOf(bar), 1);
  }
}

// todo: number pipe
// todo: use query from progress?
@Component({
  selector: 'bar, [bar]',
  directives: [NgClass, NgStyle],
  template: `
  <div class="progress-bar"
    style="min-width: 0;"
    role="progressbar"
    [ngClass]="type && 'progress-bar-' + type"
    [ngStyle]="{width: (percent < 100 ? percent : 100) + '%', transition: transition}"
    aria-valuemin="0"
    [attr.aria-valuenow]="value"
    [attr.aria-valuetext]="percent.toFixed(0) + '%'"
    [attr.aria-valuemax]="max"
    ><ng-content></ng-content></div>
`
})
export class Bar implements OnInit, OnDestroy {
  @Input() public type:string;
  @Input() public get value():number {
    return this._value;
  }

  public set value(v:number) {
    if (!v && v !== 0) {
      return;
    }
    this._value = v;
    this.recalculatePercentage();
  }

  public percent:number = 0;
  public transition:string;

  private _value:number;

  constructor(@Host() public progress:Progress) {
  }

  ngOnInit() {
    this.progress.addBar(this);
  }

  ngOnDestroy() {
    this.progress.removeBar(this);
  }

  public recalculatePercentage() {
    this.percent = +(100 * this.value / this.progress.max).toFixed(2);

    let totalPercentage = this.progress.bars.reduce(function (total, bar) {
      return total + bar.percent;
    }, 0);

    if (totalPercentage > 100) {
      this.percent -= totalPercentage - 100;
    }
  }
}

@Component({
  selector: 'progressbar, [progressbar]',
  directives: [Progress, Bar],
  template: `
    <div progress [animate]="animate" [max]="max">
      <bar [type]="type" [value]="value">
          <ng-content></ng-content>
      </bar>
    </div>
  `
})
export class Progressbar {
  @Input() private animate:boolean;
  @Input() private max:number;
  @Input() private type:string;
  @Input() private value:number;
}

export const PROGRESSBAR_DIRECTIVES:Array<any> = [Progress, Bar, Progressbar];
/**
 * @deprecated use PROGRESSBAR_DIRECTIVES instead
 * @type {Progress|Bar|Progressbar[]}
 */
export const progressbar:Array<any> = [Progress, Bar, Progressbar];
