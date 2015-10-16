import {
  Type,
  Component, View, Directive,
  OnInit, OnDestroy, EventEmitter,
  ElementRef, ViewContainerRef,
  NgClass, NgStyle, Host,
  ViewEncapsulation,
  CORE_DIRECTIVES
} from 'angular2/angular2';

const progressConfig = {
  animate: true,
  max: 100
};

// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
@Directive({
  selector: 'bs-progress, [progress]',
  properties: ['animate', 'max'],
  host: {
    'class': 'progress',
    '[attr.max]': 'max'
  }
})
// @View({
//  template: `<div class="progress"><ng-content></ng-content></div>`,
//  encapsulation: ViewEncapsulation.None
// })
export class Progress implements OnInit {
  private _max:number;
  public animate:boolean;
  public bars:Array<any> = [];

  constructor() {
  }

  onInit() {
    this.animate = this.animate !== false;
    this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
  }

  public get max():number {
    return this._max;
  }

  public set max(v:number) {
    this._max = v;
    this.bars.forEach((bar:Bar) => {
      bar.recalculatePercentage();
    });
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
  properties: ['type', 'value']
})
@View({
  template: `
  <div class="progress-bar"
    style="min-width: 0;"
    role="progressbar"
    [ng-class]="type && 'progress-bar-' + type"
    [ng-style]="{width: (percent < 100 ? percent : 100) + '%', transition: transition}"
    aria-valuemin="0"
    [attr.aria-valuenow]="value"
    [attr.aria-valuetext]="percent.toFixed(0) + '%'"
    [attr.aria-valuemax]="max"
    ><ng-content></ng-content></div>
`,
  directives: [NgStyle, NgClass],
  encapsulation: ViewEncapsulation.None
})
export class Bar implements OnInit, OnDestroy {
  public type:string;
  public percent:number = 0;
  public transition:string;

  private _value:number;

  constructor(@Host() public progress:Progress) {
  }

  onInit() {
    this.progress.addBar(this);
  }

  onDestroy() {
    this.progress.removeBar(this);
  }

  public get value():number {
    return this._value;
  }

  public set value(v:number) {
    if (!v && v !== 0) {
      return;
    }
    this._value = v;
    this.recalculatePercentage();
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
  properties: ['animate', 'max', 'type', 'value']
})
@View({
  template: `
    <div progress [animate]="animate" [max]="max">
      <bar [type]="type" [value]="value">
          <ng-content></ng-content>
      </bar>
    </div>
  `,
  directives: [Progress, Bar]
})
export class Progressbar {
  private animate:boolean;
  private max:number;
  private type:string;
  private value:number;
}

export const progressbar:Array<any> = [Progress, Bar, Progressbar];
