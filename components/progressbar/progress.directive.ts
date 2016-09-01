import { Directive, HostBinding, Input, OnInit } from '@angular/core';

import { BarComponent } from './bar.component';

const progressConfig = {
  animate: true,
  max: 100
};

// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
/* tslint:disable */
@Directive({selector: 'bs-progress, [progress]'})
/* tslint:enable */
export class ProgressDirective implements OnInit {
  @Input() public animate:boolean;

  @HostBinding('attr.max')
  @Input()
  public get max():number {
    return this._max;
  }

  @HostBinding('class.progress') public addClass:boolean = true;

  public set max(v:number) {
    this._max = v;
    this.bars.forEach((bar:BarComponent) => {
      bar.recalculatePercentage();
    });
  }

  public bars:Array<any> = [];

  private _max:number;

  public ngOnInit():void {
    this.animate = this.animate !== false;
    this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
  }

  public addBar(bar:BarComponent):void {
    if (!this.animate) {
      bar.transition = 'none';
    }
    this.bars.push(bar);
  }

  public removeBar(bar:BarComponent):void {
    this.bars.splice(this.bars.indexOf(bar), 1);
  }
}
