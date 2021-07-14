import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ElementRef,
  Renderer2, SimpleChanges, OnChanges,
} from '@angular/core';

import { isBs3 } from 'ngx-bootstrap/utils';
import { IProgressBarComponent, ProgressbarType } from './progressbar-type.interface';

// todo: number pipe
// todo: use query from progress?
@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    role: 'progressbar',
    'aria-valuemin': '0',
    '[class.progress-bar-animated]': '!isBs3 && animate',
    '[class.progress-bar-striped]': 'striped',
    '[class.active]': 'isBs3 && animate',
    '[attr.aria-valuenow]': 'value',
    '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
    '[attr.aria-valuemax]': 'max',
    '[style.height.%]': '"100"'
  }
})
export class BarComponent implements OnDestroy, OnChanges {
  @Input() progress?: IProgressBarComponent;
  @Input() max = 100;
  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() type?: ProgressbarType = 'info';
  /** current value of progress bar */
  @Input() value?: number;

  @HostBinding('style.width.%')
  get setBarWidth() {
    this.recalculatePercentage();

    return this.percent;
  }

  @HostBinding('class.progress-bar') addClass = true;

  get isBs3(): boolean {
    return isBs3();
  }

  public striped?: boolean;
  public animate? = false;
  public percent = 0;

  private _prevType?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnDestroy(): void {
    this.progress?.removeBar(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.progress) {
      this.progress = changes.progress.currentValue;
      this.progress?.addBar(this);
      this.setHostingValues();
    }

    if (changes.value || changes.max) {
      this.recalculatePercentage();
    }

    if (changes.type) {
      this.applyTypeClasses();
    }
  }

  setHostingValues(): void {
    this.animate = this.progress?._animate;
    this.striped = this.progress?._striped;
  }

  recalculatePercentage(): void {
    if (!this.progress) {
      return;
    };
    this.percent = +((this.value || 0) / this.progress?._max * 100).toFixed(2);

    const totalPercentage = [ ... this.progress?.bars]
      .reduce(function (total: number, bar: BarComponent): number {
        return total + bar.percent;
      }, 0);

    if (totalPercentage > 100) {
      this.percent -= totalPercentage - 100;
    }
  }

  private applyTypeClasses(): void {
    if (this._prevType) {
      const barTypeClass = `progress-bar-${this._prevType}`;
      const bgClass = `bg-${this._prevType}`;
      this.renderer.removeClass(this.el.nativeElement, barTypeClass);
      this.renderer.removeClass(this.el.nativeElement, bgClass);
      this._prevType = void 0;
    }

    if (this.type) {
      const barTypeClass = `progress-bar-${this.type}`;
      const bgClass = `bg-${this.type}`;
      this.renderer.addClass(this.el.nativeElement, barTypeClass);
      this.renderer.addClass(this.el.nativeElement, bgClass);
      this._prevType = this.type;
    }
  }
}
