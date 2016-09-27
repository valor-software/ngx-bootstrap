import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';

import { ProgressDirective } from './progress.directive';

// todo: number pipe
// todo: use query from progress?
@Component({
  selector: 'bar',
  template: `
  <div class="progress-bar"
    style="min-width: 0;"
    role="progressbar"
    [ngClass]="type && 'progress-bar-' + type"
    [ngStyle]="{width: (percent < 100 ? percent : 100) + '%', transition: transition}"
    aria-valuemin="0"
    [attr.aria-valuenow]="value"
    [attr.aria-valuetext]="percent.toFixed(0) + '%'"
    [attr.aria-valuemax]="max"><ng-content></ng-content></div>
`
})
export class BarComponent implements OnInit, OnDestroy {
  @Input() public type:string;
  public max:number;

  @Input()
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

  public percent:number = 0;
  public transition:string;
  public progress:ProgressDirective;

  private _value:number;

  public constructor(@Host() progress:ProgressDirective) {
    this.progress = progress;
  }

  public ngOnInit():void {
    this.progress.addBar(this);
  }

  public ngOnDestroy():void {
    this.progress.removeBar(this);
  }

  public recalculatePercentage():void {
    this.percent = +(100 * this.value / this.progress.max).toFixed(2);

    let totalPercentage = this.progress.bars.reduce(function (total:number, bar:BarComponent):number {
      return total + bar.percent;
    }, 0);

    if (totalPercentage > 100) {
      this.percent -= totalPercentage - 100;
    }
  }
}
