import { Directive, HostBinding, Input } from '@angular/core';

import { BarComponent } from './bar.component';

// todo: progress element conflict with bootstrap.css
// todo: need hack: replace host element with div
@Directive({selector: 'bs-progress, [progress]'})
export class ProgressDirective  {
  @Input() public animate:boolean;

  @HostBinding('attr.max')
  @Input()
  public get max():number {
    return this._max;
  }

  public set max(v:number) {
    this._max = v;
    this.bars.forEach((bar:BarComponent) => {
      bar.recalculatePercentage();
    });
  }

  @HostBinding('class.progress') public addClass:boolean = true;

  public bars:any[] = [];

  protected _max:number;

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
