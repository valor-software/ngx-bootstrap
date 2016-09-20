import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SliderHelpers } from './slider.helpers';

@Component({
  selector: 'slider',
  template: `
    <div #sliderElem (mousedown)='onMouseDown($event)' class='slider slider-{{ orientation }}'>
      <div class='slider-track'>
        <div #trackLow class='slider-track-low'></div>
        <div #trackSelection class='slider-selection'></div>
        <div #trackHigh class='slider-track-high'></div>
      </div>
      
      <div #minHandle class='slider-handle min-slider-handle round' role='slider'></div>
      <div #maxHandle class='slider-handle max-slider-handle round hide' role='slider'></div>
    </div>
  `
})
export class SliderComponent implements AfterViewInit {
  @Input() public animate: boolean;
  @Input() public enabled: boolean = true;
  @Input() public reversed: boolean;
  @Input() public max: number = 100;
  @Input() public min: number = 0;
  @Input() public step: number = 1;
  @Input() public selection: string = 'before';
  @Input() public touchCapable: boolean = true;
  @Input() public type: string = 'slider';
  @Input() public orientation: string = 'horizontal';
  @Input() public value: Array<number>;
  // @ViewChild('sliderElem') private sliderElem: ElementRef;
  @ViewChild('minHandle') private minHandle: ElementRef;
  @ViewChild('maxHandle') private maxHandle: ElementRef;
  @ViewChild('trackHigh') private trackHigh: ElementRef;
  @ViewChild('trackSelection') private trackSelection: ElementRef;
  @ViewChild('trackLow') private trackLow: ElementRef;
  private offset: any;
  private dragged: number;
  private percentage: any;
  private size: any;
  private stylePos: string;
  private mousePos: string;
  private sizePos: string;
  private inDrag: boolean;
  private over: boolean;
  private mouseUpReference: any;
  private mouseMoveReference: any;

  protected ngAfterViewInit(): void {
    if (this.orientation === 'vertical') {
      this.stylePos = 'top';
      this.mousePos = 'pageY';
      this.sizePos = 'offsetHeight';
    } else {
      this.stylePos = 'left';
      this.mousePos = 'pageX';
      this.sizePos = 'offsetWidth';
    }
    if (!Array.isArray(this.value)) {
      this.value = [(this.value as number)];
    }
    console.log('view', typeof this.value, this.value);
    this.setValue(this.value[0]/*, false, false*/);
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(val: number/*, triggerSlideEvent: boolean, triggerChangeEvent: boolean*/): void {
    console.log('val ', val);
    if (!val) {
      val = 0;
    }

    // const oldValue = this.getValue();
    this.value = SliderHelpers.validateInputValue(val);

    if (this.type === 'range') {
      this.value[0] = this.applyPrecision(this.value[0]);
      this.value[1] = this.applyPrecision(this.value[1]);

      this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
      this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
    } else {
      val = this.applyPrecision(val);
      this.value = [Math.max(this.min, Math.min(this.max, val))];

      this.maxHandle.nativeElement.className += ' hide';
      if (this.selection === 'after') {
        this.value[1] = this.max;
      } else {
        this.value[1] = this.min;
      }
    }

    if (this.max > this.min) {
      this.percentage = [
        this.toPercentage(this.value[0]),
        this.toPercentage(this.value[1]),
        this.step * 100 / (this.max - this.min)
      ];
    } else {
      this.percentage = [0, 0, 100];
    }
    console.log(this.value);
    this.layout();

    /*
     FIXME
     let newValue = this.type === 'range' ? this.value : this.value[0];

     if(triggerSlideEvent === true) {
     this.trigger('slide', newValue);
     }
     if( (oldValue !== newValue) && (triggerChangeEvent === true) ) {
     this.trigger('change', {
     oldValue: oldValue,
     newValue: newValue
     });
     }*/
  }

  protected onMouseDown(event: Event): boolean {
    if (!this.enabled) {
      return false;
    }

    this.offset = this.calculateOffset(event.target);
    this.size = (event.target as any)[this.sizePos];
    console.log('onMouseDown');

    const percentage = this.getPercentage(event);

    if (this.type === 'range') {
      const diff1: number = Math.abs(this.percentage[0] - percentage);
      const diff2: number = Math.abs(this.percentage[1] - percentage);
      this.dragged = (diff1 < diff2) ? 0 : 1;
      this.adjustPercentageForRangeSliders(percentage);
    } else {
      this.dragged = 0;
    }

    this.percentage[this.dragged] = percentage;
    this.layout();

    this.mouseMoveReference = this.onMouseMove.bind(this);
    this.mouseUpReference = this.onMouseUp.bind(this);

    if (this.touchCapable) {
      document.removeEventListener('touchmove', this.mouseMoveReference, false);
      document.removeEventListener('touchend', this.mouseUpReference, false);
    }

    if (this.mouseMoveReference) {
      document.removeEventListener('mousemove', this.mouseMoveReference, false);
    }
    if (this.mouseUpReference) {
      document.removeEventListener('mouseup', this.mouseUpReference, false);
    }

    if (this.touchCapable) {
      // Touch: Bind touch events:
      document.addEventListener('touchmove', this.mouseMoveReference, false);
      document.addEventListener('touchend', this.mouseUpReference, false);
    }
    // Bind mouse events:
    document.addEventListener('mousemove', this.mouseMoveReference, false);
    document.addEventListener('mouseup', this.mouseUpReference, false);

    this.inDrag = true;
    const newValue = this.calculateValue(false);

    // this._trigger('slideStart', newValue);

    this.setValue(newValue/*, false, true*/);

    SliderHelpers.pauseEvent(event);

    return true;
  }

  private onMouseMove(event: Event): boolean {
    console.log('onMouseMove');
    if (!this.enabled) {
      return false;
    }

    const percentage = this.getPercentage(event);
    this.adjustPercentageForRangeSliders(percentage);
    this.percentage[this.dragged] = percentage;
    this.layout();

    const val = this.calculateValue(true);
    this.setValue(val/*, true, true*/);

    return false;
  }

  private onMouseUp(): boolean {
    console.log('onMouseUp');
    if (!this.enabled) {
      return false;
    }
    if (this.touchCapable) {
      // Touch: Unbind touch event handlers:
      document.removeEventListener('touchmove', this.mouseMoveReference, false);
      document.removeEventListener('touchend', this.mouseUpReference, false);
    }
    // Unbind mouse event handlers:
    document.removeEventListener('mousemove', this.mouseMoveReference, false);
    document.removeEventListener('mouseup', this.mouseUpReference, false);

    this.inDrag = false;
    if (this.over === false) {
      // this.hideTooltip();
    }
    const val = this.calculateValue(true);
    console.log(val);
    this.setValue(val/*, true, true*/);
    // this._trigger('slideStop', val);

    return false;
  }

  private layout(): void {
    let positionPercentages: Array<number>;

    if (this.reversed) {
      positionPercentages = [100 - this.percentage[0], this.type === 'range' ? 100 - this.percentage[1] : this.percentage[1]];
    } else {
      positionPercentages = [this.percentage[0], this.percentage[1]];
    }

    this.minHandle.nativeElement.style[this.stylePos] = positionPercentages[0] + '%';

    this.maxHandle.nativeElement.style[this.stylePos] = positionPercentages[1] + '%';

    /* Position highlight range elements */
    /*
     if (this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
     for (let i = 0; i < this.options.rangeHighlights.length; i++) {
     let startPercent = this._toPercentage(this.options.rangeHighlights[i].start);
     let endPercent = this._toPercentage(this.options.rangeHighlights[i].end);

     let currentRange = this.createHighlightRange(startPercent, endPercent);

     if (currentRange) {
     if (this.orientation === 'vertical') {
     this.rangeHighlightElements[i].style.top = `${currentRange.start}%`;
     this.rangeHighlightElements[i].style.height = `${currentRange.size}%`;
     } else {
     this.rangeHighlightElements[i].style.left = `${currentRange.start}%`;
     this.rangeHighlightElements[i].style.width = `${currentRange.size}%`;
     }
     } else {
     this.rangeHighlightElements[i].style.display = 'none';
     }
     }
     }*/

    /* Position ticks and labels */
    /*
     if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {

     let styleSize = this.orientation === 'vertical' ? 'height' : 'width';
     let styleMargin = this.orientation === 'vertical' ? 'marginTop' : 'marginLeft';
     let labelSize = this.size / (this.options.ticks.length - 1);

     if (this.tickLabelContainer) {
     let extraMargin = 0;
     if (this.options.ticks_positions.length === 0) {
     if (this.orientation !== 'vertical') {
     this.tickLabelContainer.style[styleMargin] = -labelSize/2 + 'px';
     }

     extraMargin = this.tickLabelContainer.offsetHeight;
     } else {
     // Chidren are position absolute, calculate height by finding the max offsetHeight of a child
     for (i = 0 ; i < this.tickLabelContainer.childNodes.length; i++) {
     if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
     extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
     }
     }
     }
     if (this.orientation === 'horizontal') {
     this.sliderElem.nativeElement.style.marginBottom = extraMargin + 'px';
     }
     }

     for (let i = 0; i < this.options.ticks.length; i++) {

     let percentage = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);

     if (this.reversed) {
     percentage = 100 - percentage;
     }

     this.ticks[i].style[this.stylePos] = percentage + '%';

     // Set class labels to denote whether ticks are in the selection
     this._removeClass(this.ticks[i], 'in-selection');
     if (this.type !== 'range') {
     if (this.options.selection === 'after' && percentage >= positionPercentages[0]){
     this._addClass(this.ticks[i], 'in-selection');
     } else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
     this._addClass(this.ticks[i], 'in-selection');
     }
     } else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
     this._addClass(this.ticks[i], 'in-selection');
     }

     if (this.tickLabels[i]) {
     this.tickLabels[i].style[styleSize] = labelSize + 'px';

     if (this.orientation !== 'vertical' && this.options.ticks_positions[i] !== undefined) {
     this.tickLabels[i].style.position = 'absolute';
     this.tickLabels[i].style[this.stylePos] = percentage + '%';
     this.tickLabels[i].style[styleMargin] = -labelSize/2 + 'px';
     } else if (this.orientation === 'vertical') {
     this.tickLabels[i].style['marginLeft'] =  this.sliderElem.nativeElement.offsetWidth + 'px';
     this.tickLabelContainer.style['marginTop'] = this.sliderElem.nativeElement.offsetWidth / 2 * -1 + 'px';
     }
     }
     }

     }
     */

    /*
     let formattedTooltipVal;
     if (this.type === 'range') {
     formattedTooltipVal = SliderHelpers.formatter(this.value);
     this._setText(this.tooltipInner, formattedTooltipVal);

     this.tooltip.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0])/2 + '%';

     if (this.orientation === 'vertical') {
     this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
     } else {
     this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
     }

     if (this.orientation === 'vertical') {
     this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
     } else {
     this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
     }

     let innerTooltipMinText = SliderHelpers.formatter(this.value[0]);
     this._setText(this.tooltipInner_min, innerTooltipMinText);

     let innerTooltipMaxText = SliderHelpers.formatter(this.value[1]);
     this._setText(this.tooltipInner_max, innerTooltipMaxText);

     this.tooltip_min.style[this.stylePos] = positionPercentages[0] + '%';

     if (this.orientation === 'vertical') {
     this._css(this.tooltip_min, 'margin-top', -this.tooltip_min.offsetHeight / 2 + 'px');
     } else {
     this._css(this.tooltip_min, 'margin-left', -this.tooltip_min.offsetWidth / 2 + 'px');
     }

     this.tooltip_max.style[this.stylePos] = positionPercentages[1] + '%';

     if (this.orientation === 'vertical') {
     this._css(this.tooltip_max, 'margin-top', -this.tooltip_max.offsetHeight / 2 + 'px');
     } else {
     this._css(this.tooltip_max, 'margin-left', -this.tooltip_max.offsetWidth / 2 + 'px');
     }
     } else {
     formattedTooltipVal = SliderHelpers.formatter(this.value[0]);
     this._setText(this.tooltipInner, formattedTooltipVal);

     this.tooltip.style[this.stylePos] = positionPercentages[0] + '%';
     if (this.orientation === 'vertical') {
     this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
     } else {
     this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
     }
     }*/

    if (this.orientation === 'vertical') {
      this.trackLow.nativeElement.style.top = '0';
      this.trackLow.nativeElement.style.height = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

      this.trackSelection.nativeElement.style.top = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
      this.trackSelection.nativeElement.style.height = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

      this.trackHigh.nativeElement.style.bottom = '0';
      this.trackHigh.nativeElement.style.height = (100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1])) + '%';
    } else {
      this.trackLow.nativeElement.style.left = '0';
      this.trackLow.nativeElement.style.width = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

      this.trackSelection.nativeElement.style.left = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
      this.trackSelection.nativeElement.style.width = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

      this.trackHigh.nativeElement.style.right = '0';
      this.trackHigh.nativeElement.style.width = (100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1])) + '%';

      /*
       let offset_min = this.tooltip_min.getBoundingClientRect();
       let offset_max = this.tooltip_max.getBoundingClientRect();

       if (this.options.tooltip_position === 'bottom') {
       if (offset_min.right > offset_max.left) {
       this._removeClass(this.tooltip_max, 'bottom');
       this._addClass(this.tooltip_max, 'top');
       this.tooltip_max.style.top = '';
       this.tooltip_max.style.bottom = 22 + 'px';
       } else {
       this._removeClass(this.tooltip_max, 'top');
       this._addClass(this.tooltip_max, 'bottom');
       this.tooltip_max.style.top = this.tooltip_min.style.top;
       this.tooltip_max.style.bottom = '';
       }
       } else {
       if (offset_min.right > offset_max.left) {
       this._removeClass(this.tooltip_max, 'top');
       this._addClass(this.tooltip_max, 'bottom');
       this.tooltip_max.style.top = 18 + 'px';
       } else {
       this._removeClass(this.tooltip_max, 'bottom');
       this._addClass(this.tooltip_max, 'top');
       this.tooltip_max.style.top = this.tooltip_min.style.top;
       }
       }*/
    }
  }

  private offsetLeft(obj: any): number {
    return obj.getBoundingClientRect().left;
  }

  private offsetTop(obj: any): number {
    let offsetTop = obj.offsetTop;
    obj = obj.offsetParent;
    while (obj && !isNaN(obj.offsetTop)) {
      offsetTop += obj.offsetTop;
      if (obj.tagName !== 'BODY') {
        offsetTop -= obj.scrollTop;
      }
      obj = obj.offsetParent;
    }
    return offsetTop;
  }

  private calculateOffset(obj: any): any {
    return {
      left: this.offsetLeft(obj),
      top: this.offsetTop(obj)
    };
  }

  private getPercentage(ev: Event): number {
    if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
      ev = ((ev as any).touches[0] as Event);
    }

    const eventPosition: number = (ev as any)[this.mousePos];
    const sliderOffset: number = this.offset[this.stylePos];
    const distanceToSlide: number = eventPosition - sliderOffset;
    // Calculate what percent of the length the slider handle has slid
    let percentage: number = (distanceToSlide / this.size) * 100;
    percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2];
    if (this.reversed) {
      percentage = 100 - percentage;
    }

    // Make sure the percent is within the bounds of the slider.
    // 0% corresponds to the 'min' value of the slide
    // 100% corresponds to the 'max' value of the slide
    return Math.max(0, Math.min(100, percentage));
  }

  private adjustPercentageForRangeSliders(percentage: number): void {
    if (this.type === 'range') {
      let precision = SliderHelpers.getNumDigitsAfterDecimalPlace(percentage);
      precision = precision ? precision - 1 : 0;
      const percentageWithAdjustedPrecision = SliderHelpers.applyToFixedAndParseFloat(percentage, precision);
      if (this.dragged === 0 && SliderHelpers.applyToFixedAndParseFloat(this.percentage[1], precision) < percentageWithAdjustedPrecision) {
        this.percentage[0] = this.percentage[1];
        this.dragged = 1;
      } else if (this.dragged === 1 && SliderHelpers.applyToFixedAndParseFloat(this.percentage[0], precision) > percentageWithAdjustedPrecision) {
        this.percentage[1] = this.percentage[0];
        this.dragged = 0;
      }
    }
  }

  /*
  private createHighlightRange(start: number, end: number) {
    if (this.isHighlightRange(start, end)) {
      if (start > end) {
        return {'start': end, 'size': start - end};
      }
      return {'start': start, 'size': end - start};
    }
    return undefined;
  }

  private isHighlightRange(start: number, end: number) {
    if (0 <= start && start <= 100 && 0 <= end && end <= 100) {
      return true;
    }
    else {
      return false;
    }
  }
  */

  private calculateValue(snapToClosestTick: boolean): any {
    let val: any;
    if (this.type === 'range') {
      val = [this.min, this.max];
      if (this.percentage[0] !== 0) {
        val[0] = this.toValue(this.percentage[0]);
        val[0] = this.applyPrecision(val[0]);
      }
      if (this.percentage[1] !== 100) {
        val[1] = this.toValue(this.percentage[1]);
        val[1] = this.applyPrecision(val[1]);
      }
    } else {
      val = this.toValue(this.percentage[0]);
      val = parseFloat(val);
      val = this.applyPrecision(val);
    }
    console.log(snapToClosestTick);
    /*
     FIXME
     if (snapToClosestTick) {
     let min = [val, Infinity];
     for (let i = 0; i < this.ticks.length; i++) {
     let diff = Math.abs(this.ticks[i] - val);
     if (diff <= min[1]) {
     min = [this.ticks[i], diff];
     }
     }
     if (min[1] <= this.ticks_snap_bounds) {
     return min[0];
     }
     }*/

    return val;
  }

  private applyPrecision(val: number): number {
    const precision = SliderHelpers.getNumDigitsAfterDecimalPlace(this.step);
    return SliderHelpers.applyToFixedAndParseFloat(val, precision);
  }

  private toPercentage(value: number): number {
    if (this.max === this.min) {
      return 0;
    }
    /*
     if (this.options.ticks_positions.length > 0) {
     let minv, maxv, minp, maxp = 0;
     for (let i = 0; i < this.options.ticks.length; i++) {
     if (value  <= this.options.ticks[i]) {
     minv = (i > 0) ? this.options.ticks[i-1] : 0;
     minp = (i > 0) ? this.options.ticks_positions[i-1] : 0;
     maxv = this.options.ticks[i];
     maxp = this.options.ticks_positions[i];

     break;
     }
     }
     if (i > 0) {
     let partialPercentage = (value - minv) / (maxv - minv);
     return minp + partialPercentage * (maxp - minp);
     }
     }*/

    return 100 * (value - this.min) / (this.max - this.min);
  }

  private toValue(percentage: number): number {
    const rawValue = percentage / 100 * (this.max - this.min);
    const shouldAdjustWithBase = true;
    /*
     if (this.options.ticks_positions.length > 0) {
     let minv, maxv, minp, maxp = 0;
     for (let i = 1; i < this.options.ticks_positions.length; i++) {
     if (percentage <= this.options.ticks_positions[i]) {
     minv = this.options.ticks[i-1];
     minp = this.options.ticks_positions[i-1];
     maxv = this.options.ticks[i];
     maxp = this.options.ticks_positions[i];

     break;
     }
     }
     let partialPercentage = (percentage - minp) / (maxp - minp);
     rawValue = minv + partialPercentage * (maxv - minv);
     shouldAdjustWithBase = false;
     }
     */
    const adjustment = shouldAdjustWithBase ? this.min : 0;
    const value = adjustment + Math.round(rawValue / this.step) * this.step;
    if (value < this.min) {
      return this.min;
    } else if (value > this.max) {
      return this.max;
    } else {
      return value;
    }
  }

}
